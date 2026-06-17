import { MAX_PROFILE_BYTES } from "@/lib/image-constants";

export function assertProfileImage(image: string | null | undefined) {
  if (!image) return;
  if (!image.startsWith("data:image/")) {
    throw new Error("Profile photo must be a PNG, JPG, or WebP image.");
  }
  if (image.length > MAX_PROFILE_BYTES * 1.4) {
    throw new Error("Profile photo must be 512 KB or smaller.");
  }
}
