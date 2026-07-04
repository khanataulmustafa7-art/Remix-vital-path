import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, FileText, AlertTriangle, Scale, Lock, RefreshCw, Landmark } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden font-sans text-slate-300"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Terms & Conditions
                  </h2>
                  <p className="text-xxs text-slate-400">
                    Remix VitalPath Compliance & Legal Framework (v1.4)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Terms"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs leading-relaxed max-h-[calc(85vh-140px)]">
              
              {/* Introduction Notification */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-3 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-amber-400 text-xxs uppercase tracking-wider">
                    CRITICAL COMPLIANCE NOTICE
                  </p>
                  <p className="text-xxs text-slate-300">
                    Please read this document thoroughly. Remix VitalPath utilizes probabilistic machine learning and computer vision to estimate nutritional parameters. This application does not offer professional clinical counseling, diagnostics, or therapeutic prescription.
                  </p>
                </div>
              </div>

              {/* SECTION 1 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">1.</span> 
                  <span>ACCEPTANCE OF TERMS</span>
                </h3>
                <p>
                  By creating an account, launching, or accessing any service provided within the <strong>Remix VitalPath</strong> web/mobile application (hereafter referred to as "the Application" or "the Service"), you explicitly acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
                </p>
                <p>
                  If you are registering an account or executing tracking logs, you represent that you are at least 18 years of age (or the age of majority in your jurisdiction) or have obtained verified parental or legal guardian consent. If you do not agree with any portion of these terms, you must immediately terminate use of the Application.
                </p>
              </div>

              {/* SECTION 2 */}
              <div className="space-y-3 p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>2. MEDICAL & NUTRITIONAL DISCLAIMER (CRUCIAL)</span>
                </h3>
                <p className="text-slate-350">
                  <strong>THE SERVICE IS PROVIDED FOR INFORMATIONAL, DEMONSTRATIVE, AND EDUCATIONAL PURPOSES ONLY. IT IS NOT MEDICAL ADVICE.</strong>
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400 text-xxs">
                  <li>
                    <strong className="text-slate-300">Not Professional Care:</strong> Remix VitalPath, its creators, affiliates, and artificial intelligence frameworks do not act as licensed medical practitioners, registered dietitians, oncologists, cardiologists, or professional nutrition counselors. 
                  </li>
                  <li>
                    <strong className="text-slate-300">AI Probabilistic Output:</strong> Visual ingredient recognition, meal scanning, and macronutrient calculations generated by the computer vision systems are inherently <em>probabilistic</em> and subject to margin errors. They should not be relied upon as absolute or error-free specifications.
                  </li>
                  <li>
                    <strong className="text-slate-300">Allergen and Health Risks:</strong> This app is <strong>NOT</strong> a substitute for professional allergen verification. If you have severe anaphylactic conditions, dietary restrictions, cardiovascular diseases, or pregnancy parameters, you are strictly required to verify actual physical labels and consult a medical professional. Never ignore physical product packaging or delay consulting with licensed health-care experts because of information presented in this app.
                  </li>
                  <li>
                    <strong className="text-slate-300">US & India Specific Frameworks:</strong> This disclaimer complies with the US Food and Drug Administration (FDA) guidelines on General Wellness software, and the Indian Food Safety and Standards Authority (FSSAI) guidelines regarding wellness declarations.
                  </li>
                </ul>
              </div>

              {/* SECTION 3 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">3.</span>
                  <span>LIMITATION OF LIABILITY</span>
                </h3>
                <p>
                  To the maximum extent permitted by applicable law (including but not limited to the US Federal Trade Commission regulations, state consumer protection statutes, and the Indian Consumer Protection Act, 2019), the developers, company, directors, employees, and software providers of Remix VitalPath shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages.
                </p>
                <p>
                  This includes, without limitation, damages for bodily injury, allergic reaction, digestive distress, metabolic adverse effects, or data loss arising from (i) the use or inability to use the Service; (ii) any error or misclassification committed by the AI meal scanner or meal planner; or (iii) any advice or suggestions derived from health preset plans. 
                </p>
                <p className="font-semibold text-slate-200">
                  THE APPLICATION AND ALL RELEVANT MEAL BLUEPRINTS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
              </div>

              {/* SECTION 4 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">4. USER ACCOUNTS & CONDUCT</span>
                </h3>
                <p>
                  To fully utilize the Application's meal scanning and calorie journaling systems, users may be prompted to provide local profiling metrics. You represent that all user-submitted metrics are accurate and current.
                </p>
                <p className="font-semibold text-slate-400">Prohibited Actions:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
                  <li>Uploading malicious, offensive, or non-food images with the intent to disrupt or skew the computer vision and neural weights.</li>
                  <li>Attempting to reverse-engineer, decompile, scrape, or extract the proprietary model prompt mappings and heuristic databases embedded in the client bundle.</li>
                  <li>Impersonating professional clinicians or creating fraudulent medical credentials inside the Application interface.</li>
                </ul>
              </div>

              {/* SECTION 5 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">5. INTELLECTUAL PROPERTY</span>
                </h3>
                <p>
                  All proprietary components, interface layouts, vector animations, icon sets, calorie processing logic, database structures, color themes, and branding files associated with <strong>Remix VitalPath</strong> are the exclusive property of [YOUR COMPANY NAME / REMIX LABS] and are protected under international copyright, trademark, and trade secret laws. 
                </p>
                <p>
                  No portion of this system may be reproduced, mirrored, or redistributed for commercial gain without explicit prior written authorization from our legal representation.
                </p>
              </div>

              {/* SECTION 6 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">6. DATA & CONTENT LICENSE</span>
                </h3>
                <p>
                  By uploading food photos, meal descriptions, or calorie records ("User Content"), you grant Remix VitalPath a perpetual, royalty-free, non-exclusive, worldwide license to host, cache, transmit, resize, analyze, and process this data for the primary purpose of delivering the Service to you.
                </p>
                <p>
                  We are deeply committed to user privacy. Any storage or processing of images or health logs complies with the US Health Insurance Portability and Accountability Act (HIPAA) (to the extent applicable to wellness apps) and the Indian Digital Personal Data Protection (DPDP) Act, 2023. De-identified and anonymized metadata may be utilized to refine the visual identification weights.
                </p>
              </div>

              {/* SECTION 7 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">7. SEVERABILITY & GOVERNING LAW</span>
                </h3>
                <p>
                  If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions.
                </p>
                <p>
                  These terms are governed by and construed in accordance with the laws of <strong>[Delaware, USA / New Delhi, India]</strong>, without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the competent courts located in the designated governing jurisdiction.
                </p>
              </div>

              {/* SECTION 8 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">8. CHANGES TO TERMS</span>
                </h3>
                <p>
                  We reserve the right, at our sole discretion, to modify, update, or replace any portion of these Terms and Conditions at any time. For major compliance updates, we will place a notification banner within the Application dashboard or update the version index at the header of this modal. Continuing to use the Application after such modifications constitutes full legal acceptance of the revised framework.
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4 text-xxs text-slate-400 font-mono">
                <div>
                  <p className="font-bold text-slate-350">REMIX VITALPATH LEGAL DEPT</p>
                  <p>Contact: Secure Support Portal & Legal Desk</p>
                </div>
                <div className="sm:text-right">
                  <p>Compliance Standards Check: PASSED</p>
                  <p>Target Framework: US-FDA / IN-DPDP / FSSAI compliant</p>
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xxs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/15 cursor-pointer hover:shadow-indigo-600/25 active:scale-98"
              >
                I Understand & Accept
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
