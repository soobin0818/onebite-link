import FolderHeader from "@/components/FolderHeader";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

export default async function FolderPage({
  params,
}: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folderId = Number(id);
  const folderLinks = links.filter((link) => link.folderId === folderId);

  // 새로 추가한 폴더는 클라이언트 상태에만 있으므로 폴더 조회·404 처리는 FolderHeader에서 한다
  return (
    <section className="flex flex-col gap-8">
      <FolderHeader folderId={folderId} linkCount={folderLinks.length} />
      <LinkGrid links={folderLinks} />
    </section>
  );
}
