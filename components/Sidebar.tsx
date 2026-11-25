import FolderList from "@/components/FolderList";
import LogoutButton from "@/components/LogoutButton";
import SidebarLink from "@/components/SidebarLink";

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-[var(--border)] bg-[var(--hover-bg)]/50">
      {/* 헤더(48px) 아래 화면 높이만큼 고정해, 로그아웃 버튼이 항상 사이드바 최하단에 보이게 한다 */}
      <div className="sticky top-12 flex h-[calc(100dvh-48px)] flex-col px-2 py-4">
        <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
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
        <div className="mt-4 border-t border-[var(--border)] pt-4">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
