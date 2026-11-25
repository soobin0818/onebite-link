import type { ReactNode } from "react";
import Link from "next/link";

// 로그인·회원가입 화면 레이아웃: 헤더·사이드바 없이 가운데 정렬된 카드만 보여준다
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-[30px] leading-[1.2] font-bold"
        >
          <span aria-hidden>🔖</span>
          한입 링크
        </Link>
        {children}
      </div>
    </main>
  );
}
