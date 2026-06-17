export type ColorPreset = {
  label: string;
  value: string;
};

export const THEME_COLOR_PRESETS: ColorPreset[] = [
  { label: "Forest Green", value: "#006b2c" },
  { label: "Emerald", value: "#00873a" },
  { label: "Sky Blue", value: "#00628d" },
  { label: "Navy", value: "#0b1c30" },
  { label: "Maroon", value: "#7f1d1d" },
  { label: "Purple", value: "#5b21b6" },
  { label: "Charcoal", value: "#334155" },
];

export const ACCENT_COLOR_PRESETS: ColorPreset[] = [
  { label: "Sky Blue", value: "#00628d" },
  { label: "Teal", value: "#007cb1" },
  { label: "Forest Green", value: "#006b2c" },
  { label: "Navy", value: "#0b1c30" },
  { label: "Gold", value: "#b45309" },
  { label: "Slate", value: "#545f73" },
];

export const BACKGROUND_COLOR_PRESETS: ColorPreset[] = [
  { label: "White", value: "#ffffff" },
  { label: "Light Blue", value: "#f8f9ff" },
  { label: "Light Gray", value: "#f8fafc" },
  { label: "Soft Green", value: "#f7fff2" },
  { label: "Warm White", value: "#fafaf9" },
];

export function presetLabel(presets: ColorPreset[], value: string) {
  return presets.find((p) => p.value.toLowerCase() === value.toLowerCase())?.label ?? value;
}
