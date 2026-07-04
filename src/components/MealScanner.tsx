import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, AlertCircle, Sparkles, Check, Bookmark, Plus, X, ListCollapse } from 'lucide-react';
import { ScannedMeal, FoodIngredient } from '../types';

interface MealScannerProps {
  onAddMealToTracker: (meal: Omit<ScannedMeal, 'id' | 'scannedAt'>) => void;
  onSaveToFrequent: (meal: Omit<ScannedMeal, 'id' | 'scannedAt'>) => void;
  frequentMeals?: Omit<ScannedMeal, 'id' | 'scannedAt'>[];
  dailyLogs?: any[];
}

export const MealScanner: React.FC<MealScannerProps> = ({ 
  onAddMealToTracker, 
  onSaveToFrequent,
  frequentMeals = [],
  dailyLogs = []
}) => {
  const { t, i18n } = useTranslation();
  
  // Image states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  
  // Camera action states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Scanning state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScannedMeal | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  
  // Feedback states
  const [isLoggedToday, setIsLoggedToday] = useState<boolean>(false);
  const [isSavedFrec, setIsSavedFrec] = useState<boolean>(false);

  // Local state for client-side image-to-nutrition caching
  const [clientImageCache, setClientImageCache] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('vitalpath_image_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track if a scanned output was calibrated or retrieved from image cache
  const [calibrationInfo, setCalibrationInfo] = useState<{
    isCalibrated: boolean;
    source: "frequent" | "history" | "image" | null;
    matchedName: string;
  } | null>(null);

  // Quick base64 hashing function to prevent local storage quota issues
  const computeImageHash = (base64Str: string | null): string => {
    if (!base64Str) return "";
    let hash = 0;
    const len = base64Str.length;
    const step = Math.max(1, Math.floor(len / 250)); // sample 250 characters of baseline
    for (let i = 0; i < len; i += step) {
      const char = base64Str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `img_${len}_${hash.toString(16)}`;
  };

  // Stop camera tracks helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Open device camera
  const startCamera = async () => {
    setCameraError(null);
    setErrorMessage(null);
    setSelectedImage(null);
    setScanResult(null);
    setIsLoggedToday(false);
    setIsSavedFrec(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError(t('cameraError', { defaultValue: "Failed to access webcam or mobile device camera. Please check permissions." }));
    }
  };

  // Capture frame from local camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw captured image mirrored or plain
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setSelectedImage(dataUrl);
        setMimeType("image/jpeg");
        stopCamera();
      }
    }
  };

  // Handle uploaded local image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage(null);
    setScanResult(null);
    setIsLoggedToday(false);
    setIsSavedFrec(false);

    if (!file.type.startsWith('image/')) {
      setErrorMessage("Please supply a valid image file.");
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMessage("Error reading image file.");
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop helpers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Invoke server scan meal endpoint proxying Gemini 3.5 Flash
  const scanMealImage = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setErrorMessage(null);
    setScanResult(null);
    setIsLoggedToday(false);
    setIsSavedFrec(false);
    setCalibrationInfo(null);

    // 1. Check local client-side image-cache first for instant matching
    const imageHash = computeImageHash(selectedImage);
    if (imageHash && clientImageCache[imageHash]) {
      console.log("Serving scanned meal from client-side image cache.");
      const cached = clientImageCache[imageHash];
      
      const scanOutput: ScannedMeal = {
        id: Math.random().toString(),
        itemName: cached.itemName,
        items: cached.items,
        totalCalories: cached.totalCalories,
        totalProtein: cached.totalProtein,
        totalCarbs: cached.totalCarbs,
        totalFats: cached.totalFats,
        description: cached.description,
        scannedAt: new Date().toISOString(),
        imageThumbnail: cached.imageThumbnail || selectedImage
      };

      setCalibrationInfo({
        isCalibrated: true,
        source: "image",
        matchedName: cached.itemName
      });

      // Simple artificial delay so the user still gets the beautiful laser scan feedback
      setTimeout(() => {
        setScanResult(scanOutput);
        setIsScanning(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch('/api/scan-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: selectedImage,
          mimeType: mimeType,
          language: i18n.language?.split('-')[0] || 'en'
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || t('scanError'));
      }

      const parsedNutrition = await response.json();
      
      // Standardize response keys to match ScannedMeal type dynamically
      let finalItemName = parsedNutrition.meal_name || parsedNutrition.itemName || "Meal Profile";
      let finalDescription = parsedNutrition.description || "";
      
      let finalTotalCalories = 0;
      let finalTotalProtein = 0;
      let finalTotalCarbs = 0;
      let finalTotalFats = 0;

      if (parsedNutrition.totals) {
        finalTotalCalories = parsedNutrition.totals.calories || 0;
        finalTotalProtein = parsedNutrition.totals.protein_g || 0;
        finalTotalCarbs = parsedNutrition.totals.carbs_g || 0;
        finalTotalFats = parsedNutrition.totals.fats_g || 0;
      } else {
        finalTotalCalories = parsedNutrition.totalCalories || 0;
        finalTotalProtein = parsedNutrition.totalProtein || 0;
        finalTotalCarbs = parsedNutrition.totalCarbs || 0;
        finalTotalFats = parsedNutrition.totalFats || 0;
      }

      let parsedItems = parsedNutrition.scanned_items || parsedNutrition.items || [];
      let finalItems = parsedItems.map((item: any) => ({
        name: item.name || "",
        portionSize: item.portion || item.portionSize || "1 portion",
        calories: item.calories || 0,
        protein: item.protein_g !== undefined ? item.protein_g : (item.protein || 0),
        carbs: item.carbs_g !== undefined ? item.carbs_g : (item.carbs || 0),
        fats: item.fats_g !== undefined ? item.fats_g : (item.fats || 0),
      }));

      let isCalibrated = false;
      let calibratedSource: "frequent" | "history" | null = null;
      let calibratedWith = "";

      // 2. Name Calibration Match - check Favorite/Frequent Meals baseline
      if (frequentMeals && frequentMeals.length > 0) {
        const match = frequentMeals.find(
          (m) => m.itemName.trim().toLowerCase() === finalItemName.trim().toLowerCase()
        );
        if (match) {
          finalItems = match.items;
          finalTotalCalories = match.totalCalories;
          finalTotalProtein = match.totalProtein;
          finalTotalCarbs = match.totalCarbs;
          finalTotalFats = match.totalFats;
          finalDescription = match.description || finalDescription;
          isCalibrated = true;
          calibratedSource = "frequent";
          calibratedWith = match.itemName;
        }
      }

      // 3. Name Calibration Match - check recent Daily Logs baseline
      if (!isCalibrated && dailyLogs && dailyLogs.length > 0) {
        const match = dailyLogs.find(
          (log) => log.itemName.trim().toLowerCase() === finalItemName.trim().toLowerCase()
        );
        if (match) {
          finalTotalCalories = match.calories;
          finalTotalProtein = match.protein;
          finalTotalCarbs = match.carbs;
          finalTotalFats = match.fats;
          isCalibrated = true;
          calibratedSource = "history";
          calibratedWith = match.itemName;
        }
      }

      const scanOutput: ScannedMeal = {
        id: Math.random().toString(),
        itemName: finalItemName,
        items: finalItems,
        totalCalories: finalTotalCalories,
        totalProtein: finalTotalProtein,
        totalCarbs: finalTotalCarbs,
        totalFats: finalTotalFats,
        description: finalDescription,
        scannedAt: new Date().toISOString(),
        imageThumbnail: selectedImage // Capture snapshot for historical representation
      };

      if (isCalibrated) {
        setCalibrationInfo({
          isCalibrated: true,
          source: calibratedSource,
          matchedName: calibratedWith
        });
      }

      // Cache the result to guarantee identical scans of this image return matching outputs
      if (imageHash) {
        const newCache = {
          ...clientImageCache,
          [imageHash]: {
            itemName: scanOutput.itemName,
            items: scanOutput.items,
            totalCalories: scanOutput.totalCalories,
            totalProtein: scanOutput.totalProtein,
            totalCarbs: scanOutput.totalCarbs,
            totalFats: scanOutput.totalFats,
            description: scanOutput.description,
            imageThumbnail: scanOutput.imageThumbnail
          }
        };
        setClientImageCache(newCache);
        localStorage.setItem('vitalpath_image_cache', JSON.stringify(newCache));
      }

      setScanResult(scanOutput);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || t('scanError'));
    } finally {
      setIsScanning(false);
    }
  };

  // Handle direct calorie budget logs
  const handleAddToDaily = () => {
    if (scanResult) {
      onAddMealToTracker({
        itemName: scanResult.itemName,
        items: scanResult.items,
        totalCalories: scanResult.totalCalories,
        totalProtein: scanResult.totalProtein,
        totalCarbs: scanResult.totalCarbs,
        totalFats: scanResult.totalFats,
        description: scanResult.description,
        imageThumbnail: scanResult.imageThumbnail
      });
      setIsLoggedToday(true);
    }
  };

  // Handle saving favorite scans
  const handleSaveFrequent = () => {
    if (scanResult) {
      onSaveToFrequent({
        itemName: scanResult.itemName,
        items: scanResult.items,
        totalCalories: scanResult.totalCalories,
        totalProtein: scanResult.totalProtein,
        totalCarbs: scanResult.totalCarbs,
        totalFats: scanResult.totalFats,
        description: scanResult.description,
        imageThumbnail: scanResult.imageThumbnail
      });
      setIsSavedFrec(true);
    }
  };

  return (
    <div id="meal-scanner-module" className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg shadow-black/30 transition-all">
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        .laser-glow {
          box-shadow: 0 0 12px 2px #6366f1, 0 0 4px 1px #818cf8;
          animation: scanLaser 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
          <Camera className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            {t('scanTitle')}
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {t('appName')} AI Food Scanner Engine
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-6 font-sans leading-relaxed">
        {t('scanIntro')}
      </p>

      {/* Main Image Capture/Select Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-4">
          
          {/* File Picker & Cam Area */}
          <div
            id="drag-upload-container"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative min-h-[280px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all overflow-hidden ${
              isDragOver ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-950/40 hover:bg-slate-950/60'
            }`}
          >
            {/* Live Camera Feed */}
            {isCameraActive && (
              <div className="absolute inset-0 z-10 bg-black flex flex-col justify-between">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4 z-20">
                  <button
                    id="camera-capture-trigger"
                    onClick={capturePhoto}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl text-sm shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('cameraCapture')}</span>
                  </button>
                  <button
                    id="camera-close-trigger"
                    onClick={stopCamera}
                    className="flex items-center gap-1 px-3.5 py-2.5 bg-slate-800 text-slate-200 text-sm font-medium rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>{t('cameraClose')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Selected Image with Laser Overlay */}
            {selectedImage ? (
              <div className="relative w-full h-full flex items-center justify-center min-h-[260px] rounded-xl overflow-hidden group">
                <img
                  src={selectedImage}
                  alt="Scanned item representation"
                  className="max-h-[280px] object-contain rounded-xl w-full"
                />
                
                {/* Laser scan horizontal line */}
                {isScanning && (
                  <div className="absolute left-0 right-0 h-1 bg-indigo-400 laser-glow z-10" />
                )}

                {/* Remove Photo Trigger overlay */}
                {!isScanning && (
                  <button
                    id="remove-photo-btn"
                    onClick={() => {
                      setSelectedImage(null);
                      setScanResult(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-slate-900 text-white rounded-full transition-all"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              /* Drag and Drop instructions */
              <div className="text-center p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-3 border border-slate-700">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-300 mb-1 font-sans">
                  {isDragOver ? "Drop image lock" : t('uploadButton')}
                </p>
                <p className="text-xs text-slate-500 mb-4 font-sans">
                  Supports JPG, PNG, WEBP (Max 15MB)
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center items-center text-xs text-slate-500">
                  <label className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer shadow-sm transition-all font-sans">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span>or</span>
                  <button
                    id="activate-camera-btn"
                    onClick={startCamera}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 shadow-sm transition-all font-sans cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{t('cameraButton')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Camera Error Display */}
          {cameraError && (
            <div className="p-3.5 bg-amber-950/20 text-amber-300 rounded-xl text-xs flex items-start gap-2 border border-amber-900/30 font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Action triggers */}
          {selectedImage && (
            <button
              id="analyze-food-trigger-btn"
              onClick={scanMealImage}
              disabled={isScanning}
              className={`w-full py-3.5 px-4 font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm font-sans ${
                isScanning 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-950/50 cursor-pointer'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? t('scanningInProgress') : t('scanButton')}</span>
            </button>
          )}

          {/* Scanning Progress Cards */}
          {isScanning && (
            <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/20 space-y-2 animate-pulse font-sans">
              <p className="text-xs font-semibold text-indigo-400">
                {t('scanningLaserLine')}
              </p>
              <p className="text-xxs text-slate-400 tracking-tight leading-relaxed">
                {t('processingAI')}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 bg-red-950/20 text-red-400 border border-red-900/30 rounded-xl text-xs flex items-start gap-2 font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Scan Results breakdown card block */}
        <div id="scan-results-container">
          {scanResult ? (
            <div className="bg-slate-950/40 rounded-xl border border-slate-800 p-5 space-y-4 font-sans animate-in fade-in slide-in-from-right-3 duration-200">
              
              {/* Overall Meal title */}
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xxs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded inline-block mb-1">
                  Gemini Scanned Plate
                </span>
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  {scanResult.itemName}
                </h3>
              </div>

              {calibrationInfo?.isCalibrated && (
                <div className="p-2.5 px-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-xxs flex items-center gap-1.5 font-medium animate-in fade-in zoom-in-95 duration-200">
                  <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span>
                    {calibrationInfo.source === "image" && "Verified Match: Loaded exact photo from cache storage with identical calibrated calories!"}
                    {calibrationInfo.source === "frequent" && `Calorie Aligned: Snapped to your saved Favorite "${calibrationInfo.matchedName}" baseline!`}
                    {calibrationInfo.source === "history" && `Auto-Consistent: Matched with your today's logged "${calibrationInfo.matchedName}" baseline!`}
                  </span>
                </div>
              )}

              {/* Ingredients Details */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                  {t('scannedItems')}
                </h4>
                
                <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-800">
                  {scanResult.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-start py-2 text-xs">
                      <div>
                        <p className="font-semibold text-slate-200">{it.name}</p>
                        <p className="text-[10px] text-slate-500">{t('portion')}: {it.portionSize}</p>
                      </div>
                      <div className="text-right font-mono">
                        <p className="font-bold text-slate-200">{it.calories} kcal</p>
                        <p className="text-[9px] text-slate-500">P:{it.protein}g • C:{it.carbs}g • F:{it.fats}g</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Macros Highlight */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('total')} {t('calories')}</span>
                  <span className="text-lg font-black text-indigo-400 font-mono">{scanResult.totalCalories} kcal</span>
                </div>

                {/* Macro distribution sliders */}
                <div className="grid grid-cols-3 gap-2 text-center text-xxs">
                  <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/80">
                    <p className="text-slate-500 font-bold uppercase text-[9px]">{t('protein')}</p>
                    <p className="font-bold text-indigo-400 mt-0.5 font-mono">{scanResult.totalProtein}g</p>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/80">
                    <p className="text-slate-500 font-bold uppercase text-[9px]">{t('carbs')}</p>
                    <p className="font-bold text-emerald-400 mt-0.5 font-mono">{scanResult.totalCarbs}g</p>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/80">
                    <p className="text-slate-500 font-bold uppercase text-[9px]">{t('fats')}</p>
                    <p className="font-bold text-amber-500 mt-0.5 font-mono">{scanResult.totalFats}g</p>
                  </div>
                </div>

                {/* Visual Ratio breakdown progress line */}
                {scanResult.totalCalories > 0 && (
                  <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-850">
                    <div 
                      style={{ width: `${(scanResult.totalProtein * 4 / (scanResult.totalCalories || 1)) * 100}%` }} 
                      className="bg-indigo-500" 
                      title="Protein portion"
                    />
                    <div 
                      style={{ width: `${(scanResult.totalCarbs * 4 / (scanResult.totalCalories || 1)) * 100}%` }} 
                      className="bg-emerald-500" 
                      title="Carbohydrates portion"
                    />
                    <div 
                      style={{ width: `${(scanResult.totalFats * 9 / (scanResult.totalCalories || 1)) * 100}%` }} 
                      className="bg-amber-500" 
                      title="Fats portion"
                    />
                  </div>
                )}
              </div>

              {/* AI Insight details box */}
              {scanResult.description && (
                <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-slate-300">
                  <p className="text-xs font-medium leading-normal italic text-slate-300">
                    "{scanResult.description}"
                  </p>
                </div>
              )}

              {/* Action syncs */}
              <div className="flex gap-2">
                <button
                  id="log-scanned-to-daily-btn"
                  onClick={handleAddToDaily}
                  disabled={isLoggedToday}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all outline-none uppercase tracking-widest ${
                    isLoggedToday 
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-default'
                      : 'bg-white text-slate-950 hover:bg-slate-200 shadow-sm cursor-pointer'
                  }`}
                >
                  {isLoggedToday ? <Check className="w-3.5 h-3.5 text-indigo-400 inline mx-1" /> : ""}
                  <span>{isLoggedToday ? t('addedToTrackerSuccess') : t('addToDailyTracker')}</span>
                </button>

                <button
                  id="save-scanned-to-frequent-btn"
                  onClick={handleSaveFrequent}
                  disabled={isSavedFrec}
                  className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all outline-none border ${
                    isSavedFrec
                      ? 'bg-slate-800 text-slate-550 border-slate-700 cursor-default'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-750 border-slate-700 cursor-pointer'
                  }`}
                  title="Add to Favorites Database"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSavedFrec ? 'text-indigo-400 fill-indigo-400' : ''}`} />
                  <span className="hidden sm:inline">
                    {isSavedFrec ? "Saved" : "Save Freq"}
                  </span>
                </button>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[220px] rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 text-slate-500 bg-slate-950/20">
              <Sparkles className="w-8 h-8 text-indigo-500/40 mb-2 animate-pulse" />
              <p className="text-xs font-medium font-sans max-w-[200px] text-slate-400">
                Waiting for image feed analyze lock. Shoot or upload a healthy plate!
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
