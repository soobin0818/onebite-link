import type { Metadata } from "next";

export const SITE_NAME = "한입 링크";
export const SITE_DESCRIPTION =
  "자주 찾는 링크를 폴더별로 저장하고 한눈에 관리하는 북마크 서비스";

/**
 * 오픈그래프 이미지 등 절대 주소가 필요한 메타태그의 기준 주소
 * NEXT_PUBLIC_SITE_URL → Vercel 운영 도메인 → 로컬 개발 서버 순으로 사용한다
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** public/thumbnail.png (2400×1260) */
const THUMBNAIL = {
  url: "/thumbnail.png",
  width: 2400,
  height: 1260,
  alt: SITE_NAME,
};

/** 모든 페이지가 공유하는 기본 오픈그래프·트위터 카드 정보 */
export const defaultSocialMetadata = {
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [THUMBNAIL],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [THUMBNAIL.url],
  },
} satisfies Metadata;

type PageMetadataOptions = {
  /** 탭 제목. 레이아웃의 템플릿에 따라 "제목 | 한입 링크"로 표시된다 */
  title: string;
  description?: string;
  /** 이 페이지의 경로 (og:url) */
  path: string;
};

/**
 * 페이지별 메타데이터를 만든다.
 * openGraph·twitter는 하위 페이지에서 지정하면 레이아웃의 값을 통째로 덮어쓰므로,
 * 썸네일 등 공통 값을 함께 넣어 빠지지 않게 한다.
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      ...defaultSocialMetadata.openGraph,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      ...defaultSocialMetadata.twitter,
      title: fullTitle,
      description,
    },
  };
}
