"use client";

import { useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/components/FoldersProvider";

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const { addFolder } = useFolders();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="transition-color btn-secondary flex items-center rounded-md px-4 py-2 text-sm leading-none font-medium"
      >
        + 새 폴더
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="new-folder-title"
        onClose={() => setName("")}
        onClick={(e) => {
          // 바깥(backdrop) 클릭 시 닫기
          if (e.target === e.currentTarget) close();
        }}
        className="modal m-auto w-[calc(100%-48px)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <h2
            id="new-folder-title"
            className="text-xl leading-[1.3] font-semibold"
          >
            새 폴더
          </h2>
          <label className="flex flex-col gap-2">
            <span className="text-sm leading-[1.4] font-medium">폴더 이름</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              maxLength={30}
              placeholder="예: 공부 자료"
              className="field transition-color rounded-md px-3 py-2 text-base"
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
              disabled={!name.trim()}
              className="transition-color btn-primary rounded-md px-4 py-2 text-sm font-medium"
            >
              저장
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
