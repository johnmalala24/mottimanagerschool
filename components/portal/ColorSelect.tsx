"use client";

import { THEME_COLOR_PRESETS, type ColorPreset } from "@/lib/theme-colors";

type ColorSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets?: ColorPreset[];
  hint?: string;
};

export default function ColorSelect({
  label,
  value,
  onChange,
  presets = THEME_COLOR_PRESETS,
  hint,
}: ColorSelectProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-label-sm font-semibold text-on-surface">{label}</span>
      <div className="flex items-center gap-3">
        <span
          className="w-10 h-10 rounded-lg border border-outline-variant flex-shrink-0"
          style={{ backgroundColor: value }}
          aria-hidden
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-premium flex-1"
        >
          {presets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
      {hint && <span className="text-label-sm text-secondary">{hint}</span>}
    </label>
  );
}
