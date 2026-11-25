import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * 로그인한 사용자를 돌려주고, 로그인하지 않았으면 로그인 페이지로 보낸다.
 * proxy의 리다이렉트는 1차 확인일 뿐이므로, 보호된 데이터를 읽는 서버 코드에서도 다시 확인한다.
 * 요청 쿠키를 읽으므로 Suspense 경계 안에서 호출해야 한다.
 * 폴더·링크 로더가 함께 호출하므로 cache로 한 요청 안에서는 한 번만 조회한다.
 */
export const requireUser = cache(async () => {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return user;
});
