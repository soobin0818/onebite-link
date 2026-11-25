import type { ReactNode } from "react";
import { Suspense } from "react";
import FoldersLoader from "@/components/FoldersLoader";
import Header from "@/components/Header";
import LinksLoader from "@/components/LinksLoader";
import Sidebar from "@/components/Sidebar";

// 헤더·사이드바가 있는 서비스 화면 공통 레이아웃 (로그인·회원가입 화면은 제외)
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    // 폴더·링크는 요청 시점에 DB에서 불러오므로 Suspense로 감싼다 (cacheComponents)
    <Suspense fallback={null}>
      <FoldersLoader>
        <LinksLoader>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="min-w-0 flex-1 px-6 pt-10 pb-16">
              <div className="mx-auto w-full max-w-[720px]">{children}</div>
            </main>
          </div>
        </LinksLoader>
      </FoldersLoader>
    </Suspense>
  );
}
