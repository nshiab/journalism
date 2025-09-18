import dateToCBCStyle from "./helpers/dateToCBCStyle.ts";
import dateToRCStyle from "./helpers/dateToRCStyle.ts";
import { format as formatFns, toZonedTime } from "date-fns-tz";
import isValid from "./helpers/isValidDate.ts";

/**
 * Formats a `Date` object into a human-readable string based on a specified format, style, and time zone. This function provides flexible date and time formatting options, including support for UTC, different linguistic styles (English/French), and various display preferences like abbreviations and zero-padding.
 *
 * @param date The `Date` object to be formatted.
 * @param format A predefined string literal specifying the desired output format. Examples include "YYYY-MM-DD", "Month DD, YYYY", "HH:MM period", etc.
 * @param options Optional settings to customize the formatting behavior.
 * @param options.utc If `true`, the date will be formatted in UTC (Coordinated Universal Time). Defaults to `false`.
 * @param options.style The linguistic style for formatting. Use "cbc" for English (default) or "rc" for French. This affects month and day names, and time representations.
 * @param options.abbreviations If `true`, month and day names will be abbreviated (e.g., "Jan.", "Mon."). Defaults to `false`.
 * @param options.noZeroPadding If `true`, single-digit days and months will not be padded with a leading zero (e.g., "1" instead of "01"). Defaults to `false`.
 * @param options.threeLetterMonth If `true`, month abbreviations will be three letters (e.g., "Jan", "Feb"). Defaults to `false`.
 * @param options.timeZone Specifies a time zone for formatting. Accepts standard IANA time zone names (e.g., "America/New_York") or specific Canadian time zones. If `utc` is `true`, this option is ignored.
 *
 * @returns The formatted date string.
 *
 * @example
 * ```ts
 * // Basic usage: Format a date in default English style.
 * const date = new Date("2023-01-01T01:35:00.000Z");
 * const formatted = formatDate(date, "Month DD, YYYY, at HH:MM period", { utc: true });
 * console.log(formatted); // "January 1, 2023, at 1:35 a.m."
 * ```
 * @example
 * ```ts
 * // Formatting in French style with abbreviations.
 * const frenchFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
 *   style: "rc",
 *   abbreviations: true,
 *   utc: true
 * });
 * console.log(frenchFormatted); // "1 janv. 2023 à 1 h 35"
 * ```
 * @example
 * ```ts
 * // Formatting with a specific time zone.
 * const estFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
 *   timeZone: "Canada/Eastern"
 * });
 * console.log(estFormatted); // "January 1, 2023, at 8:35 p.m. EST" (assuming date is UTC)
 * ```
 * @example
 * ```ts
 * // Custom format: YYYY-MM-DD
 * const isoFormatted = formatDate(new Date("2024-03-15T10:00:00Z"), "YYYY-MM-DD");
 * console.log(isoFormatted); // "2024-03-15"
 * ```
 * @category Formatting
 */

