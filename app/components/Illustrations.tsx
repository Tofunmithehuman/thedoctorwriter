"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { BookOpen, Camera, Mic, Music, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Flower from "@/app/components/Flower";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LILAC = "radial-gradient(closest-side, rgba(226,173,242,0.55), transparent)";
const GOLD = "radial-gradient(closest-side, rgba(245,194,107,0.30), transparent)";

type IllProps = {
  className?: string;
  o?: number; // final opacity
  float?: number; // px of gentle up/down drift (0 = none)
  rot?: number; // degrees of tilt while floating
  par?: number; // scroll parallax strength (% of own height)
  style?: CSSProperties;
  children?: ReactNode;
};

/** One decorative piece. Starts hidden, fades/scales in, floats, and drifts at its own speed on scroll. */
function Ill({ className = "", o = 1, float = 0, rot = 0, par = 0, style, children }: IllProps) {
  return (
    <div
      aria-hidden
      data-o={o}
      data-float={float}
      data-rot={rot}
      data-par={par}
      style={style}
      className={`ill pointer-events-none absolute opacity-0 ${className}`}
    >
      {children}
    </div>
  );
}

function Spark({ className }: { className: string }) {
  return (
    <Ill o={0.8} float={6} par={12} className={className}>
      <svg viewBox="0 0 24 24" className="twinkle size-5 text-brand-500 md:size-6">
        <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="currentColor" />
      </svg>
    </Ill>
  );
}

/** Shared animation recipe for every illustration layer. */
function animate(root: HTMLElement, trigger: Element, start: string, delay: number) {
  const q = (s: string) => gsap.utils.toArray<HTMLElement>(s, root);
  const items = q(".ill");
  const mm = gsap.matchMedia();

  // Reduced motion: show everything, still
  mm.add("(prefers-reduced-motion: reduce)", () => {
    items.forEach((el) => gsap.set(el, { opacity: Number(el.dataset.o) }));
    gsap.set(q(".ecg"), { strokeDashoffset: 0 });
    gsap.set(q(".eq"), { scaleY: (i: number) => 0.3 + (i % 5) * 0.15, transformOrigin: "50% 100%" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Entrance
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.7 },
      { opacity: (_i: number, el: Element) => Number((el as HTMLElement).dataset.o), scale: 1, duration: 1.4, ease: "expo.out", stagger: 0.08, delay }
    );
    // Heartbeat line draws itself
    gsap.fromTo(q(".ecg"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.8, ease: "power2.inOut", delay: delay + 0.3 });

    // Gentle float + tilt
    items.forEach((el, i) => {
      const amp = Number(el.dataset.float);
      if (!amp) return;
      const dir = i % 2 ? 1 : -1;
      gsap.to(el, { y: dir * amp, rotation: dir * Number(el.dataset.rot), duration: 3.6 + (i % 4) * 0.9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: Math.random() });
    });

    // Continuous motions
    gsap.to(q(".ring"), { rotation: 360, duration: 90, ease: "none", repeat: -1 });
    gsap.fromTo(q(".sway"), { rotation: -4 }, { rotation: 4, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 0%" });
    q(".twinkle").forEach((el, i) =>
      gsap.to(el, { scale: 0.55, opacity: 0.4, duration: 1.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 })
    );
    q(".eq").forEach((el, i) =>
      gsap.fromTo(
        el,
        { scaleY: 0.2 },
        { scaleY: () => gsap.utils.random(0.5, 1), duration: gsap.utils.random(0.5, 1.1), ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.05, transformOrigin: "50% 100%" }
      )
    );

    // Scroll parallax: each piece drifts at its own speed
    items.forEach((el) => {
      const p = Number(el.dataset.par);
      if (p) gsap.to(el, { yPercent: -p, ease: "none", scrollTrigger: { trigger, start, end: "bottom top", scrub: true } });
    });
  });
}

/* ───────── HERO ───────── 
   Parent <section> needs: relative isolate */
export function HeroIllustrations() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => animate(ref.current!, ref.current!.parentElement!, "top top", 0.5), { scope: ref });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* colour washes */}
      <Ill o={0.9} par={6} className="left-0 top-0 size-104 md:size-136" style={{ background: LILAC }} />
      <Ill o={0.8} par={10} className="bottom-0 right-0 size-96 md:size-128" style={{ background: GOLD }} />

      {/* the four roles, as thin line art */}
      <Ill o={0.5} float={10} rot={6} par={14} className="left-[4%] top-[6%] hidden text-brand-500 md:block"><Stethoscope size={52} strokeWidth={1.1} /></Ill>
      <Ill o={0.5} float={12} rot={8} par={20} className="left-[22%] top-[10%] hidden text-brand-500 md:block"><BookOpen size={46} strokeWidth={1.1} /></Ill>
      <Ill o={0.55} float={14} rot={10} par={26} className="left-[41%] top-[5%] hidden text-brand-600 md:block"><Music size={44} strokeWidth={1.1} /></Ill>
      <Ill o={0.5} float={10} rot={6} par={18} className="bottom-[24%] left-[38%] hidden text-brand-500 md:block"><Camera size={44} strokeWidth={1.1} /></Ill>

      {/* heartbeat line that turns into a sound wave */}
      <Ill o={0.5} par={8} className="bottom-[4%] left-[2%] hidden w-[38%] max-w-136 md:block">
        <svg viewBox="0 0 600 120" fill="none" className="w-full text-brand-400">
          <path
            className="ecg"
            pathLength={1}
            d="M0 60 H120 L140 60 L152 44 L164 76 L176 60 H215 L232 10 L252 112 L270 60 H320 C350 60 350 30 380 30 S410 90 440 90 S470 30 500 30 S530 90 560 90 S590 60 600 60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        </svg>
      </Ill>

      {/* flowers: peek out around the photo, revealed more as the photo zooms out on scroll */}
      <Ill o={1} float={8} par={10} className="right-0 top-0 size-32 md:size-44"><Flower tone={1} delay={0.8} className="size-full" /></Ill>
      <Ill o={1} float={10} par={22} className="bottom-[5%] left-[41%] hidden size-20 md:block"><Flower tone={3} delay={1.1} className="size-full" /></Ill>

      {/* dashed orbit behind the photo */}
      <Ill o={0.6} par={4} className="right-[6%] top-[8%] size-88 md:size-112">
        <svg viewBox="0 0 100 100" fill="none" className="ring size-full text-brand-400">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 2.5" />
        </svg>
      </Ill>

      <Spark className="left-[16%] top-[24%]" />
      <Spark className="left-[47%] top-[38%] hidden md:block" />
      <Spark className="bottom-[22%] left-[9%] hidden md:block" />
    </div>
  );
}

