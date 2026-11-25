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

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
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

  // 세 칸을 모두 채워야 회원가입 버튼을 누를 수 있다
  const filled =
    email.trim() !== "" && password !== "" && passwordConfirm !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 같은 틱의 연속 클릭까지 막기 위해 ref로도 잠근다
    if (pendingRef.current || !filled) return;

    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않아요.");
      return;
    }

    pendingRef.current = true;
    setPending(true);
    let succeeded = false;

    try {
      const { data, error } = await createClient().auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setToast(
          toKoreanAuthError(
            error,
            "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.",
          ),
        );
        return;
      }
      // 이메일 인증을 켜 둔 경우, 이미 가입된 이메일이면 오류 대신 identities가 빈 사용자를 돌려준다
      if (data.user && data.user.identities?.length === 0) {
        setToast("이미 가입된 이메일이에요.");
        return;
      }

      // 성공하면 페이지를 떠날 때까지 잠금을 유지해 중복 가입 요청을 막는다
      succeeded = true;
      router.push("/");
      router.refresh();
    } catch {
      setToast("회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.");
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          type="submit"
          disabled={!filled || pending}
          className="transition-color btn-primary mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium"
        >
          {pending ? "가입하는 중…" : "회원가입"}
        </button>
      </form>
    </>
  );
}
