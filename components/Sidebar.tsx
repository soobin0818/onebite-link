import FolderList from "@/components/FolderList";
import SidebarLink from "@/components/SidebarLink";
import type { Folder } from "@/lib/types";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 p-4 dark:border-zinc-800">
      <nav className="flex flex-col gap-4">
        <SidebarLink href="/">All</SidebarLink>
        <div className="flex flex-col gap-2">
          <h2 className="px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Folders
          </h2>
          <FolderList folders={folders} />
        </div>
      </nav>
    </aside>
  );
}
