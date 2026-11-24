"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import FolderSelect from "@/components/FolderSelect";
import { useFolders } from "@/components/FoldersProvider";
import { useLinks } from "@/components/LinksProvider";
import type { LinkItem } from "@/lib/types";

type EditLinkDialogProps = {
  /** 수정할 링크. null이면 모달이 닫힌다 */
  link: LinkItem | null;
  onClose: () => void;
};

/** 링크의 폴더·제목·설명을 수정하는 모달 */
export default function EditLinkDialog({ link, onClose }: EditLinkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (link && !dialog.open) dialog.showModal();
    if (!link && dialog.open) dialog.close();
  }, [link]);

  const close = () => dialogRef.current?.close();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!link || isPending) return;
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;

    setIsPending(true);
    try {
      await updateLink(link.id, {
        folderId: Number(formData.get("folderId")),
        title,
        description: String(formData.get("description") ?? "").trim(),
      });
      close();
    } catch (error) {
      alert(error instanceof Error ? error.message : "링크를 수정하지 못했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // 바깥(backdrop) 클릭 시 닫기
        if (e.target === e.currentTarget) close();
      }}
      className="modal m-auto w-[calc(100%-48px)] max-w-[480px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)]"
    >
      {link && (
        // 링크가 바뀔 때마다 폼 기본값을 새로 채우도록 key 지정
        <form
          key={link.id}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6"
        >
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-xl leading-[1.3] font-semibold">
              링크 수정
            </h2>
            <p className="truncate text-sm leading-[1.4] text-[var(--text-sub)]">
              {link.url}
            </p>
          </div>

          <FolderSelect
            name="folderId"
            folders={folders}
            defaultValue={link.folderId ?? undefined}
          />

          <label className="flex flex-col gap-2">
            <span className="text-sm leading-[1.4] font-medium">제목</span>
            <input
              type="text"
              name="title"
              required
              autoFocus
              maxLength={100}
              defaultValue={link.title}
              className="field transition-color rounded-md px-3 py-2 text-base"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm leading-[1.4] font-medium">설명</span>
            <textarea
              name="description"
              rows={3}
              maxLength={300}
              defaultValue={link.description}
              placeholder="링크에 대한 설명을 입력하세요"
              className="field transition-color resize-none rounded-md px-3 py-2 text-base leading-[1.6]"
            />
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="transition-color btn-secondary rounded-md px-4 py-2 text-sm font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="transition-color btn-primary rounded-md px-4 py-2 text-sm font-medium"
            >
              {isPending ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
