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
export default function prettyDuration(
  start: Date | number,
  options: {
    log?: boolean;
    end?: Date | number;
    prefix?: string;
    suffix?: string;
  } = {},
): string {
  if (start instanceof Date) {
    start = start.getTime();
  }

  let end;
  if (options.end instanceof Date) {
    end = options.end.getTime();
  } else if (typeof options.end === "number") {
    end = options.end;
  } else {
    end = Date.now();
  }

  const differenceInMs = end - start;

  let prettyDuration = "";

  if (differenceInMs < 1000) {
    // Less than a second
    prettyDuration = `${differenceInMs} ms`;
  } else if (differenceInMs < 60_000) {
    // Less than a minute
    const sec = Math.floor(differenceInMs / 1000);
    const ms = differenceInMs % 1000;
    prettyDuration = `${sec} sec, ${ms} ms`;
  } else if (differenceInMs < 3_600_000) {
    // Less than an hour
    const min = Math.floor(differenceInMs / 60_000);
    const remainingMs = differenceInMs % 60_000;
    const sec = Math.floor(remainingMs / 1000);
    const ms = remainingMs % 1000;
    prettyDuration = `${min} min, ${sec} sec, ${ms} ms`;
  } else if (differenceInMs < 86_400_000) {
    // Less than a day
    const hours = Math.floor(differenceInMs / 3_600_000);
    const remainingMsAfterHours = differenceInMs % 3_600_000;
    const min = Math.floor(remainingMsAfterHours / 60_000);
    const remainingMsAfterMinutes = remainingMsAfterHours % 60_000;
    const sec = Math.floor(remainingMsAfterMinutes / 1000);
    const ms = remainingMsAfterMinutes % 1000;
    prettyDuration = `${hours} h, ${min} min, ${sec} sec, ${ms} ms`;
  } else if (differenceInMs < 2_592_000_000) {
    // Less than a month
    const days = Math.floor(differenceInMs / 86_400_000);
    const remainingMsAfterDays = differenceInMs % 86_400_000;
    const hours = Math.floor(remainingMsAfterDays / 3_600_000);
    const remainingMsAfterHours = remainingMsAfterDays % 3_600_000;
    const min = Math.floor(remainingMsAfterHours / 60_000);
    const remainingMsAfterMin = remainingMsAfterHours % 60_000;
    const sec = Math.floor(remainingMsAfterMin / 1000);
    const ms = remainingMsAfterMin % 1000;
    prettyDuration = `${days} ${
      days <= 1 ? "day" : "days"
    }, ${hours} h, ${min} min, ${sec} sec, ${ms} ms`;
  } else if (differenceInMs < 31_536_000_000) {
    // Less than a year
    const months = Math.floor(differenceInMs / 2_592_000_000);
    const remainingMsAfterMonths = differenceInMs % 2_592_000_000;
    const days = Math.floor(remainingMsAfterMonths / 86_400_000);
    const remainingMsAfterDays = differenceInMs % 86_400_000;
    const hours = Math.floor(remainingMsAfterDays / 3_600_000);
    const remainingMsAfterHours = remainingMsAfterDays % 3_600_000;
    const min = Math.floor(remainingMsAfterHours / 60_000);
    const remainingMsAfterMin = remainingMsAfterHours % 60_000;
    const sec = Math.floor(remainingMsAfterMin / 1000);
    const ms = remainingMsAfterMin % 1000;
    prettyDuration = `${months} ${months <= 1 ? "month" : "months"}, ${days} ${
      days <= 1 ? "day" : "days"
    }, ${hours} h, ${min} min, ${sec} sec, ${ms} ms`;
  } else {
    // More than a year
    const years = Math.floor(differenceInMs / 31_536_000_000);
    const remainingMsAfterYears = differenceInMs % 31_536_000_000;
    const months = Math.floor(remainingMsAfterYears / 2_592_000_000);
    const remainingMsAfterMonths = differenceInMs % 2_592_000_000;
    const days = Math.floor(remainingMsAfterMonths / 86_400_000);
    const remainingMsAfterDays = differenceInMs % 86_400_000;
    const hours = Math.floor(remainingMsAfterDays / 3_600_000);
    const remainingMsAfterHours = remainingMsAfterDays % 3_600_000;
    const min = Math.floor(remainingMsAfterHours / 60_000);
    const remainingMsAfterMin = remainingMsAfterHours % 60_000;
    const sec = Math.floor(remainingMsAfterMin / 1000);
    const ms = remainingMsAfterMin % 1000;
    prettyDuration = `${years} ${years <= 1 ? "year" : "years"}, ${months} ${
      months <= 1 ? "month" : "months"
    }, ${days} ${
      days <= 1 ? "day" : "days"
    }, ${hours} h, ${min} min, ${sec} sec, ${ms} ms`;
  }

  if (typeof options.prefix === "string") {
    prettyDuration = `${options.prefix}${prettyDuration}`;
  }
  if (typeof options.suffix === "string") {
    prettyDuration = `${prettyDuration}${options.suffix}`;
  }

  if (options.log === true) {
    console.log(prettyDuration);
  }

  return prettyDuration;
}
