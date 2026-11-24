import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Next.js 16부터 middleware는 proxy로 이름이 바뀌었다
export async function proxy(request: NextRequest) {
  return createClient(request);
}

export const config = {
  // 정적 파일·이미지·API 라우트는 세션 갱신 대상에서 제외
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