export default function formatDate(
  date: Date,
  format:
    | "YYYY-MM-DD"
    | "YYYY-MM-DD HH:MM:SS TZ"
    | "DayOfWeek, Month Day"
    | "Month DD"
    | "Month DD, HH:MM period"
    | "Month DD, HH:MM period TZ"
    | "DayOfWeek, HH:MM period"
    | "DayOfWeek, HH:MM period TZ"
    | "Month DD, YYYY"
    | "Month DD, YYYY, at HH:MM period"
    | "Month DD, YYYY, at HH:MM period TZ"
    | "DayOfWeek"
    | "Month"
    | "YYYY"
    | "MM"
    | "DD"
    | "HH:MM period"
    | "HH:MM period TZ",
  options: {
    utc?: boolean;
    style?: "cbc" | "rc";
    abbreviations?: boolean;
    noZeroPadding?: boolean;
    threeLetterMonth?: boolean;
    timeZone?:
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon";
  } = {},
): string {
  if (!isValid(date)) {
    throw new Error(`${date} is not a valid Date.`);
  }

  let timeZone;
  if (options.utc === true) {
    timeZone = "UTC";
  }
  if (typeof options.timeZone === "string") {
    timeZone = options.timeZone;
  }

  if (typeof timeZone === "string") {
    date = toZonedTime(date, timeZone);
  }

  const mergedOptions: {
    style: "cbc" | "rc";
    abbreviations: boolean;
    noZeroPadding: boolean;
    threeLetterMonth: boolean;
  } = {
    style: "cbc",
    abbreviations: false,
    noZeroPadding: false,
    threeLetterMonth: false,
    ...options,
  };

  let dateFormatted = "";

  if (format === "YYYY-MM-DD") {
    dateFormatted = formatFns(date, "yyyy-MM-dd");
  } else if (format === "YYYY-MM-DD HH:MM:SS TZ") {
    dateFormatted = formatFns(date, "yyyy-MM-dd HH:mm:ss zzz", {
      timeZone,
    });
  } else if (format === "DayOfWeek, Month Day") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "EEEE, MMMM d");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "EEEE d MMMM");
    }
  } else if (format === "Month DD") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM");
    }
  } else if (format === "Month DD, YYYY") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d, yyyy");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM yyyy");
    }
  } else if (format === "Month DD, YYYY, at HH:MM period") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d, yyyy, 'at' h:mm aa");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM yyyy à H 'h' mm");
    }
  } else if (format === "Month DD, YYYY, at HH:MM period TZ") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d, yyyy, 'at' h:mm aa zzz", {
        timeZone,
      });
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM yyyy à H 'h' mm zzz", {
        timeZone,
      });
    }
  } else if (format === "DayOfWeek") {
    dateFormatted = formatFns(date, "EEEE");
  } else if (format === "Month") {
    dateFormatted = formatFns(date, "MMMM");
  } else if (format === "YYYY") {
    dateFormatted = formatFns(date, "yyyy");
  } else if (format === "MM") {
    if (options.noZeroPadding) {
      dateFormatted = formatFns(date, "M");
    } else {
      dateFormatted = formatFns(date, "MM");
    }
  } else if (format === "DD") {
    if (options.noZeroPadding) {
      dateFormatted = formatFns(date, "d");
    } else {
      dateFormatted = formatFns(date, "dd");
    }
  } else if (format === "Month DD, HH:MM period") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d, h:mm aa");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM, H 'h' mm");
    }
  } else if (format === "Month DD, HH:MM period TZ") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "MMMM d, h:mm aa zzz");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "d MMMM, H 'h' mm zzz");
    }
  } else if (format === "DayOfWeek, HH:MM period") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "EEEE, h:mm aa");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "EEEE, H 'h' mm");
    }
  } else if (format === "DayOfWeek, HH:MM period TZ") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "EEEE, h:mm aa zzz");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "EEEE, H 'h' mm zzz");
    }
  } else if (format === "HH:MM period") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "h:mm aa");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "H 'h' mm");
    }
  } else if (format === "HH:MM period TZ") {
    if (mergedOptions.style === "cbc") {
      dateFormatted = formatFns(date, "h:mm aa zzz");
    } else if (mergedOptions.style === "rc") {
      dateFormatted = formatFns(date, "H 'h' mm zzz");
    }
  } else {
    throw new Error("Unknown format");
  }

  if (mergedOptions.style === "cbc") {
    dateFormatted = dateToCBCStyle(
      dateFormatted,
      mergedOptions.abbreviations,
      mergedOptions.threeLetterMonth,
    );
  } else if (mergedOptions.style === "rc") {
    dateFormatted = dateToRCStyle(
      dateFormatted,
      mergedOptions.abbreviations,
      mergedOptions.threeLetterMonth,
    );
  }

  return dateFormatted;
}
