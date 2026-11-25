import type { Metadata } from "next";
import { cookies } from "next/headers";
import FolderHeader from "@/components/FolderHeader";
import LinkGrid from "@/components/LinkGrid";
import { folders } from "@/lib/mock-data";
import { pageMetadata } from "@/lib/metadata";
import { createClient } from "@/utils/supabase/server";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

// 탭 제목에 폴더 이름을 보여준다. RLS로 로그인한 사용자 본인의 폴더만 조회된다
export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  const { id } = await params;
  const folderId = Number(id);

  let name: string | null = null;
  if (Number.isInteger(folderId)) {
    const supabase = createClient(await cookies());
    const { data } = await supabase
      .from("folders")
      .select("name")
      .eq("id", folderId)
      .maybeSingle();
    name = data?.name ?? null;
  }

  return pageMetadata({
    title: name ?? "폴더",
    description: name
      ? `'${name}' 폴더에 저장한 링크를 확인하세요.`
      : undefined,
    path: `/folder/${id}`,
  });
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
