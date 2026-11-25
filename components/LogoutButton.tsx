"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  // Cache Components는 이동한 페이지를 숨겨서 상태째 보존하므로(Activity),
  // 화면이 숨겨질 때 "로그아웃하는 중" 상태를 풀어 다시 로그인했을 때 그대로 남지 않게 한다
  useLayoutEffect(() => {
    return () => {
      setPending(false);
      setToast(null);
    };
  }, []);

  const handleLogout = async () => {
    if (pending) return;
    setPending(true);

    const { error } = await createClient().auth.signOut();
    if (error) {
      setToast("로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.");
      setPending(false);
      return;
    }

    // 세션 쿠키가 지워졌으므로 로그인 페이지로 보내고, 서버 컴포넌트 캐시도 비운다
    router.replace("/login");
    router.refresh();
  };

  return (
    <>
      <Toast message={toast} onClose={closeToast} />
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        className="transition-color item-hover flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm leading-[1.4] text-[var(--text-sub)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span aria-hidden>↪</span>
        {pending ? "로그아웃하는 중…" : "로그아웃"}
      </button>
    </>
  );
}
