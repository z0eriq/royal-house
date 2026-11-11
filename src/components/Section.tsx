import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium text-copper-deep">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-display text-4xl leading-[1.35] text-ink md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-8 text-muted">{text}</p> : null}
    </div>
  );
}
