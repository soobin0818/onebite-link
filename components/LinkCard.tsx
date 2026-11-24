"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/types";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname.replace(/^www\./, "");
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(link.image) && !imageFailed;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-color card-hover flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)]"
    >
      {showImage && (
        // 외부 임의 도메인 이미지라 next/image 대신 img 사용
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="aspect-[1.91/1] w-full border-b border-[var(--border)] bg-[var(--hover-bg)] object-cover"
        />
      )}
      <div className="flex flex-col gap-3 p-4">
        <div className="link-card-head flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-semibold uppercase">
            {hostname[0]}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base leading-[1.4] font-semibold">
              {link.title}
            </h3>
            <p className="truncate text-[13px] leading-[1.4] text-[var(--text-sub)]">
              {hostname}
            </p>
          </div>
        </div>
        {link.description && (
          <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}
