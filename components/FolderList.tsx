"use client";

import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFolders } from "@/components/FoldersProvider";
import SidebarLink from "@/components/SidebarLink";
import TrashIcon from "@/components/TrashIcon";
import type { Folder } from "@/lib/types";

export default function FolderList() {
  const { folders, removeFolder } = useFolders();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState<Folder | null>(null);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const openConfirm = (folder: Folder) => {
    setTarget(folder);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const handleDelete = () => {
    if (!target) return;
    const id = target.id;
    // 보고 있던 폴더를 삭제하면 홈으로 이동 (이동과 삭제를 같은 transition으로 묶어 404 깜빡임 방지)
    startTransition(() => {
      if (pathname === `/folder/${id}`) router.push("/");
      removeFolder(id);
    });
    close();
  };

  return (
    <>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id} className="folder-item relative">
            <SidebarLink href={`/folder/${folder.id}`}>
              <span aria-hidden>📁</span>
              <span className="truncate">{folder.name}</span>
            </SidebarLink>
            <button
              type="button"
              onClick={() => openConfirm(folder)}
              aria-label={`${folder.name} 폴더 삭제`}
              title="폴더 삭제"
              className="folder-delete transition-color absolute top-1/2 right-1 flex size-6 -translate-y-1/2 items-center justify-center rounded text-[var(--text-sub)]"
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="delete-folder-title"
        onClose={() => setTarget(null)}
        onClick={(e) => {
          // 바깥(backdrop) 클릭 시 닫기
          if (e.target === e.currentTarget) close();
        }}
        className="modal m-auto w-[calc(100%-48px)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)]"
      >
        <div className="flex flex-col gap-4 p-6">
          <h2
            id="delete-folder-title"
            className="text-xl leading-[1.3] font-semibold"
          >
            폴더 삭제
          </h2>
          <p className="text-base leading-[1.6]">
            <strong className="font-semibold">{target?.name}</strong> 폴더를
            삭제할까요?
            <br />
            <span className="text-sm leading-[1.4] text-[var(--text-sub)]">
              삭제한 폴더는 되돌릴 수 없어요.
            </span>
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              autoFocus
              className="transition-color btn-secondary rounded-md px-4 py-2 text-sm font-medium"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="transition-color btn-danger rounded-md px-4 py-2 text-sm font-medium"
            >
              삭제
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
