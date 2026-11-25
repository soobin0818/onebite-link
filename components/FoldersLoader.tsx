import type { ReactNode } from "react";
import { cookies } from "next/headers";
import AuthStateSync from "@/components/AuthStateSync";
import FoldersProvider from "@/components/FoldersProvider";
import { requireUser } from "@/lib/auth";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

// 로그인한 사용자의 폴더만 추가된 순서대로 불러와 FoldersProvider에 넘긴다
export default async function FoldersLoader({
  children,
}: {
  children: ReactNode;
}) {
  // 헤더·사이드바가 있는 모든 페이지가 이 로더를 거치므로, 여기서 로그인 여부를 확인한다
  const user = await requireUser();

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("user_id", user.id)
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);

  const folders: Folder[] = data ?? [];

  return (
    // 계정이 바뀌면 key가 달라져 Provider가 새로 만들어지고, 이전 계정의 목록 대신 새로 불러온 목록으로 시작한다
    <FoldersProvider key={user.id} initialFolders={folders}>
      <AuthStateSync userId={user.id} />
      {children}
    </FoldersProvider>
  );
}
