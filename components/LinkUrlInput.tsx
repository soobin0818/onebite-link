type LinkUrlInputProps = {
  name: string;
};

export default function LinkUrlInput({ name }: LinkUrlInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">링크</span>
      <input
        type="url"
        name={name}
        required
        placeholder="https://example.com"
        className="h-11 rounded-lg border border-zinc-200 bg-transparent px-3 outline-none transition-colors focus:border-foreground dark:border-zinc-800"
      />
    </label>
  );
}
