import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/types";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center">
        <span aria-hidden className="text-[32px] leading-none">
          📭
        </span>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          등록된 링크가 없어요.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}
