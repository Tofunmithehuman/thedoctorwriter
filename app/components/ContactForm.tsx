"use client";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SITE } from "@/app/lib/data";

const audiences = [
  "Elementary school",
  "Middle or high school",
  "University or professional audience",
  "Conference or organization",
  "Something else",
];

/**
 * Opens the visitor's email app with the request filled in (works with no backend).
 * To receive requests directly, swap the handler for a Server Action or a form service (Formspree, Resend, etc).
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Organization: ${d.organization || "-"}`,
      `Audience: ${d.audience}`,
      `Preferred date: ${d.date || "-"}`,
      "",
      d.message,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Speaking request${d.organization ? `: ${d.organization}` : ""}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex min-h-80 flex-col items-start justify-center gap-4"
      >
        <span className="grid size-12 place-items-center rounded-full bg-brand-400 text-brand-950">
          <Check size={22} />
        </span>
        <h2 className="text-h2">Almost there.</h2>
        <p className="max-w-[44ch] text-muted">
          Your email app should have opened with your request filled in. Press
          send there to reach Dr. Simoyan. If nothing opened, write to{" "}
          {SITE.email}.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-secondary"
        >
          Edit my request
        </button>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="input"
        />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
        />
      </div>
      <div>
        <label htmlFor="organization" className={label}>
          School or organization
        </label>
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
          className="input"
        />
      </div>
      <div>
        <label htmlFor="audience" className={label}>
          Audience
        </label>
        <select
          id="audience"
          name="audience"
          required
          defaultValue=""
          className="input"
        >
          <option value="" disabled>
            Select one
          </option>
          {audiences.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="date" className={label}>
          Preferred date or time frame
        </label>
        <input
          id="date"
          name="date"
          placeholder="e.g. Spring 2027"
          className="input"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Tell me about your event
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input min-h-36 py-3"
        />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary group">
          Send request
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  );
}