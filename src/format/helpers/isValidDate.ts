export default function isValid(date: unknown) {
  return date instanceof Date && !isNaN(date as unknown as number);
}
