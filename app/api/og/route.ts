import type { NextRequest } from "next/server";
import {
  OpenGraphError,
  fetchOpenGraph,
  parseHttpUrl,
} from "@/lib/open-graph";

/**
 * GET /api/og?url=https://example.com
 * 해당 페이지의 오픈 그래프 정보(제목, 설명, 썸네일, 링크 주소)를 반환한다.
 */
export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("url");
  if (!input) {
    return Response.json(
      { error: "url 파라미터가 필요해요." },
      { status: 400 },
    );
  }

  try {
    const data = await fetchOpenGraph(parseHttpUrl(input));
    return Response.json(data);
  } catch (error) {
    if (error instanceof OpenGraphError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("[api/og]", error);
    return Response.json(
      { error: "오픈 그래프 정보를 가져오지 못했어요." },
      { status: 500 },
    );
  }
}
