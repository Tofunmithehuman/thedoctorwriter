import Image from "next/image";

/** Rounded photo with a lilac fallback. Pass positioning yourself: "relative ..." or "absolute inset-0". */
export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-card bg-linear-to-br from-brand-100 to-brand-300 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}