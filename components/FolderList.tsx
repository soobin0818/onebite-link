"use client";

import { useFolders } from "@/components/FoldersProvider";
import SidebarLink from "@/components/SidebarLink";

export default function FolderList() {
  const { folders } = useFolders();

  return (
    <ul className="flex flex-col gap-0.5">
      {folders.map((folder) => (
        <li key={folder.id}>
          <SidebarLink href={`/folder/${folder.id}`}>
            <span aria-hidden>📁</span>
            <span className="truncate">{folder.name}</span>
          </SidebarLink>
        </li>
      ))}
    </ul>
  );
}
