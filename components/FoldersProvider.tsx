"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/lib/types";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: number) => void;
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

  const addFolder = (name: string) => {
    // TODO: 서버 저장 기능 구현 (현재는 클라이언트 상태에만 추가)
    setFolders((prev) => [
      ...prev,
      { id: Math.max(0, ...prev.map((f) => f.id)) + 1, name },
    ]);
  };

  const removeFolder = (id: number) => {
    // TODO: 서버 삭제 기능 구현 (현재는 클라이언트 상태에서만 제거)
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FoldersContext value={{ folders, addFolder, removeFolder }}>
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
