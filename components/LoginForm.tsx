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

const FALLBACK_ERROR = "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setToast(null);
    };
  }, []);

  // 이메일과 비밀번호를 모두 채워야 로그인 버튼을 누를 수 있다
  const filled = email.trim() !== "" && password !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 같은 틱의 연속 클릭까지 막기 위해 ref로도 잠근다
    if (pendingRef.current || !filled) return;

    pendingRef.current = true;
    setPending(true);
    let succeeded = false;

    try {
      const { error } = await createClient().auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setToast(toKoreanAuthError(error, FALLBACK_ERROR));
        return;
      }

      // 성공하면 페이지를 떠날 때까지 잠금을 유지해 중복 요청을 막는다
      succeeded = true;
      router.push("/");
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
          label="이메일"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!filled || pending}
          className="transition-color btn-primary mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium"
        >
          {pending ? "로그인하는 중…" : "로그인"}
        </button>
      </form>
    </>
  );
}
