import LinkGrid from "@/components/LinkGrid";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-[30px] leading-[1.2] font-bold">전체 링크</h1>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          저장한 링크 {links.length}개
        </p>
      </header>
      <LinkGrid links={links} />
    </section>
  );
}
