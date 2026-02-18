"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, languageOptions } from '@/utils/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en-US'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en-US');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. 尝试从 localStorage 读取
    const savedLang = localStorage.getItem('app_lang') as Language;
    
    if (savedLang && translations[savedLang]) {
      setLangState(savedLang);
    } else {
      // 2. 检测浏览器语言
      const browserLang = navigator.language;
      // 简单的匹配逻辑
      if (browserLang.startsWith('zh-CN')) setLangState('zh-CN');
      else if (browserLang.startsWith('zh')) setLangState('zh-TW');
      else if (browserLang.startsWith('de')) setLangState('de');
      else if (browserLang.startsWith('fr')) setLangState('fr');
      else if (browserLang.startsWith('ja')) setLangState('ja');
      else if (browserLang.startsWith('ko')) setLangState('ko');
      else if (browserLang.startsWith('es')) setLangState('es');
      else setLangState('en-US');
    }
    setIsLoaded(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  // 在加载完成前渲染 null 或加载中，避免水合不匹配
  if (!isLoaded) return <div className="min-h-screen bg-[#fafafa]" />;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] || translations['en-US'] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};