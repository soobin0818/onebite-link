import type { ReactNode } from "react";
import { cookies } from "next/headers";
import LinksProvider from "@/components/LinksProvider";
import { requireUser } from "@/lib/auth";
import { LINK_COLUMNS, toLinkItem } from "@/lib/links";
import { createClient } from "@/utils/supabase/server";

// 로그인한 사용자의 링크만 최근에 추가한 순서대로 불러와 LinksProvider에 넘긴다
export default async function LinksLoader({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("links")
    .select(LINK_COLUMNS)
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) throw new Error(`링크 목록을 불러오지 못했습니다: ${error.message}`);

  return (
    // 계정이 바뀌면 key가 달라져 Provider가 새로 만들어지고, 이전 계정의 목록 대신 새로 불러온 목록으로 시작한다
    <LinksProvider key={user.id} initialLinks={(data ?? []).map(toLinkItem)}>
      {children}
    </LinksProvider>
  );
}
