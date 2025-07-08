import prettyDuration from "../format/prettyDuration.ts";

/**
 * Pauses the execution of an asynchronous function for a specified duration. This utility is useful for introducing delays in workflows, throttling requests, or simulating real-world latencies.
 *
 * It can also adjust the pause duration by subtracting any time already elapsed since a given start point, ensuring more precise delays. This is particularly useful for respecting API rate limits, ensuring that the total time spent between requests meets a minimum threshold without over-waiting if the preceding operations took some time. If the elapsed time is greater than or equal to `ms`, the function will resolve immediately without pausing.
 *
 * @param ms - The number of milliseconds to pause execution for. This is the target duration of the sleep.
 * @param options - Optional parameters to customize the sleep behavior.
 *   @param options.start - A `Date` object representing a starting timestamp. If provided, the function will subtract the time elapsed since this `start` time from the `ms` duration. This is particularly useful for respecting API rate limits.
 *   @param options.log - If `true`, the function will log messages to the console indicating the sleep duration or if no sleep was needed. Defaults to `false`.
 * @returns A Promise that resolves after the specified (or adjusted) duration has passed.
 *
 * @example
 * ```ts
 * // Pause execution for 1 second.
 * await sleep(1000);
 * console.log("1 second has passed.");
 * ```
 *
 * @example
 * ```ts
 * // Pause execution for 1 second, but subtract any time already elapsed since `start`.
 * const start = new Date();
 * // Simulate a task that takes some time (e.g., 200ms)
 * await new Promise(resolve => setTimeout(resolve, 200));
 * await sleep(1000, { start }); // This will pause for approximately 800ms
 * console.log("Execution resumed after approximately 1 second from start.");
 * ```
 * @example
 * ```ts
 * // If the elapsed time already exceeds the requested sleep duration, no actual sleep occurs.
 * const startTime = new Date();
 * // Simulate a long-running task (e.g., 150ms)
 * await new Promise(resolve => setTimeout(resolve, 150));
 * await sleep(100, { start: startTime, log: true });
 * // Expected console output: "No need to sleep, already took 150 ms." (or similar)
 * ```
 * @example
 * ```ts
 * // Pause execution for 2 seconds and log the sleep duration.
 * await sleep(2000, { log: true });
 * // Expected console output: "Sleeping for 2 sec, 0 ms..." (or similar)
 * ```
 * @category Other
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
