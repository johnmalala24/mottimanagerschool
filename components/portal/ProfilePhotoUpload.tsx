"use client";

import { useRef, useState } from "react";
import { PROFILE_IMAGE_HINT } from "@/lib/image-constants";

const MAX_BYTES = 512 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp";

type ProfilePhotoUploadProps = {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  size?: "sm" | "md" | "lg";
  hint?: string;
};

const sizeClasses = {
  sm: "w-14 h-14",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

export default function ProfilePhotoUpload({
  label = "Profile photo",
  value,
  onChange,
  size = "md",
  hint = PROFILE_IMAGE_HINT,
}: ProfilePhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError("");
    if (file.size > MAX_BYTES) {
      setError("Photo must be 512 KB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.onerror = () => setError("Could not read the file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-label-sm font-semibold text-on-surface">{label}</span>}
      <div className="flex items-center gap-md">
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-secondary text-[28px]">person</span>
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
              Upload photo
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

export function UserAvatar({
  name,
  image,
  size = "md",
}: {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm flex-shrink-0 overflow-hidden`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
