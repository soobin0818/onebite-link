import type { Metadata } from "next";
import LinkCount from "@/components/LinkCount";
import LinkGrid from "@/components/LinkGrid";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "전체 링크",
  description: "저장한 모든 링크를 한눈에 확인하세요.",
  path: "/",
});

export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-[30px] leading-[1.2] font-bold">전체 링크</h1>
        <LinkCount label="저장한 링크" />
      </header>
      <LinkGrid />
    </section>
  );
}
