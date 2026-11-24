"use client";

import { notFound } from "next/navigation";
import { useFolders } from "@/components/FoldersProvider";
import LinkCount from "@/components/LinkCount";

type FolderHeaderProps = {
  folderId: number;
};

export default function FolderHeader({ folderId }: FolderHeaderProps) {
  const { folders } = useFolders();
  const folder = folders.find((f) => f.id === folderId);

  if (!folder) notFound();

  return (
    <header className="flex flex-col gap-1">
      <span aria-hidden className="text-[40px] leading-none">
        📁
      </span>
      <h1 className="mt-3 text-[30px] leading-[1.2] font-bold">
        {folder.name}
      </h1>
      <LinkCount label="링크" folderId={folderId} />
    </header>
  );
}
