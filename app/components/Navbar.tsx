"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/speaking", label: "Speaking" },
  { href: "/media", label: "Media" },
];

/* ── helpers for the sliding "pill" behind the desktop links ── */
const activeItem = (root: HTMLElement | null) =>
  root?.querySelector<HTMLElement>("[aria-current='page']")?.parentElement ??
  null;

function movePill(
  pill: HTMLElement | null,
  el: HTMLElement | null,
  opts: { instant?: boolean; delay?: number } = {},
) {
  if (!pill) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!el) {
    gsap.to(pill, {
      opacity: 0,
      duration: reduce ? 0 : 0.3,
      overwrite: "auto",
    });
    return;
  }
  const to = { x: el.offsetLeft, width: el.offsetWidth };
  // Appear in place (don't fly in from the left) when the pill is currently hidden or on first paint
  if (opts.instant || Number(gsap.getProperty(pill, "opacity")) === 0)
    gsap.set(pill, to);
  gsap.to(pill, {
    ...(opts.instant ? {} : to),
    opacity: 1,
    duration: reduce ? 0 : opts.instant ? 0.6 : 0.55,
    delay: opts.delay ?? 0,
    ease: "expo.out",
    overwrite: "auto",
  });
}

function Logo({
  onClick,
  animate,
}: {
  onClick?: () => void;
  animate?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      data-nav-item={animate ? "" : undefined}
      className="font-semibold text-xl tracking-tight text-brand-900"
    >
      Olapeju Simoyan.
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const header = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);

  const close = () => setOpen(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Load animation: logo, links and buttons drift down and fade in, one after another
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-nav-item]",
          { y: -16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.07,
            delay: 0.1,
            clearProps: "transform",
          },
        );
      });
    },
    { scope: header },
  );

  // Sliding pill follows the active page (animates between pages)
  useEffect(() => {
    movePill(
      pill.current,
      activeItem(list.current),
      mounted.current ? {} : { instant: true, delay: 0.7 },
    );
    mounted.current = true;
  }, [pathname]);

  useEffect(() => {
    const onResize = () =>
      movePill(pill.current, activeItem(list.current), { instant: true });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hide on scroll down, glide back on scroll up; soft shadow once the page has moved
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes; resizing up to desktop closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <header
        ref={header}
        onFocusCapture={() => setHidden(false)}
        className={`sticky top-0 z-50 border-b border-line bg-surface transition-[translate,box-shadow] duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "shadow-[0_10px_30px_-20px_rgb(24_23_22/0.35)]" : ""}`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex w-full max-w-330 items-center justify-between px-5 py-5"
        >
          <Logo animate />

          {/* Desktop links with a sliding highlight */}
          <div
            ref={list}
            className="relative hidden md:block"
            onMouseLeave={() =>
              movePill(pill.current, activeItem(list.current))
            }
          >
            <span
              ref={pill}
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-0 rounded-btn bg-soft opacity-0"
            />
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li
                  key={l.href}
                  data-nav-item
                  onMouseEnter={(e) => movePill(pill.current, e.currentTarget)}
                  onFocus={(e) => movePill(pill.current, e.currentTarget)}
                  onBlur={() =>
                    movePill(pill.current, activeItem(list.current))
                  }
                >
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`relative block rounded-btn px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive(l.href)
                        ? "text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-nav-item
              className="btn-primary group hidden sm:inline-flex"
            >
              Book a talk
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <button
              type="button"
              data-nav-item
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-btn border border-line transition-colors duration-300 hover:bg-soft md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer: sits outside <header> so the header's transform never affects its fixed positioning */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-60 flex h-dvh w-full flex-col bg-page p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-out-expo md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="nav border border-line">
          <Logo onClick={close} />
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="grid size-11 place-items-center rounded-btn border border-line"
          >
            <X size={20} />
          </button>
        </div>

        <div className="panel mt-3 flex flex-1 flex-col justify-between overflow-y-auto">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={`border-b border-line transition-all duration-500 ease-out-expo ${
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${200 + i * 60}ms` : "0ms",
                }}
              >
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-5 text-3xl font-medium tracking-tight ${
                    isActive(l.href) ? "text-ink" : "text-muted"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span
                      className="size-2.5 rounded-full bg-brand-400"
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            onClick={close}
            className="btn-primary mt-8 w-full"
          >
            Book a talk <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
