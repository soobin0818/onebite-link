"use client";

import type { FormEvent, ReactNode } from "react";

type AuthFormProps = {
  submitLabel: string;
  children: ReactNode;
};

// 로그인·회원가입 폼 UI
// 인증 기능은 아직 연결하지 않았으므로 제출 시 페이지가 이동하지 않도록만 막는다
// (기본 GET 제출이 일어나면 비밀번호가 주소창에 노출되기 때문)
export default function AuthForm({ submitLabel, children }: AuthFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {children}
      <button
        type="submit"
        className="transition-color btn-primary mt-2 w-full rounded-md px-4 py-2.5 text-sm font-medium"
      >
        {submitLabel}
      </button>
    </form>
  );
}
