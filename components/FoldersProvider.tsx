"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

type FoldersProviderProps = {
  initialFolders: Folder[];
  children: ReactNode;
};

export default function FoldersProvider({
  initialFolders,
  children,
}: FoldersProviderProps) {
  const [folders, setFolders] = useState(initialFolders);

  const addFolder = async (name: string) => {
    // folders 테이블에 저장하고, DB가 발급한 id로 목록에 추가
    const { data, error } = await createClient()
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error) throw new Error(`폴더를 추가하지 못했습니다: ${error.message}`);

    setFolders((prev) => [...prev, data]);
  };

  const removeFolder = (id: number) => {
    // TODO: 서버 삭제 기능 구현 (현재는 클라이언트 상태에서만 제거)
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  const renameFolder = (id: number, name: string) => {
    // TODO: 서버 수정 기능 구현 (현재는 클라이언트 상태에서만 변경)
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  };

  return (
    <FoldersContext value={{ folders, addFolder, removeFolder, renameFolder }}>
      {children}
    </FoldersContext>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders는 FoldersProvider 안에서 사용해야 합니다.");
  }
  return context;
}
