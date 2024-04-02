import { utcFormat } from "d3-time-format"
import dateToCBCStyle from "./helpers/dateToCBCStyle.js"
import dateToRCStyle from "./helpers/dateToRCStyle.js"
import noZeroPadding from "./helpers/noZeroPadding.js"
import { utcToZonedTime, format as formatFns } from "date-fns-tz"

/**
 * Format a UTC Date as a string with a specific format and a specific style.
 *
 *```js
 * const date = new Date("2023-01-01T01:35:00.000Z")
 * const string = formatDate(date, "Month Day, YYYY, at HH:MM period", { abbreviations: true })
 * // returns "Jan. 1, 2023, at 3:35 p.m."
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
    } = {}
): string {
    if (typeof date === "number") {
        date = new Date(date)
    }
    if (typeof options.timeZone === "string") {
        date = utcToZonedTime(date, options.timeZone)
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
        const representation = "%Y-%m-%d"
        dateFormatted = dateToString(date, representation)
    } else if (format === "DayOfWeek, Month Day") {
        const representations = {
            cbc: "%A, %B %_d",
            rc: "%A %_d %B",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "Month DD") {
        const representations = {
            cbc: "%B %_d",
            rc: "%_d %B",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "Month DD, YYYY") {
        const representations = {
            cbc: "%B %_d, %Y",
            rc: "%_d %B %Y",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format.includes("Month DD, YYYY, at HH:MM period")) {
        const representations = {
            cbc: "%B %_d, %Y, at %_I:%M %p",
            rc: "%_d %B %Y à %_H h %M",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "DayOfWeek") {
        dateFormatted = dateToString(date, "%A")
    } else if (format === "Month") {
        dateFormatted = dateToString(date, "%B")
    } else if (format === "YYYY") {
        dateFormatted = dateToString(date, "%Y")
    } else if (format === "MM") {
        dateFormatted = dateToString(date, "%m")
        if (options.noZeroPadding) {
            dateFormatted = noZeroPadding(dateFormatted)
        }
    } else if (format === "DD") {
        dateFormatted = dateToString(date, "%d").trim()
        if (options.noZeroPadding) {
            dateFormatted = noZeroPadding(dateFormatted)
        }
    } else {
        throw new Error("Unknown format")
    }

    if (format.includes("TZ") && typeof options.timeZone === "string") {
        dateFormatted = `${dateFormatted} ${formatFns(date, "zzz", { timeZone: options.timeZone })}`
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

    return dateFormatted.replace(/ {2}/g, " ")
}

function dateToString(date: Date, representation: string) {
    const f = utcFormat(representation)
    return f(date)
}
