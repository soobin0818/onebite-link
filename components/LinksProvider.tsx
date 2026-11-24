"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LINK_COLUMNS, toLinkItem } from "@/lib/links";
import type { LinkItem } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type LinksContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  removeLink: (id: number) => void;
  updateLink: (
    id: number,
    changes: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => Promise<void>;
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

  const addLink = async (link: Omit<LinkItem, "id">) => {
    // links 테이블에 저장하고, DB가 발급한 id로 목록에 추가
    const { data, error } = await createClient()
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.image ?? null,
        folder_id: link.folderId,
      })
      .select(LINK_COLUMNS)
      .single();

    if (error) throw new Error(`링크를 저장하지 못했습니다: ${error.message}`);

    // 최근에 저장한 링크가 먼저 보이도록 앞에 추가
    setLinks((prev) => [toLinkItem(data), ...prev]);
  };

  const removeLink = (id: number) => {
    // TODO: 서버 삭제 기능 구현 (현재는 클라이언트 상태에서만 제거)
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLink: LinksContextValue["updateLink"] = async (id, changes) => {
    // links 테이블을 수정하고, 성공하면 목록에도 반영
    const { error } = await createClient()
      .from("links")
      .update({
        title: changes.title,
        description: changes.description,
        folder_id: changes.folderId,
      })
      .eq("id", id);

    if (error) throw new Error(`링크를 수정하지 못했습니다: ${error.message}`);

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
