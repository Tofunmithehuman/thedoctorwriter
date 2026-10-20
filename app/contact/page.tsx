import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Page from "@/app/components/Page";
import PageHero from "@/app/components/PageHero";
import ContactForm from "@/app/components/ContactForm";
import { SITE } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Book a talk",
  description:
    "Invite Dr. Olapeju Simoyan to speak at your school, conference or event.",
};

const details = [
  "Your audience and age group",
  "Preferred dates or time frame",
  "In person or virtual",
  "Anything you’d like her to cover",
];

const socials = [
  { label: "Facebook", href: SITE.socials.facebook },
  { label: "X (Twitter)", href: SITE.socials.x },
  { label: "YouTube", href: SITE.socials.youtube },
  { label: "LinkedIn", href: SITE.socials.linkedin },
];

export default function Contact() {
  return (
    <Page>
      <PageHero
        eyebrow="Book a talk"
        title="Let’s bring creativity to your audience."
        text="Share a few details about your school, conference or event, and Dr. Simoyan will shape a session on writing, music and the arts for well-being."
      />

      <section className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel">
          <div data-reveal className="mb-8">
            <span className="eyebrow">Request information</span>
            <h2 className="mt-2 text-h2">Tell me about your event.</h2>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="panel-soft" data-reveal>
            <span className="eyebrow">Helpful to include</span>
            <ul className="mt-4 flex flex-col">
              {details.map((d) => (
                <li
                  key={d}
                  className="flex gap-3 border-b border-line py-3 text-sm text-muted last:border-0"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-soft" data-reveal>
            <span className="eyebrow">Find me online</span>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-between"
                  >
                    {s.label} <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Page>
  );
}