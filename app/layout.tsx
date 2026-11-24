import type { Metadata } from "next";
import { Suspense } from "react";
import FoldersLoader from "@/components/FoldersLoader";
import Header from "@/components/Header";
import LinksLoader from "@/components/LinksLoader";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* 폴더·링크는 요청 시점에 DB에서 불러오므로 Suspense로 감싼다 (cacheComponents) */}
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
      </body>
    </html>
  );
}
