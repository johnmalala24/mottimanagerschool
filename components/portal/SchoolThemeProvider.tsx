"use client";

import { useEffect } from "react";
import { buildThemeStyle, type SchoolBranding } from "@/lib/school-branding";

type SchoolThemeProviderProps = {
  branding: SchoolBranding;
  children: React.ReactNode;
};

export default function SchoolThemeProvider({ branding, children }: SchoolThemeProviderProps) {
  useEffect(() => {
    if (!branding.favicon) return;
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = branding.favicon;
  }, [branding.favicon]);

  return (
    <div style={buildThemeStyle(branding)} className="min-h-screen flex flex-col flex-1">
      {children}
    </div>
  );
}
