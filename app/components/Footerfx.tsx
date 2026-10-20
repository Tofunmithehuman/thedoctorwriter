"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Full-width plum footer + its animations. Content is passed in from the (cached) server Footer. */
export default function FooterFx({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, ref.current);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance, once, when the footer scrolls into view
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          })
          .from(q("[data-footer-item]"), {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.07,
            clearProps: "transform",
          })
          .from(
            q(".footer-letter"),
            { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.07 },
            "-=0.7",
          )
          .from(
            q(".footer-glow-a, .footer-glow-b"),
            { opacity: 0, scale: 0.7, duration: 2, ease: "power2.out" },
            0,
          );

        // Slow glow drift, only while the footer is on screen
        const drift = [
          gsap.to(q(".footer-glow-a"), {
            x: -70,
            y: -24,
            duration: 9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
          gsap.to(q(".footer-glow-b"), {
            x: 80,
            y: -12,
            duration: 11,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
        ];
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) =>
            drift.forEach((t) => (self.isActive ? t.play() : t.pause())),
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer
      ref={ref}
      className="relative isolate mt-3 w-full overflow-hidden rounded-t-[2rem] bg-linear-to-b from-brand-950 via-brand-950 to-brand-900 text-white"
    >
      {children}
    </footer>
  );
}
