import type { LinkItem } from "@/lib/types";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold uppercase dark:bg-zinc-900">
          {hostname[0]}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{link.title}</h3>
          <p className="truncate text-xs text-zinc-500">{hostname}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {link.description}
      </p>
    </a>
  );
}
