"use client";
import { useGSAP } from "@gsap/react";
import { useReveal, countUp } from "@/app/lib/motion";

/** Wrap a page's panels. `contents` keeps the parent's flex gap intact. */
export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  useGSAP(() => countUp(ref.current), { scope: ref });
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
