"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Motion tokens: keep every animation on this scale so the site feels cohesive. */
export const motion = {
  duration: { fast: 0.25, base: 0.6, slow: 1.0 },
  ease: { out: "expo.out", inOut: "power2.inOut", soft: "power3.out" },
  stagger: 0.08,
  distance: 28, // px for reveal-from-below
};

/**
 * Scroll reveal. Put data-reveal on elements, data-reveal-group on a parent to stagger children.
 *   const ref = useReveal<HTMLDivElement>();
 *   <section ref={ref}><h2 data-reveal>…</h2></section>
 * Honors prefers-reduced-motion: content simply shows, no animation.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current).forEach((el) => {
          gsap.from(el, {
            y: motion.distance,
            opacity: 0,
            duration: motion.duration.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]", scope.current).forEach((group) => {
          gsap.from(group.children, {
            y: motion.distance,
            opacity: 0,
            duration: motion.duration.base,
            ease: motion.ease.out,
            stagger: motion.stagger,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope }
  );

  return scope;
}

/** Count-up for stat tiles: <span data-count="95" data-suffix="%">0</span>. Call inside useGSAP. */
export function countUp(scope: HTMLElement | null) {
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    gsap.utils.toArray<HTMLElement>("[data-count]", scope).forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const o = { v: 0 };
      gsap.to(o, {
        v: end, duration: motion.duration.slow * 1.5, ease: motion.ease.soft,
        onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
  });
}