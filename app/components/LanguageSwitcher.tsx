"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageProvider';
import { languageOptions } from '@/utils/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 获取当前选中的语言信息
  const currentLang = languageOptions.find(l => l.code === lang) || languageOptions[0];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 高级感触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 outline-none ${
          isOpen 
            ? 'bg-slate-100 text-slate-900 shadow-inner' 
            : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <Globe className={`w-4 h-4 transition-colors ${isOpen ? 'text-[#0078D4]' : 'text-slate-500'}`} />
        <span className="font-semibold text-sm">{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
      </button>

      {/* 展开的下拉列表 (毛玻璃 + 丝滑阴影) */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[240px] bg-white/90 backdrop-blur-2xl border border-slate-200/60 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 pb-2 mb-2 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Language</p>
          </div>
          
          <div className="max-h-[360px] overflow-y-auto px-1 scrollbar-hide">
            {languageOptions.map((option) => {
              // 提取两字母简写作为徽章 (比如 zh-CN 提取为 CN, en 提取为 EN)
              const badgeText = option.code.split('-').pop()?.toUpperCase().substring(0, 2) || 'EN';
              const isSelected = lang === option.code;

              return (
                <button
                  key={option.code}
                  onClick={() => {
                    setLang(option.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group outline-none mb-1 ${
                    isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* 高级感双字母徽章 */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold tracking-widest transition-colors ${
                      isSelected 
                        ? 'bg-[#0078D4] text-white shadow-md shadow-blue-500/20' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                    }`}>
                      {badgeText}
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${
                      isSelected ? 'text-[#0078D4]' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                  {/* 选中打勾 */}
                  {isSelected && <Check className="w-4 h-4 text-[#0078D4] animate-in zoom-in duration-300" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}