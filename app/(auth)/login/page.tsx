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
      <p className="text-center text-sm leading-[1.4] text-[var(--text-sub)]">
        아직 계정이 없나요?{" "}
        <Link href="/signup" className="text-link font-medium">
          회원가입
        </Link>
      </p>
    </section>
  );
}
