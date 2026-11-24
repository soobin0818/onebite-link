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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <LinkUrlInput name="url" />
      <FolderSelect name="folderId" folders={folders} />
      <button
        type="submit"
        className="transition-color btn-primary mt-2 self-end rounded-md px-4 py-2 text-sm font-medium"
      >
        저장
      </button>
    </form>
  );
}
