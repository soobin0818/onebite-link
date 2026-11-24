"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  /** 취소·Esc·바깥 클릭·확인 후 등 모달이 닫힐 때 호출 */
  onClose: () => void;
};

/** 삭제 등 되돌릴 수 없는 동작 전에 확인을 구하는 모달 */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = "삭제",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // 바깥(backdrop) 클릭 시 닫기
        if (e.target === e.currentTarget) close();
      }}
      className="modal m-auto w-[calc(100%-48px)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)]"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={titleId} className="text-xl leading-[1.3] font-semibold">
          {title}
        </h2>
        <div className="text-base leading-[1.6]">{children}</div>
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
            onClick={() => {
              onConfirm();
              close();
            }}
            className="transition-color btn-danger rounded-md px-4 py-2 text-sm font-medium"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
