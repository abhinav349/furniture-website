"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "src"> & {
  imageKey: ImageKey;
  width?: number;
};

export function Photo({ imageKey, width = 1600, className, alt, ...rest }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-wood-300 to-wood-700",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={img(imageKey, width)}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
