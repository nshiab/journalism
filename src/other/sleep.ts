import prettyDuration from "../format/prettyDuration.ts";

/**
 * Pauses execution for a specified duration.
 *
 * @example
 * Basic usage
 * ```ts
 * await sleep(1000); // Pauses for 1 second
 * ```
 *
 * @example
 * With options
 * ```ts
 * const start = new Date();
 *
 * // Perform some computation that takes time...
 *
 * await sleep(1000, { start }); // Pauses for 1 second minus the time taken for the computation
 * ```
 *
 * @param ms - The number of milliseconds to pause.
 * @param options - Optional parameters.
 *   @param options.start - If you want to subtract the time taken to run something else, you can pass the start time here.
 *   @param options.log - If true, it will log additional information.
 */
export default function sleep(
  ms: number,
  options: { start?: Date; log?: boolean } = {},
): Promise<void> {
  return new Promise((resolve) => {
    if (options.start) {
      const end = new Date();
      const duration = end.getTime() - options.start.getTime();
      const remaining = ms - duration;
      if (remaining > 0) {
        if (options.log) {
          console.log(
            `\nSleeping for ${prettyDuration(0, { end: remaining })}...`,
          );
        }
        return setTimeout(resolve, remaining);
      } else {
        if (options.log) {
          console.log(
            `\nNo need to sleep, already took ${
              prettyDuration(0, { end: duration })
            }.`,
          );
        }
        return resolve();
      }
    }
    return setTimeout(resolve, ms);
  });
}
