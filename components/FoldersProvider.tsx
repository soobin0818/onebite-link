"use client";

import {
  createContext,
  startTransition,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: number, onRemoved?: () => void) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
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

  const removeFolder = async (id: number, onRemoved?: () => void) => {
    // folders 테이블에서 삭제하고, 성공하면 목록에서도 제거
    const { error } = await createClient().from("folders").delete().eq("id", id);

    if (error) throw new Error(`폴더를 삭제하지 못했습니다: ${error.message}`);

    // onRemoved(예: 홈 이동)와 목록 제거를 한 transition으로 묶어 404 깜빡임 방지
    startTransition(() => {
      onRemoved?.();
      setFolders((prev) => prev.filter((f) => f.id !== id));
    });
  };

  const renameFolder = async (id: number, name: string) => {
    // folders 테이블의 이름을 수정하고, 성공하면 목록에도 반영
    const { error } = await createClient()
      .from("folders")
      .update({ name })
      .eq("id", id);

    if (error) throw new Error(`폴더 이름을 수정하지 못했습니다: ${error.message}`);

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
