import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. 如果用户已经手动切换过语言（有 cookie），则跳过检测
  const hasLangCookie = request.cookies.has('lang');
  if (hasLangCookie) {
    return NextResponse.next();
  }

  // 2. 检测浏览器偏好语言 (Accept-Language Header)
  // 这是最准确的方法，因为它反映了用户操作系统的语言设置
  const acceptLanguage = request.headers.get('accept-language');
  
  let detectedLang = 'en'; // 默认

  if (acceptLanguage) {
    const lang = acceptLanguage.toLowerCase();
    if (lang.includes('zh-cn') || lang.includes('zh-hans')) {
      detectedLang = 'zh'; // 简体中文
    } else if (lang.includes('zh-tw') || lang.includes('zh-hk')) {
      detectedLang = 'tw'; // 繁体中文
    } else if (lang.includes('de')) {
      detectedLang = 'de';
    } else if (lang.includes('fr')) {
      detectedLang = 'fr';
    } else if (lang.includes('ja')) {
      detectedLang = 'jp';
    } else if (lang.includes('ko')) {
      detectedLang = 'kr';
    } else if (lang.includes('es')) {
      detectedLang = 'es';
    } else if (lang.includes('it')) {
      detectedLang = 'it';
    } else if (lang.includes('nl')) {
      detectedLang = 'nl';
    } else if (lang.includes('pt')) {
      detectedLang = 'pt';
    }
  }

  // 3. 设置 cookie 并继续
  const response = NextResponse.next();
  // 设置 1 年过期
  if (detectedLang !== 'en') {
    response.cookies.set('lang', detectedLang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }

  return response;
}

// 仅对首页生效，避免影响 API 或静态资源
export const config = {
  matcher: ['/'],
};