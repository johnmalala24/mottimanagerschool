"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 512 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";

type LogoUploadFieldProps = {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  hint?: string;
};

export default function LogoUploadField({
  label = "School Logo",
  value,
  onChange,
  hint = "PNG, JPG, WebP or SVG. Max 512 KB.",
}: LogoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError("");

    if (file.size > MAX_BYTES) {
      setError("Logo must be 512 KB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.onerror = () => setError("Could not read the file. Try again.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-sm font-semibold text-on-surface">{label}</span>
      <div className="flex items-center gap-md p-md rounded-xl border border-outline-variant bg-surface-container-lowest">
        <div className="w-16 h-16 rounded-lg border border-outline-variant bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="School logo preview" className="w-full h-full object-contain" />
          ) : (
            <span className="material-symbols-outlined text-secondary text-[28px]">image</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-sm">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-md py-sm rounded-lg border border-outline text-secondary text-label-md font-medium hover:bg-surface-container transition-colors"
            >
              Choose file
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="px-md py-sm rounded-lg text-label-md font-medium text-error hover:bg-error-container/30 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-label-sm text-secondary mt-1">{hint}</p>
          {error && <p className="text-label-sm text-error mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
