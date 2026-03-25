"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer"; // 引入你原本的 Footer 组件

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // 如果当前路径是以 /admin 开头，直接返回 null（什么都不渲染）
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}