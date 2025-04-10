/**
 * Pauses for a specified duration.
 *
 * @example
 * Basic usage
 * ```ts
 * await sleep(1000); // Pauses for 1 second
 * ```
 *
 * @param ms - The number of milliseconds to sleep.
 */
export default function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
