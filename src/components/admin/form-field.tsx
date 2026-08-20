export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/75">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100";
