import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

/** 다른 사이트로 빠져나가지 않도록 같은 사이트 안의 경로만 허용한다 */
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

/**
 * 메일로 받은 인증 링크(비밀번호 재설정 등)를 처리한다.
 * 링크의 일회용 코드를 로그인 세션으로 바꿔 쿠키에 저장한 뒤 `next` 경로로 보낸다.
 * - code: 기본(PKCE) 방식 — 링크를 요청한 브라우저에서 열어야 한다
 * - token_hash + type: 메일 템플릿을 token_hash 방식으로 바꾼 경우
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(searchParams.get("next"));

  const supabase = createClient(await cookies());
  let ok = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    ok = !error;
  }

  // 만료됐거나 이미 사용한 링크면 다시 요청할 수 있도록 비밀번호 찾기 페이지로 보낸다
  redirect(ok ? next : "/forgot-password?error=invalid_link");
}
