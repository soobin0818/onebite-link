"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import LinkUrlInput from "@/components/LinkUrlInput";
import FolderSelect from "@/components/FolderSelect";
import { useFolders } from "@/components/FoldersProvider";
import { useLinks } from "@/components/LinksProvider";
import type { OpenGraphData } from "@/lib/types";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = String(formData.get("url") ?? "").trim();
    const folderId = Number(formData.get("folderId"));

    setPending(true);
    setError(null);

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      let og: OpenGraphData;
      if (res.ok) {
        og = data;
      } else if (res.status === 400) {
        // 잘못된 주소·접근 불가 주소는 저장하지 않는다
        setError(data.error ?? "링크를 확인해 주세요.");
        return;
      } else {
        // 사이트가 응답하지 않는 등 정보 수집만 실패한 경우엔 주소만으로 저장
        og = {
          url,
          title: new URL(url).hostname,
          description: "",
          image: null,
        };
      }

      addLink({
        url: og.url,
        title: og.title,
        description: og.description,
        image: og.image ?? undefined,
        folderId,
      });
      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <LinkUrlInput name="url" />
      <FolderSelect name="folderId" folders={folders} />
      {error && (
        <p role="alert" className="text-sm leading-[1.4] text-[var(--error)]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="transition-color btn-primary mt-2 self-end rounded-md px-4 py-2 text-sm font-medium"
      >
        {pending ? "링크 정보 가져오는 중…" : "저장"}
      </button>
    </form>
  );
}
