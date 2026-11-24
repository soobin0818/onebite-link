"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { LinkItem } from "@/lib/types";

type LinksContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  removeLink: (id: number) => void;
  updateLink: (
    id: number,
    changes: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

type LinksProviderProps = {
  initialLinks: LinkItem[];
  children: ReactNode;
};

export default function LinksProvider({
  initialLinks,
  children,
}: LinksProviderProps) {
  const [links, setLinks] = useState(initialLinks);

  const addLink = (link: Omit<LinkItem, "id">) => {
    // TODO: 서버 저장 기능 구현 (현재는 클라이언트 상태에만 추가)
    // 최근에 저장한 링크가 먼저 보이도록 앞에 추가
    setLinks((prev) => [
      { ...link, id: Math.max(0, ...prev.map((l) => l.id)) + 1 },
      ...prev,
    ]);
  };

  const removeLink = (id: number) => {
    // TODO: 서버 삭제 기능 구현 (현재는 클라이언트 상태에서만 제거)
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLink: LinksContextValue["updateLink"] = (id, changes) => {
    // TODO: 서버 수정 기능 구현 (현재는 클라이언트 상태에서만 변경)
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...changes } : l)));
  };

  return (
    <LinksContext value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinksContext>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks는 LinksProvider 안에서 사용해야 합니다.");
  }
  return context;
}
