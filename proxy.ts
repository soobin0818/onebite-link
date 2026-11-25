import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// 로그인하지 않아도 열 수 있는 페이지. 그 밖의 페이지(인덱스·폴더별·새 링크 등)는 로그인이 필요하다
// /reset-password는 재설정 링크로 로그인된 상태에서만 열 수 있으므로 여기에 넣지 않는다
const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/auth/confirm",
  "/auth/callback",
];

// Next.js 16부터 middleware는 proxy로 이름이 바뀌었다
export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const isPublic = PUBLIC_PATHS.includes(request.nextUrl.pathname);
  if (!user && !isPublic) {
    const redirect = NextResponse.redirect(new URL("/login", request.url));
    // 세션 갱신 중 바뀐 쿠키(만료 토큰 정리 등)를 리다이렉트 응답에도 옮겨 담는다
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  // 정적 파일·이미지·API 라우트는 세션 갱신 대상에서 제외
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
