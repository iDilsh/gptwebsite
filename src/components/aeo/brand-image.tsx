"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BrandImageProps {
  /** Public path to the image, e.g. "/images/engines/chatgpt.png". */
  src: string;
  alt: string;
  /** Fallback rendered when the image file is missing or fails to load. */
  fallback?: React.ReactNode;
  className?: string;
  /** Optional class for the <img> element itself. */
  imgClassName?: string;
}

/**
 * An image slot that gracefully falls back to a styled node when the image
 * file is not present. This makes every logo / illustration slot "image-ready":
 * drop a file at the documented path and it appears automatically — otherwise
 * the existing icon-based design is shown.
 *
 * Uses a plain <img> (not next/image) so no remote-domain config is needed
 * and users can add files at any time without rebuilding the image config.
 *
 * The inner component is keyed on `src` so swapping the file path remounts
 * the <img> and resets any previous error state cleanly (no effect needed).
 */
export function BrandImage({
  src,
  alt,
  fallback,
  className,
  imgClassName,
}: BrandImageProps) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <ImageSlot
        key={src}
        src={src}
        alt={alt}
        imgClassName={imgClassName}
        fallback={fallback}
      />
    </span>
  );
}

function ImageSlot({
  src,
  alt,
  imgClassName,
  fallback,
}: {
  src: string;
  alt: string;
  imgClassName?: string;
  fallback?: React.ReactNode;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={cn("h-full w-full object-contain", imgClassName)}
      loading="lazy"
    />
  );
}
