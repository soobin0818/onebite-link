import type { Metadata } from "next";
import FoldersProvider from "@/components/FoldersProvider";
import Header from "@/components/Header";
import LinksProvider from "@/components/LinksProvider";
import Sidebar from "@/components/Sidebar";
import { folders, links } from "@/lib/mock-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <FoldersProvider initialFolders={folders}>
          <LinksProvider initialLinks={links}>
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="min-w-0 flex-1 px-6 pt-10 pb-16">
                <div className="mx-auto w-full max-w-[720px]">{children}</div>
              </main>
            </div>
          </LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
