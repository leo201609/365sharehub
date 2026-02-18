// app/components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "./LanguageProvider";
import { languageOptions } from "@/utils/translations";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = languageOptions.find(opt => opt.code === lang) || languageOptions[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentOption.label}</span>
        <span className="sm:hidden">{currentOption.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 max-h-96 overflow-y-auto z-50 py-2">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => {
                setLang(option.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-slate-50 transition
                ${lang === option.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'}
              `}
            >
              <span className="text-lg">{option.flag}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}