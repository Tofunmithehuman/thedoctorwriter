import type { ReactNode } from "react";
import Flower from "@/app/components/Flower";
import Photo from "@/app/components/Photo";

/** Page header panel: text on the left, a photo or a small flower garden on the right. */
export default function PageHero({
  eyebrow,
  title,
  text,
  actions,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  actions?: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="panel grid items-center gap-8 overflow-hidden md:grid-cols-[1.15fr_0.85fr] md:gap-12">
      <div
        data-reveal-group
        className="flex flex-col items-start gap-5 md:py-8"
      >
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-display">{title}</h1>
        <p className="max-w-[52ch] text-base text-muted">{text}</p>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>

      <div
        data-reveal
        className="group relative aspect-4/3 md:aspect-auto md:min-h-88"
      >
        {image ? (
          <>
            <Photo
              src={image.src}
              alt={image.alt}
              priority
              className="absolute inset-0"
            />
            <Flower
              tone={1}
              delay={0.6}
              className="absolute -bottom-5 -left-5 size-24 md:size-28"
            />
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden rounded-card bg-linear-to-br from-brand-100 to-brand-200">
            <Flower
              tone={0}
              delay={0.3}
              className="absolute -right-8 -top-8 size-44 md:size-64"
            />
            <Flower
              tone={2}
              delay={0.6}
              className="absolute bottom-5 left-6 size-28 md:size-36"
            />
            <Flower
              tone={3}
              delay={0.9}
              className="absolute left-[46%] top-[38%] size-14 md:size-20"
            />
          </div>
        )}
      </div>
    </section>
  );
}