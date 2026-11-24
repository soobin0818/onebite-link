"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SidebarLinkProps = {
  href: string;
  children: ReactNode;
};

export default function SidebarLink({ href, children }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`transition-color item-hover flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm leading-[1.4] ${
        isActive
          ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
          : "text-[var(--text-sub)]"
      }`}
    >
      {children}
    </Link>
  );
}
