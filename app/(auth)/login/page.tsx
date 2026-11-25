import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import LoginForm from "@/components/LoginForm";
import SearchParamErrorToast from "@/components/SearchParamErrorToast";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-6">
      {/* 쿼리스트링을 읽는 부분만 Suspense로 감싸 폼은 정적으로 그린다 */}
      <Suspense fallback={null}>
        <SearchParamErrorToast
          messages={{
            social_login:
              "카카오 로그인에 실패했어요. 잠시 후 다시 시도해 주세요.",
          }}
        />
      </Suspense>
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <LoginForm />
        <KakaoLoginButton />
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
