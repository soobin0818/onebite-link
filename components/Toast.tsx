"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
  /** 자동으로 사라지기까지의 시간(ms) */
  duration?: number;
};

/** 화면 상단 가운데에 잠깐 나타났다 사라지는 오류 알림 */
export default function Toast({
  message,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    // 가운데 정렬은 바깥 래퍼의 flex로 처리해, 등장 애니메이션(transform)과 겹치지 않게 한다
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div
        role="alert"
        className="toast pointer-events-auto flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] py-3 pr-2 pl-4 text-sm leading-[1.4] shadow-[0_4px_12px_rgb(15_15_15/0.1)]"
      >
        <span aria-hidden className="text-[var(--error)]">
          ⚠
        </span>
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="transition-color item-hover rounded-md px-2 py-0.5 text-[var(--text-sub)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
