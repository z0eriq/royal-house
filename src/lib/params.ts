export function firstParam(value: string | string[] | undefined): string | undefined {
  const picked = Array.isArray(value) ? value[0] : value;
  const trimmed = picked?.trim();
  return trimmed ? trimmed : undefined;
}
