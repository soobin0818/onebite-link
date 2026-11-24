import type { Folder } from "@/lib/types";

type FolderSelectProps = {
  name: string;
  folders: Folder[];
  /** 미리 선택해 둘 폴더 id */
  defaultValue?: number;
};

export default function FolderSelect({
  name,
  folders,
  defaultValue,
}: FolderSelectProps) {
  // 선택한 폴더가 삭제되어 목록에 없으면 "폴더를 선택하세요"로 둔다
  const initial = folders.some((f) => f.id === defaultValue)
    ? String(defaultValue)
    : "";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-[1.4] font-medium">폴더</span>
      <select
        name={name}
        required
        defaultValue={initial}
        className="field select-arrow transition-color rounded-md py-2 pl-3 text-base"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}
