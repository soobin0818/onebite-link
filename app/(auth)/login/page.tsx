import type { Metadata } from "next";
import Link from "next/link";
import AuthField from "@/components/AuthField";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <AuthForm submitLabel="로그인">
          <AuthField
            label="이메일"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <AuthField
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
          />
        </AuthForm>
      </div>
      <p className="text-center text-sm leading-[1.4] text-[var(--text-sub)]">
        아직 계정이 없나요?{" "}
        <Link href="/signup" className="text-link font-medium">
          회원가입
        </Link>
      </p>
    </section>
  );
}
