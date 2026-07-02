import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  action,
  light = false,
}: Props) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2
          className={`mt-2 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl ${light ? "text-stone-50" : "text-emerald-950"}`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