/* ───────── FEATURED TALK (panel background) ─────────
   Parent <section> needs: relative isolate overflow-hidden */
export function TalkIllustrations() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => animate(ref.current!, ref.current!.parentElement!, "top bottom", 0.1), { scope: ref });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Ill o={0.9} par={8} className="-bottom-24 -left-24 size-112" style={{ background: LILAC }} />
      <Ill o={0.7} par={6} className="-right-24 -top-24 size-104" style={{ background: GOLD }} />

      {/* stage spotlight, swaying slowly */}
      <Ill
        o={0.55}
        className="sway right-[14%] top-0 hidden h-full w-[34%] origin-top lg:block"
        style={{ background: "linear-gradient(to bottom, rgba(243,217,249,0.9), transparent 85%)", clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)" }}
      />

      {/* equalizer */}
      <Ill o={0.5} par={5} className="bottom-8 left-10 hidden h-14 items-end gap-1.5 lg:flex">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="eq block h-full w-1 rounded-full bg-brand-400" />
        ))}
      </Ill>

      <Ill o={0.55} float={12} rot={8} par={16} className="left-[5%] top-[9%] hidden text-brand-500 md:block"><Music size={48} strokeWidth={1.1} /></Ill>
      <Ill o={0.5} float={10} rot={6} par={22} className="bottom-[12%] left-[42%] hidden text-brand-500 lg:block"><Mic size={44} strokeWidth={1.1} /></Ill>

      <Spark className="left-[30%] top-[14%] hidden md:block" />
      <Spark className="bottom-[30%] left-[8%]" />
    </div>
  );
}

/* ───────── RIPPLES AROUND THE VIDEO ─────────
   Put inside a wrapper that is: relative isolate */
export function VideoRipples() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".ripple", ref.current).forEach((el, i) => {
          gsap.fromTo(el, { scale: 1, opacity: 0.55 }, { scale: 1.14, opacity: 0, duration: 3.6, ease: "power1.out", repeat: -1, delay: i * 1.2 });
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {[0, 1, 2].map((i) => (
        <span key={i} className="ripple absolute inset-0 rounded-sm border border-brand-400 opacity-0" />
      ))}
    </div>
  );
}