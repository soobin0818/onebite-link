"use client";

import { useRef, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useFolders } from "@/components/FoldersProvider";
import PencilIcon from "@/components/PencilIcon";
import SidebarLink from "@/components/SidebarLink";
import TrashIcon from "@/components/TrashIcon";
import type { Folder } from "@/lib/types";

const modalClassName =
  "modal m-auto w-[calc(100%-48px)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)]";

export default function FolderList() {
  const { folders, removeFolder, renameFolder } = useFolders();
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const [editName, setEditName] = useState("");
  const [isEditPending, setIsEditPending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const openEdit = (folder: Folder) => {
    setEditTarget(folder);
    setEditName(folder.name);
    editDialogRef.current?.showModal();
  };
  const closeEdit = () => editDialogRef.current?.close();


  const trimmedEditName = editName.trim();
  const canSaveEdit =
    trimmedEditName !== "" && trimmedEditName !== editTarget?.name;

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTarget || !canSaveEdit || isEditPending) return;

    setIsEditPending(true);
    try {
      await renameFolder(editTarget.id, trimmedEditName);
      closeEdit();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "폴더 이름을 수정하지 못했습니다.",
      );
    } finally {
      setIsEditPending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    try {
      // 보고 있던 폴더를 삭제하면 홈으로 이동
      await removeFolder(id, () => {
        if (pathname === `/folder/${id}`) router.push("/");
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "폴더를 삭제하지 못했습니다.");
    }
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
            <div className="folder-actions transition-color absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-0.5">
              <button
                type="button"
                onClick={() => openEdit(folder)}
                aria-label={`${folder.name} 폴더 이름 수정`}
                title="폴더 이름 수정"
                className="folder-action transition-color flex size-6 items-center justify-center rounded text-[var(--text-sub)]"
              >
                <PencilIcon />
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(folder)}
                aria-label={`${folder.name} 폴더 삭제`}
                title="폴더 삭제"
                className="folder-action folder-action-danger transition-color flex size-6 items-center justify-center rounded text-[var(--text-sub)]"
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 폴더 이름 수정 모달 */}
      <dialog
        ref={editDialogRef}
        aria-labelledby="edit-folder-title"
        onClose={() => setEditTarget(null)}
        onClick={(e) => {
          // 바깥(backdrop) 클릭 시 닫기
          if (e.target === e.currentTarget) closeEdit();
        }}
        className={modalClassName}
      >
        <form onSubmit={handleEdit} className="flex flex-col gap-4 p-6">
          <h2
            id="edit-folder-title"
            className="text-xl leading-[1.3] font-semibold"
          >
            폴더 이름 수정
          </h2>
          <label className="flex flex-col gap-2">
            <span className="text-sm leading-[1.4] font-medium">폴더 이름</span>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              required
              autoFocus
              maxLength={30}
              className="field transition-color rounded-md px-3 py-2 text-base"
            />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeEdit}
              className="transition-color btn-secondary rounded-md px-4 py-2 text-sm font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!canSaveEdit || isEditPending}
              className="transition-color btn-primary rounded-md px-4 py-2 text-sm font-medium"
            >
              {isEditPending ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="폴더 삭제"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      >
        <strong className="font-semibold">{deleteTarget?.name}</strong> 폴더를
        삭제할까요?
        <br />
        <span className="text-sm leading-[1.4] text-[var(--text-sub)]">
          삭제한 폴더는 되돌릴 수 없어요.
        </span>
      </ConfirmDialog>
    </>
  );
}
