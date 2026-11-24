import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { OpenGraphData } from "./types";

const FETCH_TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 5;
/** <head>만 있으면 되므로 앞부분만 읽는다 */
const MAX_HTML_BYTES = 1024 * 1024;

export class OpenGraphError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/** 사용자 입력 문자열을 http(s) URL로 검증 */
export function parseHttpUrl(input: string): URL {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new OpenGraphError("올바른 URL 형식이 아니에요.", 400);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new OpenGraphError("http 또는 https 주소만 사용할 수 있어요.", 400);
  }
  return url;
}

/** 페이지에 접속해 오픈 그래프 정보를 추출한다 */
export async function fetchOpenGraph(url: URL): Promise<OpenGraphData> {
  const { finalUrl, html } = await fetchHtml(url);
  const meta = parseMetaTags(html);

  const title =
    meta["og:title"] ||
    meta["twitter:title"] ||
    parseTitleTag(html) ||
    finalUrl.hostname;
  const description =
    meta["og:description"] ||
    meta["twitter:description"] ||
    meta["description"] ||
    "";
  const rawImage =
    meta["og:image"] ||
    meta["og:image:url"] ||
    meta["og:image:secure_url"] ||
    meta["twitter:image"] ||
    meta["twitter:image:src"];

  return {
    url: url.toString(),
    title: title.trim(),
    description: description.trim(),
    image: rawImage ? resolveImageUrl(rawImage, finalUrl) : null,
  };
}

async function fetchHtml(startUrl: URL): Promise<{ finalUrl: URL; html: string }> {
  let current = startUrl;

  // 리다이렉트를 직접 따라가며 매 단계마다 내부망 주소인지 검사 (SSRF 방지)
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertPublicHost(current.hostname);

    let res: Response;
    try {
      res = await fetch(current, {
        redirect: "manual",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          // 일부 사이트는 봇 UA에만 OG 태그를 내려준다
          "User-Agent":
            "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://ogp.me)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "ko,en;q=0.8",
        },
      });
    } catch {
      throw new OpenGraphError("페이지에 접속하지 못했어요.", 502);
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) break;
      current = parseHttpUrl(new URL(location, current).toString());
      continue;
    }

    if (!res.ok) {
      throw new OpenGraphError(`페이지 응답 오류 (${res.status})`, 502);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType && !contentType.includes("html")) {
      throw new OpenGraphError("HTML 페이지가 아니에요.", 502);
    }

    const bytes = await readLimited(res, MAX_HTML_BYTES);
    return { finalUrl: current, html: decodeHtml(bytes, contentType) };
  }

  throw new OpenGraphError("리다이렉트가 너무 많아요.", 502);
}

async function readLimited(res: Response, limit: number): Promise<Uint8Array> {
  if (!res.body) return new Uint8Array();
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (total < limit) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
  }
  await reader.cancel().catch(() => {});

  const out = new Uint8Array(Math.min(total, limit));
  let offset = 0;
  for (const chunk of chunks) {
    const part = chunk.subarray(0, out.length - offset);
    out.set(part, offset);
    offset += part.length;
    if (offset >= out.length) break;
  }
  return out;
}

/** content-type 헤더 또는 <meta charset>을 보고 디코딩 (EUC-KR 등 대응) */
function decodeHtml(bytes: Uint8Array, contentType: string): string {
  const headerCharset = /charset=([\w-]+)/i.exec(contentType)?.[1];
  const utf8 = new TextDecoder("utf-8").decode(bytes);
  const metaCharset =
    /<meta[^>]+charset=["']?([\w-]+)/i.exec(utf8.slice(0, 4096))?.[1];
  const charset = (headerCharset || metaCharset || "utf-8").toLowerCase();

  if (charset === "utf-8" || charset === "utf8") return utf8;
  try {
    return new TextDecoder(charset).decode(bytes);
  } catch {
    return utf8;
  }
}

/** <meta property|name="..." content="..."> 를 키-값으로 수집 (첫 번째 값 우선) */
function parseMetaTags(html: string): Record<string, string> {
  const head = html.split(/<\/head>/i)[0];
  const result: Record<string, string> = {};

  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs: Record<string, string> = {};
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
    }
    const key = (attrs.property || attrs.name || "").toLowerCase();
    const content = attrs.content;
    if (key && content && !(key in result)) {
      result[key] = decodeEntities(content);
    }
  }
  return result;
}

function parseTitleTag(html: string): string {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return match ? decodeEntities(match[1]).replace(/\s+/g, " ") : "";
}

function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (whole, code: string) => {
    if (code[0] === "#") {
      const n =
        code[1].toLowerCase() === "x"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isNaN(n) ? whole : String.fromCodePoint(n);
    }
    return named[code.toLowerCase()] ?? whole;
  });
}

function resolveImageUrl(raw: string, base: URL): string | null {
  try {
    const url = new URL(raw, base);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

/** localhost·사설망·링크로컬 주소로의 요청을 차단 */
async function assertPublicHost(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost")) {
    throw new OpenGraphError("접근할 수 없는 주소예요.", 400);
  }

  let addresses: string[];
  if (isIP(host)) {
    addresses = [host];
  } else {
    try {
      addresses = (await lookup(host, { all: true })).map((a) => a.address);
    } catch {
      throw new OpenGraphError("존재하지 않는 도메인이에요.", 400);
    }
  }

  if (addresses.some(isPrivateAddress)) {
    throw new OpenGraphError("접근할 수 없는 주소예요.", 400);
  }
}

function isPrivateAddress(address: string): boolean {
  const v4 = address.startsWith("::ffff:") ? address.slice(7) : address;
  if (isIP(v4) === 4) {
    const [a, b] = v4.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }
  const v6 = address.toLowerCase();
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    v6.startsWith("fe80")
  );
}
