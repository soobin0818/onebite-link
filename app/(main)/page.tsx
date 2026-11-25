import LinkCount from "@/components/LinkCount";
import LinkGrid from "@/components/LinkGrid";

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
