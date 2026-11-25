import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <LoginForm />
      </div>
      <div className="flex flex-col items-center gap-2 text-sm leading-[1.4]">
        <Link href="/forgot-password" className="text-link">
          비밀번호를 잊으셨나요?
        </Link>
        <p className="text-[var(--text-sub)]">
          아직 계정이 없나요?{" "}
          <Link href="/signup" className="text-link font-medium">
            회원가입
          </Link>
        </p>
      </div>
    </section>
  );
}
