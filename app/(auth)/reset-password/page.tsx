import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "비밀번호 재설정",
  description: "한입 링크에서 사용할 새 비밀번호를 설정하세요.",
  path: "/reset-password",
});

// 재설정 링크(/auth/confirm)를 거쳐 로그인된 상태에서만 열린다 (proxy.ts에서 확인)
export default function ResetPasswordPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-xl leading-[1.3] font-semibold">비밀번호 재설정</h1>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          새로 사용할 비밀번호를 입력해 주세요.
        </p>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
