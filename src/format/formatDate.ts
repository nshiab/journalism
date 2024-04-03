import dateToCBCStyle from "./helpers/dateToCBCStyle.js"
import dateToRCStyle from "./helpers/dateToRCStyle.js"
import { utcToZonedTime, format as formatFns } from "date-fns-tz"

/**
 * Format a Date as a string with a specific format and a specific style. To format as UTC Date, set the utc option to true.
 *
 *```js
 * const date = new Date("2023-01-01T01:35:00.000Z")
 * const string = formatDate(date, "Month Day, YYYY, at HH:MM period", { utc: true, abbreviations: true })
 * // returns "Jan. 1, 2023, at 1:35 p.m."
 * ```
 * Options can be passed as the last parameter. Pass {style: "rc"} to parse dates in French.
 *
 * @category Formatting
 */

export default function formatDate(
    date: Date | number,
    format:
        | "YYYY-MM-DD"
        | "DayOfWeek, Month Day"
        | "Month DD"
        | "Month DD, YYYY"
        | "Month DD, YYYY, at HH:MM period"
        | "Month DD, YYYY, at HH:MM period TZ"
        | "DayOfWeek"
        | "Month"
        | "YYYY"
        | "MM"
        | "DD",
    options: {
        utc?: boolean
        style?: "cbc" | "rc"
        abbreviations?: boolean
        noZeroPadding?: boolean
        timeZone?:
            | "Canada/Atlantic"
            | "Canada/Central"
            | "Canada/Eastern"
            | "Canada/Mountain"
            | "Canada/Newfoundland"
            | "Canada/Pacific"
            | "Canada/Saskatchewan"
            | "Canada/Yukon"
            | string
    } = {}
): string {
    let timeZone
    if (options.utc === true) {
        timeZone = "UTC"
    }
    if (typeof options.timeZone === "string") {
        timeZone = options.timeZone
    }

    if (typeof timeZone === "string") {
        date = utcToZonedTime(date, timeZone)
    }

    const mergedOptions: {
        style: "cbc" | "rc"
        abbreviations: boolean
        noZeroPadding: boolean
    } = {
        style: "cbc",
        abbreviations: false,
        noZeroPadding: false,
        ...options,
    }

    let dateFormatted = ""

    if (format === "YYYY-MM-DD") {
        dateFormatted = formatFns(date, "yyyy-MM-dd")
    } else if (format === "DayOfWeek, Month Day") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = formatFns(date, "EEEE, MMMM d")
        } else if (mergedOptions.style === "rc") {
            dateFormatted = formatFns(date, "EEEE d MMMM")
        }
    } else if (format === "Month DD") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = formatFns(date, "MMMM d")
        } else if (mergedOptions.style === "rc") {
            dateFormatted = formatFns(date, "d MMMM")
        }
    } else if (format === "Month DD, YYYY") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = formatFns(date, "MMMM d, yyyy")
        } else if (mergedOptions.style === "rc") {
            dateFormatted = formatFns(date, "d MMMM yyyy")
        }
    } else if (format === "Month DD, YYYY, at HH:MM period") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = formatFns(date, "MMMM d, yyyy, 'at' h:mm aa")
        } else if (mergedOptions.style === "rc") {
            dateFormatted = formatFns(date, "d MMMM yyyy à H 'h' mm")
        }
    } else if (format === "Month DD, YYYY, at HH:MM period TZ") {
        if (mergedOptions.style === "cbc") {
            dateFormatted = formatFns(date, "MMMM d, yyyy, 'at' h:mm aa zzz", {
                timeZone,
            })
        } else if (mergedOptions.style === "rc") {
            dateFormatted = formatFns(date, "d MMMM yyyy à H 'h' mm zzz")
        }
    } else if (format === "DayOfWeek") {
        dateFormatted = formatFns(date, "EEEE")
    } else if (format === "Month") {
        dateFormatted = formatFns(date, "MMMM")
    } else if (format === "YYYY") {
        dateFormatted = formatFns(date, "yyyy")
    } else if (format === "MM") {
        if (options.noZeroPadding) {
            dateFormatted = formatFns(date, "M")
        } else {
            dateFormatted = formatFns(date, "MM")
        }
    } else if (format === "DD") {
        if (options.noZeroPadding) {
            dateFormatted = formatFns(date, "d")
        } else {
            dateFormatted = formatFns(date, "dd")
        }
    } else {
        throw new Error("Unknown format")
    }

    if (mergedOptions.style === "cbc") {
        dateFormatted = dateToCBCStyle(
            dateFormatted,
            mergedOptions.abbreviations
        )
    } else if (mergedOptions.style === "rc") {
        dateFormatted = dateToRCStyle(
            dateFormatted,
            mergedOptions.abbreviations
        )
    }

    return dateFormatted
}
