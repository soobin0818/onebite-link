import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import InvalidLinkToast from "@/components/InvalidLinkToast";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | 한입 링크",
};

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-col gap-6">
      {/* 쿼리스트링을 읽는 부분만 Suspense로 감싸 폼은 정적으로 그린다 */}
      <Suspense fallback={null}>
        <InvalidLinkToast />
      </Suspense>
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-xl leading-[1.3] font-semibold">비밀번호 찾기</h1>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드려요.
        </p>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <ForgotPasswordForm />
      </div>
      <p className="text-center text-sm leading-[1.4] text-[var(--text-sub)]">
        비밀번호가 기억났나요?{" "}
        <Link href="/login" className="text-link font-medium">
          로그인
        </Link>
      </p>
    </section>
  );
}
