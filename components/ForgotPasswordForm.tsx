"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import AuthField from "@/components/AuthField";
import Toast from "@/components/Toast";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { createClient } from "@/utils/supabase/client";

const FALLBACK_ERROR =
  "재설정 링크를 보내지 못했어요. 잠시 후 다시 시도해 주세요.";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const filled = email.trim() !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pendingRef.current || !filled) return;

    pendingRef.current = true;
    setPending(true);
    const target = email.trim();

    try {
      // 메일의 링크를 누르면 /auth/confirm에서 세션을 만든 뒤 비밀번호 재설정 페이지로 이동한다
      const { error } = await createClient().auth.resetPasswordForEmail(
        target,
        {
          redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
        },
      );

      if (error) {
        setToast(toKoreanAuthError(error, FALLBACK_ERROR));
        return;
      }
      // 가입 여부를 노출하지 않도록 Supabase는 없는 이메일에도 성공을 돌려준다
      setSentTo(target);
    } catch {
      setToast(FALLBACK_ERROR);
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  };

  return (
    <>
      <Toast message={toast} onClose={closeToast} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="이메일"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {sentTo && (
          <p
            role="status"
            className="rounded-md bg-[var(--hover-bg)] px-3 py-2 text-sm leading-[1.4]"
          >
            <span className="font-medium">{sentTo}</span>(으)로 비밀번호 재설정
            링크를 보냈어요. 메일함을 확인해 주세요.
          </p>
        )}
        <button
          type="submit"
          disabled={!filled || pending}
          className="transition-color btn-primary mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium"
        >
          {pending
            ? "보내는 중…"
            : sentTo
              ? "재설정 링크 다시 보내기"
              : "재설정 링크 보내기"}
        </button>
      </form>
    </>
  );
}
