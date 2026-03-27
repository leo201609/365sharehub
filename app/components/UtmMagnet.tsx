// app/components/UtmMagnet.tsx
'use client';

import { useEffect } from 'react';

export default function UtmMagnet() {
  useEffect(() => {
    // 1. 尝试从 URL 中获取 ref 或 utm_source
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('utm_source');

    if (ref) {
      // 2. 将标签存入浏览器的 localStorage，有效期持久
      localStorage.setItem('utm_source', ref);
      console.log('🎯 365ShareHub: 成功捕捉引流来源 ->', ref);
    }
  }, []);

  return null; // 这个组件不渲染任何内容
}