import type { ChangeEvent } from "react";

type AuthFieldProps = {
  label: string;
  name: string;
  type: "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-[1.4] font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="field transition-color rounded-md px-3 py-2 text-base"
      />
    </label>
  );
}
