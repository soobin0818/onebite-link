import type { Folder, LinkItem } from "./types";

export const folders: Folder[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "읽을거리" },
  { id: 4, name: "도구" },
];

export const links: LinkItem[] = [
  {
    id: 1,
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서. App Router와 서버 컴포넌트 가이드.",
    folderId: 1,
  },
  {
    id: 2,
    title: "React",
    url: "https://react.dev",
    description: "React 공식 문서와 튜토리얼.",
    folderId: 1,
  },
  {
    id: 3,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크.",
    folderId: 2,
  },
  {
    id: 4,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술에 대한 레퍼런스.",
    folderId: 3,
  },
  {
    id: 5,
    title: "Figma",
    url: "https://www.figma.com",
    description: "협업 가능한 인터페이스 디자인 도구.",
    folderId: 2,
  },
  {
    id: 6,
    title: "GitHub",
    url: "https://github.com",
    description: "코드 호스팅과 협업 플랫폼.",
    folderId: 4,
  },
];
