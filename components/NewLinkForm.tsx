"use client";

import type { FormEvent } from "react";
import LinkUrlInput from "@/components/LinkUrlInput";
import FolderSelect from "@/components/FolderSelect";
import type { Folder } from "@/lib/types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // TODO: 저장 기능 구현 (현재는 UI만 구현)
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <LinkUrlInput name="url" />
      <FolderSelect name="folderId" folders={folders} />
      <button
        type="submit"
        className="h-11 rounded-full bg-foreground font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}
