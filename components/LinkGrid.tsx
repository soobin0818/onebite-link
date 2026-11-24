"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/components/LinksProvider";
import TrashIcon from "@/components/TrashIcon";
import type { LinkItem } from "@/lib/types";

type LinkGridProps = {
  /** 지정하면 해당 폴더의 링크만 표시 */
  folderId?: number;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links, removeLink } = useLinks();
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null);
  const visibleLinks =
    folderId === undefined
      ? links
      : links.filter((link) => link.folderId === folderId);

  return (
    <>
      {visibleLinks.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center">
          <span aria-hidden className="text-[32px] leading-none">
            📭
          </span>
          <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
            등록된 링크가 없어요.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleLinks.map((link) => (
            <li key={link.id} className="link-item relative">
              <LinkCard link={link} />
              <button
                type="button"
                onClick={() => setDeleteTarget(link)}
                aria-label={`${link.title} 링크 삭제`}
                title="링크 삭제"
                className="link-delete transition-color absolute top-2 right-2 flex size-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--text-sub)]"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="링크 삭제"
        onConfirm={() => deleteTarget && removeLink(deleteTarget.id)}
        onClose={() => setDeleteTarget(null)}
      >
        <strong className="font-semibold">{deleteTarget?.title}</strong>{" "}
        링크를 삭제할까요?
        <br />
        <span className="text-sm leading-[1.4] text-[var(--text-sub)]">
          삭제한 링크는 되돌릴 수 없어요.
        </span>
      </ConfirmDialog>
    </>
  );
}
