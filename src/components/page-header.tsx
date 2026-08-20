export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-wide text-forest-500">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-1 text-3xl font-semibold text-forest-900 md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-foreground/65">{description}</p>
        )}
      </div>
    </div>
  );
}
