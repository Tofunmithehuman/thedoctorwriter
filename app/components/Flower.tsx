"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// [petal A, petal B] pulled from the brand lilac scale
const palettes = [
  ["#EBC3F5", "#E2ADF2"],
  ["#F3D9F9", "#EBC3F5"],
  ["#E2ADF2", "#C985DE"],
  ["#EBC3F5", "#C985DE"],
];

type Props = {
  /** 0-3: picks a colour palette */
  tone?: number;
  /** seconds to wait before blooming */
  delay?: number;
  /** position + size classes, e.g. "absolute -right-6 -top-6 size-28" */
  className?: string;
};

/** Decorative bloom: grows in on scroll, then slowly spins and floats. Parent needs the `group` class for hover. */
export default function Flower({ tone = 0, delay = 0, className = "" }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const [a, b] = palettes[tone % palettes.length];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const petals = gsap.utils.toArray<SVGElement>(".petal", svg.current);

        // Bloom (once, when scrolled into view)
        gsap
          .timeline({
            delay,
            scrollTrigger: {
              trigger: svg.current,
              start: "top 92%",
              once: true,
            },
          })
          .from(svg.current, {
            scale: 0,
            rotation: -140,
            transformOrigin: "50% 50%",
            duration: 1.2,
            ease: "back.out(1.5)",
          })
          .from(
            petals,
            {
              scale: 0,
              transformOrigin: "50% 100%",
              duration: 0.7,
              ease: "back.out(2)",
              stagger: 0.08,
            },
            "<0.1",
          );

        // Idle: slow spin + gentle float
        gsap.to(svg.current?.querySelector(".spin") ?? [], {
          rotation: 360,
          svgOrigin: "50 50",
          duration: 28 + tone * 6,
          ease: "none",
          repeat: -1,
        });
        gsap.to(svg.current, {
          y: -5,
          duration: 2.4 + tone * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: svg },
  );

  return (
    <span
      aria-hidden
      className={`pointer-events-none block transition-transform duration-700 ease-out-expo group-hover:rotate-12 group-hover:scale-125 ${className}`}
    >
      <svg
        ref={svg}
        viewBox="0 0 100 100"
        className="size-full overflow-visible"
      >
        <g className="spin">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <g key={deg} transform={`rotate(${deg} 50 50)`}>
              <ellipse
                className="petal"
                cx="50"
                cy="27"
                rx="11"
                ry="21"
                fill={i % 2 ? b : a}
              />
            </g>
          ))}
          <circle cx="50" cy="50" r="9" fill="#F5C26B" />
          <circle cx="50" cy="50" r="4" fill="#FFF1D0" />
        </g>
      </svg>
    </span>
  );
}
