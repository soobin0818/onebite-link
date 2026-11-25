"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import AuthField from "@/components/AuthField";
import Toast from "@/components/Toast";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { createClient } from "@/utils/supabase/client";

const FALLBACK_ERROR =
  "비밀번호를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  // Cache Components는 이동한 페이지를 숨겨서 상태째 보존하므로(Activity),
  // 화면이 숨겨질 때 진행 상태와 비밀번호를 비워 다시 왔을 때 버튼이 잠겨 있지 않게 한다
  useLayoutEffect(() => {
    return () => {
      pendingRef.current = false;
      setPending(false);
      setPassword("");
      setPasswordConfirm("");
      setToast(null);
    };
  }, []);

  const filled = password !== "" && passwordConfirm !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pendingRef.current || !filled) return;

    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않아요.");
      return;
    }

    pendingRef.current = true;
    setPending(true);
    let succeeded = false;

    try {
      // 재설정 링크로 만들어진 세션의 사용자 비밀번호를 바꾼다
      const { error } = await createClient().auth.updateUser({ password });

      if (error) {
        setToast(toKoreanAuthError(error, FALLBACK_ERROR));
        return;
      }

      succeeded = true;
      router.replace("/");
      router.refresh();
    } catch {
      setToast(FALLBACK_ERROR);
    } finally {
      if (!succeeded) {
        pendingRef.current = false;
        setPending(false);
      }
    }
  };

  return (
    <>
      <Toast message={toast} onClose={closeToast} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="새 비밀번호"
          name="password"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthField
          label="새 비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="새 비밀번호를 한 번 더 입력하세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          type="submit"
          disabled={!filled || pending}
          className="transition-color btn-primary mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium"
        >
          {pending ? "변경하는 중…" : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
