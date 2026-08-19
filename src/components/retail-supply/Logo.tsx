import Image from "next/image";

/**
 * Official Jaleed calligraphic mark. Two artwork variants ship with the site:
 * dark for light backgrounds, light for dark ones.
 */
export function Logo({
  variant = "dark",
  alt,
  className = "",
  height = 34,
  priority = false,
}: {
  variant?: "dark" | "light";
  alt: string;
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const src = variant === "light" ? "/brand/jaleed-logo-light.png" : "/brand/jaleed-logo-dark.png";
  // Source artwork is near-square (200×206 / 492×507).
  const width = Math.round(height * 0.97);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
