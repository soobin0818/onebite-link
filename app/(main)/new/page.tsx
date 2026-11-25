import type { Metadata } from "next";
import NewLinkForm from "@/components/NewLinkForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "새 링크",
  description: "저장할 링크를 입력하고 폴더를 선택해 추가하세요.",
  path: "/new",
});

export default function NewLinkPage() {
  return (
    <section className="flex max-w-lg flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-[30px] leading-[1.2] font-bold">새 링크</h1>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          저장할 링크와 폴더를 선택하세요.
        </p>
      </header>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <NewLinkForm />
      </div>
    </section>
  );
}
