import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/80 px-4 backdrop-blur-[8px]">
      <Link
        href="/"
        className="transition-color item-hover flex items-center gap-2 rounded-md px-2 py-1 text-base font-semibold"
      >
        <span aria-hidden>🔖</span>
        한입 링크
      </Link>
      <Link
        href="/new"
        className="transition-color btn-primary flex items-center rounded-md px-4 py-2 text-sm leading-none font-medium"
      >
        + 새 링크
      </Link>
    </header>
  );
}
