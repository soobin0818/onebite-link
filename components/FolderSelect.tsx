import type { Folder } from "@/lib/types";

type FolderSelectProps = {
  name: string;
  folders: Folder[];
};

export default function FolderSelect({ name, folders }: FolderSelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">폴더</span>
      <select
        name={name}
        required
        defaultValue=""
        className="h-11 rounded-lg border border-zinc-200 bg-transparent px-3 outline-none transition-colors focus:border-foreground dark:border-zinc-800"
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
