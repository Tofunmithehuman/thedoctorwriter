import Link from "next/link";

export default async function Footer() {
  "use cache";

  return (
    <footer className="panel-soft flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold">Dr. Olapeju Simoyan</p>
        <p className="text-sm text-muted">
          Physician · Author · Musician · Photographer
        </p>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        {["about", "books", "speaking", "media", "contact"].map((p) => (
          <li key={p}>
            <Link href={`/${p}`} className="capitalize hover:text-ink">
              {p}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
