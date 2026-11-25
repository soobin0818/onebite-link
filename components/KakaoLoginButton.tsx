"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

const FALLBACK_ERROR =
  "카카오 로그인을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.";

export default function KakaoLoginButton() {
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  // 카카오 페이지에서 뒤로 가기로 돌아오면 브라우저가 이전 화면을 그대로 복원(bfcache)하므로 잠금을 푼다
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setPending(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleClick = async () => {
    if (pending) return;
    setPending(true);

    // 카카오 동의 화면으로 이동했다가 /auth/callback으로 돌아와 세션을 만든다
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setToast(FALLBACK_ERROR);
      setPending(false);
    }
  };

  return (
    <>
      <Toast message={toast} onClose={closeToast} />
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="kakao-login block w-full overflow-hidden rounded-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {/* 카카오 디자인 가이드 버튼 이미지(600×90)를 폼 너비에 맞춰 줄여 고해상도 화면에서도 선명하게 보이게 한다 */}
        <Image
          src="/kakao_login_large_wide.png"
          alt="카카오 로그인"
          width={600}
          height={90}
          className="h-auto w-full"
          loading="eager"
        />
      </button>
    </>
  );
}
