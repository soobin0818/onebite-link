import { notFound } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

export default async function FolderPage({
  params,
}: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = folders.find((f) => String(f.id) === id);

  if (!folder) notFound();

  const folderLinks = links.filter((link) => link.folderId === folder.id);

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <span aria-hidden className="text-[40px] leading-none">
          📁
        </span>
        <h1 className="mt-3 text-[30px] leading-[1.2] font-bold">
          {folder.name}
        </h1>
        <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
          링크 {folderLinks.length}개
        </p>
      </header>
      <LinkGrid links={folderLinks} />
    </section>
  );
}
