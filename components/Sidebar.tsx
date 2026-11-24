import FolderList from "@/components/FolderList";
import SidebarLink from "@/components/SidebarLink";

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-[var(--border)] bg-[var(--hover-bg)]/50 px-2 py-4">
      <nav className="sticky top-16 flex flex-col gap-4">
        <SidebarLink href="/">
          <span aria-hidden>🏠</span>
          전체 링크
        </SidebarLink>
        <div className="flex flex-col gap-1">
          <h2 className="px-3 pb-1 text-xs leading-[1.4] font-semibold text-[var(--text-sub)]">
            폴더
          </h2>
          <FolderList />
        </div>
      </nav>
    </aside>
  );
}
