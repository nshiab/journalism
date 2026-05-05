/**
 * Formats a duration into a human-readable string, breaking it down into years, months, days, hours, minutes, seconds, and milliseconds. This function is useful for displaying elapsed time in a user-friendly format, such as for performance logging, task completion times, or general time tracking.
 *
 * The function can calculate the duration from a given start time to the current time, or between a specified start and end time. It provides options for logging the output directly to the console and adding custom prefixes or suffixes to the formatted string. Note that for simplicity, months are approximated as 30 days and years as 365 days.
 *
 * @param start - The starting point of the duration. This can be a `Date` object or a Unix timestamp (number of milliseconds since epoch).
 * @param options - Optional settings to customize the duration formatting and output.
 *   @param options.log - If `true`, the formatted duration string will be logged to the console. Defaults to `false`.
 *   @param options.end - The ending point of the duration. This can be a `Date` object or a Unix timestamp. If omitted, the current time (`Date.now()`) will be used as the end point.
 *   @param options.prefix - A string to prepend to the formatted duration string (e.g., "Elapsed time: ").
 *   @param options.suffix - A string to append to the formatted duration string (e.g., " (Task completed)").
 * @returns A human-readable string representing the duration.
 *
 * @example
 * ```ts
 * // A starting Date somewhere in your code.
 * const startDate = new Date(); // or Date.now()
 *
 * // When you want to know the elapsed duration, pass the start date.
 * const duration = prettyDuration(startDate);
 * console.log(duration); // Returns something like "22 days, 6 h, 3 min, 15 sec, 3 ms"
 * ```
 * @example
 * ```ts
 * // If you want to console.log it directly, set the `log` option to `true`.
 * // This will print the duration to the console and also return the string.
 * const startDateForLog = new Date();
 * // ... some operations ...
 * prettyDuration(startDateForLog, { log: true });
 * ```
 * @example
 * ```ts
 * // You can also use a prefix and/or suffix for the output string.
 * const startDateWithPrefixSuffix = new Date();
 * // ... some operations ...
 * prettyDuration(startDateWithPrefixSuffix, { log: true, prefix: "Elapsed time: ", suffix: " (Main function)" });
 * // Returns and logs something like "Total duration: 3 min, 15 sec, 3 ms (Main function)"
 * ```
 * @example
 * ```ts
 * // If you want to format the duration between two specific dates, use the `end` option.
 * const start = new Date("2024-01-01T17:00:00");
 * const end = new Date("2024-01-23T23:03:15");
 * const specificDuration = prettyDuration(start, { end });
 * console.log(specificDuration); // Returns "22 days, 6 h, 3 min, 15 sec, 0 ms"
 * ```
 * @category Formatting
 */
export default function prettyDuration(start: Date | number, options?: {
    log?: boolean;
    end?: Date | number;
    prefix?: string;
    suffix?: string;
}): string;
//# sourceMappingURL=prettyDuration.d.ts.map