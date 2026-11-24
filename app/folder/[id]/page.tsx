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
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">📁 {folder.name}</h1>
      <LinkGrid links={folderLinks} />
    </section>
  );
}
