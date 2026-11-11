import { Container } from "@/components/Section";

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className="border-b border-line bg-paper">
      <Container className="py-12 md:py-16">
        <p className="text-sm font-medium text-copper-deep">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.35] text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{text}</p>
      </Container>
    </header>
  );
}
