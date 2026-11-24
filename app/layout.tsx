import type { Metadata } from "next";
import { Suspense } from "react";
import FoldersLoader from "@/components/FoldersLoader";
import Header from "@/components/Header";
import LinksProvider from "@/components/LinksProvider";
import Sidebar from "@/components/Sidebar";
import { links } from "@/lib/mock-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* 폴더는 요청 시점에 DB에서 불러오므로 Suspense로 감싼다 (cacheComponents) */}
        <Suspense fallback={null}>
          <FoldersLoader>
            <LinksProvider initialLinks={links}>
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="min-w-0 flex-1 px-6 pt-10 pb-16">
                  <div className="mx-auto w-full max-w-[720px]">{children}</div>
                </main>
              </div>
            </LinksProvider>
          </FoldersLoader>
        </Suspense>
      </body>
    </html>
  );
}
