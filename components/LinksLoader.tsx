import type { ReactNode } from "react";
import { cookies } from "next/headers";
import LinksProvider from "@/components/LinksProvider";
import { LINK_COLUMNS, toLinkItem } from "@/lib/links";
import { createClient } from "@/utils/supabase/server";

// links 테이블의 링크를 최근에 추가한 순서대로 불러와 LinksProvider에 넘긴다
export default async function LinksLoader({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("links")
    .select(LINK_COLUMNS)
    .order("id", { ascending: false });

  if (error) throw new Error(`링크 목록을 불러오지 못했습니다: ${error.message}`);

  return (
    <LinksProvider initialLinks={(data ?? []).map(toLinkItem)}>
      {children}
    </LinksProvider>
  );
}
