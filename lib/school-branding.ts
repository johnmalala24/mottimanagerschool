import type { CSSProperties } from "react";
import type { UserRole } from "@prisma/client";

export type SchoolBranding = {
  themeColor: string;
  accentColor: string;
  dashboardBgColor: string;
  favicon: string | null;
  motto: string | null;
  logo: string | null;
  schoolName: string;
};

export const DEFAULT_BRANDING: SchoolBranding = {
  themeColor: "#006b2c",
  accentColor: "#00628d",
  dashboardBgColor: "#f8f9ff",
  favicon: null,
  motto: null,
  logo: null,
  schoolName: "School",
};

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length === 3) {
    return {
      r: parseInt(normalized[0] + normalized[0], 16),
      g: parseInt(normalized[1] + normalized[1], 16),
      b: parseInt(normalized[2] + normalized[2], 16),
    };
  }
  if (normalized.length !== 6) return null;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((c) => clampChannel(c).toString(16).padStart(2, "0")).join("")}`;
}

function mixHex(base: string, target: string, amount: number) {
  const a = hexToRgb(base);
  const b = hexToRgb(target);
  if (!a || !b) return base;
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount
  );
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function onColor(hex: string) {
  return luminance(hex) > 0.45 ? "#0b1c30" : "#ffffff";
}

export function buildThemeStyle(branding: Pick<SchoolBranding, "themeColor" | "accentColor" | "dashboardBgColor">) {
  const primary = branding.themeColor || DEFAULT_BRANDING.themeColor;
  const accent = branding.accentColor || DEFAULT_BRANDING.accentColor;
  const surface = branding.dashboardBgColor || DEFAULT_BRANDING.dashboardBgColor;

  return {
    "--color-primary": primary,
    "--color-on-primary": onColor(primary),
    "--color-primary-container": mixHex(primary, "#ffffff", 0.15),
    "--color-on-primary-container": onColor(mixHex(primary, "#ffffff", 0.15)),
    "--color-tertiary": accent,
    "--color-on-tertiary": onColor(accent),
    "--color-tertiary-container": mixHex(accent, "#ffffff", 0.12),
    "--color-surface": surface,
    "--color-background": surface,
    "--color-surface-tint": primary,
  } as CSSProperties;
}

export function isRoleDisabled(role: UserRole, disabledRoles: UserRole[]) {
  return disabledRoles.includes(role);
}
