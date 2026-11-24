import type { ReactNode } from "react";
import { cookies } from "next/headers";
import FoldersProvider from "@/components/FoldersProvider";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

// folders 테이블의 폴더를 추가된 순서대로 불러와 FoldersProvider에 넘긴다
export default async function FoldersLoader({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);

  const folders: Folder[] = data ?? [];

  return <FoldersProvider initialFolders={folders}>{children}</FoldersProvider>;
}
