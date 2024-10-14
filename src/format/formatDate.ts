import dateToCBCStyle from "./helpers/dateToCBCStyle.ts";
import dateToRCStyle from "./helpers/dateToRCStyle.ts";
import { format as formatFns, toZonedTime } from "npm:date-fns-tz@3";
import isValid from "./helpers/isValidDate.ts";

/**
 * Format a Date as a string with a specific format and a specific style. To format as UTC Date, set the utc option to true.
 *
 * @example
 * Basic usage
 * ```js
 * const date = new Date("2023-01-01T01:35:00.000Z")
 * const string = formatDate(date, "Month DD, YYYY, at HH:MM period", { utc: true, abbreviations: true })
 * // returns "Jan. 1, 2023, at 1:35 p.m."
 * ```
 *
 * Options can be passed as the last parameter. Pass {style: "rc"} to parse dates in French.
 *
 * @param date - The date to format.
 * @param format - The format string.
 * @param options - Additional options for formatting.
 *
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
  } = {
    style: "cbc",
    abbreviations: false,
    noZeroPadding: false,
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
    );
  } else if (mergedOptions.style === "rc") {
    dateFormatted = dateToRCStyle(
      dateFormatted,
      mergedOptions.abbreviations,
    );
  }

  return dateFormatted;
}
