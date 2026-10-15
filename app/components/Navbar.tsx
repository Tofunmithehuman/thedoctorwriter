"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/speaking", label: "Speaking" },
  { href: "/media", label: "Media" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="font-semibold text-xl tracking-tight text-brand-900"
    >
      Olapeju Simoyan.
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-330 items-center justify-between px-5 py-5"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-btn px-3.5 py-2 text-sm transition-colors ${
                  isActive(l.href)
                    ? "bg-soft font-semibold text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Book a talk <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-btn border border-line md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer: full width + full height, slides in from the right, out to the right */}
      <div
        id="mobile-menu"
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
    </header>
  );
}
