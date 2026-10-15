"use client";
import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero portrait.
 *  • On load: the frame wipes up while the photo settles from a zoomed-in state.
 *  • On scroll: the frame smoothly zooms out (shrinks, corners round off), scrubbed to the scrollbar.
 * The hidden start state lives in globals.css (.hero-frame) so there is no flash before JS runs.
 */
export default function HeroImage({ src, alt }: { src: StaticImageData; alt: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) Load
        gsap.fromTo(
          ".hero-frame",
          { clipPath: "inset(100% 0% 0% 0% round 1rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 1rem)", duration: 1.4, ease: "expo.inOut", delay: 0.2 }
        );
        gsap.fromTo(".hero-img", { scale: 1.35 }, { scale: 1, duration: 2.2, ease: "expo.out", delay: 0.2 });

        // 2) Scroll: zoom out
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: scope.current, start: 0, end: "+=700", scrub: 1 },
          })
          .to(".hero-frame", { scale: 0.88, borderRadius: 40, transformOrigin: "50% 30%" }, 0);
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="relative aspect-4/5 md:aspect-auto md:h-[calc(100dvh-10rem)] md:max-h-176 md:min-h-112"
    >
      <div className="hero-frame absolute inset-0 overflow-hidden rounded-card bg-brand-100 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="hero-img object-cover"
        />
      </div>
    </div>
  );
}