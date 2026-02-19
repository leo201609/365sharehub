"use client";

import { useLanguage } from "./LanguageProvider";
import { languageOptions, Language } from "@/utils/translations";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部自动关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 获取当前选中的语言选项
  const currentOption = languageOptions.find(opt => opt.code === lang) || languageOptions[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 触发按钮：现代化质感，全站统一 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <Globe className="w-4 h-4 text-slate-500" />
        {/* 桌面端显示完整名称，移动端只显示简写 */}
        <span className="hidden sm:inline-block text-sm font-medium text-slate-700">
          {currentOption.label}
        </span>
        <span className="sm:hidden text-sm font-medium text-slate-700 uppercase">
          {currentOption.code.split('-')[0]}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 下拉菜单：悬浮面板、玻璃态、平滑滚动 */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 origin-top-right bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100/50 ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-1.5 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {languageOptions.map((option) => {
              const isSelected = lang === option.code;
              return (
                <button
                  key={option.code}
                  onClick={() => {
                    setLang(option.code as Language);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2.5 my-0.5 rounded-xl text-sm flex items-center justify-between group transition-all duration-200
                    ${isSelected 
                      ? 'bg-blue-50 text-blue-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base drop-shadow-sm group-hover:scale-110 transition-transform">{option.flag}</span>
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}