/**
 * Checks if a given value is a valid Date object.
 * @param date The value to check.
 * @returns True if the value is a valid Date object, false otherwise.
 */
export default function isValid(date: unknown) {
  return date instanceof Date && !isNaN(date as unknown as number);
}
