import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <Link href="/" className="text-xl font-bold tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        + 새 링크
      </Link>
    </header>
  );
}
