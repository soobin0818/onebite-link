import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * 카카오 등 소셜 로그인을 마치고 돌아오는 경로.
 * Supabase가 넘겨준 일회용 코드를 로그인 세션으로 바꿔 쿠키에 저장한 뒤 인덱스로 보낸다.
 * 사용자가 동의를 취소했거나 코드가 잘못됐으면 로그인 페이지에서 오류 토스트를 띄운다.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect("/");
  }

  redirect("/login?error=social_login");
}
