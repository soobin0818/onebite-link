import SidebarLink from "@/components/SidebarLink";
import type { Folder } from "@/lib/types";

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {folders.map((folder) => (
        <li key={folder.id}>
          <SidebarLink href={`/folder/${folder.id}`}>
            <span aria-hidden>📁</span>
            {folder.name}
          </SidebarLink>
        </li>
      ))}
    </ul>
  );
}
