import FolderHeader from "@/components/FolderHeader";
import LinkGrid from "@/components/LinkGrid";
import { folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

export default async function FolderPage({
  params,
}: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folderId = Number(id);

  // 폴더·링크는 클라이언트 상태에 있으므로 조회와 404 처리는 클라이언트 컴포넌트에서 한다
  return (
    <section className="flex flex-col gap-8">
      <FolderHeader folderId={folderId} />
      <LinkGrid folderId={folderId} />
    </section>
  );
}
