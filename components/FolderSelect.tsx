import type { Folder } from "@/lib/types";

type FolderSelectProps = {
  name: string;
  folders: Folder[];
};

export default function FolderSelect({ name, folders }: FolderSelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-[1.4] font-medium">폴더</span>
      <select
        name={name}
        required
        defaultValue=""
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
