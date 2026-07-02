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
    <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2
          className={`mt-3 font-display text-4xl font-black leading-none tracking-tight sm:text-5xl ${light ? "text-white" : "text-emerald-950"}`}
        >
          {title}
          <span className="text-gradient-blue">.</span>
        </h2>
      </div>
      {action}
    </div>
  );
}
