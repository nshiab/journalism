"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatDate;
const dateToCBCStyle_js_1 = __importDefault(require("./helpers/dateToCBCStyle.js"));
const dateToRCStyle_js_1 = __importDefault(require("./helpers/dateToRCStyle.js"));
const date_fns_tz_1 = require("date-fns-tz");
const isValidDate_js_1 = __importDefault(require("./helpers/isValidDate.js"));
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
function formatDate(date, format, options = {}) {
    if (!(0, isValidDate_js_1.default)(date)) {
        throw new Error(`${date} is not a valid Date.`);
    }
    let timeZone;
    if (options.utc === true) {
        timeZone = "UTC";
    }
    else if (typeof options.timeZone === "string") {
        timeZone = options.timeZone;
    }
    if (typeof timeZone === "string") {
        date = (0, date_fns_tz_1.toZonedTime)(date, timeZone);
    }
    const mergedOptions = {
        style: "cbc",
        abbreviations: false,
        noZeroPadding: false,
        threeLetterMonth: false,
        ...options,
    };
    let dateFormatted = "";
    if (format === "YYYY-MM-DD") {
        dateFormatted = (0, date_fns_tz_1.format)(date, "yyyy-MM-dd", { timeZone });
    }
    else if (format === "YYYY-MM-DD HH:MM:SS TZ") {
        dateFormatted = (0, date_fns_tz_1.format)(date, "yyyy-MM-dd HH:mm:ss zzz", {
            timeZone,
        });
    }
    else if (format === "DayOfWeek, Month Day") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE, MMMM d", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE d MMMM", { timeZone });
        }
    }
    else if (format === "Month DD") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM", { timeZone });
        }
    }
    else if (format === "Month DD, YYYY") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d, yyyy", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM yyyy", { timeZone });
        }
    }
    else if (format === "Month DD, YYYY, at HH:MM period") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d, yyyy, 'at' h:mm aa", {
                timeZone,
            });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM yyyy à H 'h' mm", {
                timeZone,
            });
        }
    }
    else if (format === "Month DD, YYYY, at HH:MM period TZ") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d, yyyy, 'at' h:mm aa zzz", {
                timeZone,
            });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM yyyy à H 'h' mm zzz", {
                timeZone,
            });
        }
    }
    else if (format === "DayOfWeek") {
        dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE", { timeZone });
    }
    else if (format === "Month") {
        dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM", { timeZone });
    }
    else if (format === "YYYY") {
        dateFormatted = (0, date_fns_tz_1.format)(date, "yyyy", { timeZone });
    }
    else if (format === "MM") {
        if (options.noZeroPadding) {
            dateFormatted = (0, date_fns_tz_1.format)(date, "M", { timeZone });
        }
        else {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MM", { timeZone });
        }
    }
    else if (format === "DD") {
        if (options.noZeroPadding) {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d", { timeZone });
        }
        else {
            dateFormatted = (0, date_fns_tz_1.format)(date, "dd", { timeZone });
        }
    }
    else if (format === "Month DD, HH:MM period") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d, h:mm aa", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM, H 'h' mm", { timeZone });
        }
    }
    else if (format === "Month DD, HH:MM period TZ") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "MMMM d, h:mm aa zzz", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "d MMMM, H 'h' mm zzz", { timeZone });
        }
    }
    else if (format === "DayOfWeek, HH:MM period") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE, h:mm aa", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE, H 'h' mm", { timeZone });
        }
    }
    else if (format === "DayOfWeek, HH:MM period TZ") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE, h:mm aa zzz", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "EEEE, H 'h' mm zzz", { timeZone });
        }
    }
    else if (format === "HH:MM period") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm", { timeZone });
        }
    }
    else if (format === "HH:MM period TZ") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa zzz", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm zzz", { timeZone });
        }
    }
    else if (format === "HH:MM period TZ on Month DD, YYYY") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa zzz 'on' MMMM d, yyyy", {
                timeZone,
            });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm zzz 'le' d MMMM yyyy", {
                timeZone,
            });
        }
    }
    else if (format === "HH:MM period on Month DD, YYYY") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa 'on' MMMM d, yyyy", {
                timeZone,
            });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm 'le' d MMMM yyyy", {
                timeZone,
            });
        }
    }
    else if (format === "HH:MM period TZ on Month DD") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa zzz 'on' MMMM d", {
                timeZone,
            });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm zzz 'le' d MMMM", {
                timeZone,
            });
        }
    }
    else if (format === "HH:MM period on Month DD") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "h:mm aa 'on' MMMM d", { timeZone });
        }
        else if (mergedOptions.style === "rc") {
            dateFormatted = (0, date_fns_tz_1.format)(date, "H 'h' mm 'le' d MMMM", { timeZone });
        }
    }
    else {
        throw new Error("Unknown format");
    }
    if (mergedOptions.style === "cbc") {
        dateFormatted = (0, dateToCBCStyle_js_1.default)(dateFormatted, mergedOptions.abbreviations, mergedOptions.threeLetterMonth);
    }
    else if (mergedOptions.style === "rc") {
        dateFormatted = (0, dateToRCStyle_js_1.default)(dateFormatted, mergedOptions.abbreviations, mergedOptions.threeLetterMonth);
    }
    return dateFormatted;
}
