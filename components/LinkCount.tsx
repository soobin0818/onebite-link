"use client";

import { useLinks } from "@/components/LinksProvider";

type LinkCountProps = {
  label: string;
  /** 지정하면 해당 폴더의 링크만 센다 */
  folderId?: number;
};

export default function LinkCount({ label, folderId }: LinkCountProps) {
  const { links } = useLinks();
  const count =
    folderId === undefined
      ? links.length
      : links.filter((link) => link.folderId === folderId).length;

  return (
    <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
      {label} {count}개
    </p>
  );
}
