type LinkUrlInputProps = {
  name: string;
};

export default function LinkUrlInput({ name }: LinkUrlInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-[1.4] font-medium">링크</span>
      <input
        type="url"
        name={name}
        required
        placeholder="https://example.com"
        className="field transition-color rounded-md px-3 py-2 text-base"
      />
    </label>
  );
}
