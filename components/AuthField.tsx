type AuthFieldProps = {
  label: string;
  name: string;
  type: "email" | "password";
  placeholder?: string;
  autoComplete?: string;
};

export default function AuthField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
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
        className="field transition-color rounded-md px-3 py-2 text-base"
      />
    </label>
  );
}
