export type ImagePosition = "center" | "top" | "bottom";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: ImagePosition;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  details: readonly string[];
  image: string;
  imageAlt: string;
  imagePosition: ImagePosition;
  featured: boolean;
};

export type ContactSettings = {
  phoneDisplay: string;
  phoneInternational: string;
  phoneHref: string;
  phoneE164: string;
  whatsappNumber: string;
  city: string;
  area: string;
  street: string;
  addressLine: string;
  mapsQuery: string;
};

export function asImagePosition(value: string): ImagePosition {
  if (value === "top" || value === "bottom" || value === "center") return value;
  return "center";
}

export function asStringDetails(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
