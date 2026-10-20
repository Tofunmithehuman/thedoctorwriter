import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FooterFx from "@/app/components/Footerfx";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/speaking", label: "Speaking" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/peju.simoyan",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/pejune6",
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCMsmi65-sUjUTPzTwaoQKyg",
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/olapeju-simoyan-8035165b/",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export default async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <FooterFx>
      {/* Lilac glow (drifts slowly) */}
      <div
        aria-hidden
        className="footer-glow-a pointer-events-none absolute -bottom-48 -right-[6%] h-136 w-[55vw] min-w-128 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(226,173,242,0.85), rgba(201,133,222,0.4) 55%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="footer-glow-b pointer-events-none absolute -bottom-56 left-[8%] h-120 w-[45vw] min-w-112 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(169,92,194,0.55), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-330 px-11 pb-8 pt-10 md:px-15 md:pb-10 md:pt-12">
        <div className="grid gap-12 md:grid-cols-2">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {nav.map((l) => (
                <li key={l.href} data-footer-item>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-2xl font-medium tracking-tight text-brand-50 transition-all duration-500 ease-out-expo hover:translate-x-2 hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <ul data-footer-item className="flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-brand-300/25 text-brand-50 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-400 hover:bg-brand-400 hover:text-brand-950"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                      aria-hidden
                    >
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div data-footer-item className="flex flex-col gap-1.5 text-sm">
              {/* Replace with your real email */}
              <a
                href="mailto:hello@yourdomain.com"
                className="text-brand-100 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                hello@yourdomain.com
              </a>
              <p className="text-brand-200/70">
                Physician · Author · Musician · Photographer
              </p>
              <p className="text-brand-200/70">
                © {year} Dr. Olapeju Simoyan. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Giant name: letters rise in, gradient fades into the glow */}
        <p className="relative mt-14 select-none overflow-hidden pb-[0.1em] text-[clamp(3.5rem,18vw,17rem)] font-semibold leading-[0.95] tracking-tighter md:mt-20">
          <span className="sr-only">Simoyan</span>
          {"Simoyan".split("").map((c, i) => (
            <span
              key={i}
              aria-hidden
              className="footer-letter inline-block bg-linear-to-b from-brand-200/5 via-brand-300/30 to-brand-100/90 bg-clip-text text-transparent"
            >
              {c}
            </span>
          ))}
        </p>
      </div>
    </FooterFx>
  );
}
