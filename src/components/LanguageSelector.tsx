import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../types';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  onLanguageChange?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '', onLanguageChange }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const currentLanguage = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];

  const handleLanguageSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium hover:bg-slate-800 rounded-lg border border-slate-800 transition-all text-slate-200 bg-slate-900"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-sans">{currentLanguage.nativeName}</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close the popover */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            id="language-dropdown-menu"
            className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-800 ${
                  currentLangCode === lang.code ? 'font-semibold text-indigo-400 bg-indigo-500/10' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl" role="img" aria-label={lang.name}>{lang.flag}</span>
                  <span className="font-sans">{lang.nativeName}</span>
                </div>
                {currentLangCode === lang.code && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
