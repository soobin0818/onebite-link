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
      className="transition-color card-hover flex h-full flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-semibold uppercase">
          {hostname[0]}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base leading-[1.4] font-semibold">
            {link.title}
          </h3>
          <p className="truncate text-[13px] leading-[1.4] text-[var(--text-sub)]">
            {hostname}
          </p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">
        {link.description}
      </p>
    </a>
  );
}
