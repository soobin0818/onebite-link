import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "회원가입",
  description: "한입 링크에 가입하고 나만의 북마크를 폴더별로 정리해 보세요.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <SignupForm />
      </div>
      <p className="text-center text-sm leading-[1.4] text-[var(--text-sub)]">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="text-link font-medium">
          로그인
        </Link>
      </p>
    </section>
  );
}
