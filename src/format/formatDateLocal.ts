import { timeFormat } from "d3"
import dateToCBCStyle from "./helpers/dateToCBCStyle.js"
import dateToRCStyle from "./helpers/dateToRCStyle.js"

/**
 * Format a local Date as a string with a specific format and a specific style.
 *
 *```js
 * const date = new Date("2023-01-01T01:35:00.000")
 * const string = formatDate(date, "Month Day, YYYY, at HH:MM period", { abbreviations: true })
 * // returns "Jan. 1, 2023, at 3:35 p.m."
 * ```
 * Options can be passed as the last parameter. Pass {style: "rc"} to parse dates in French.
 *
 * @category Formatting
 */

export default function formatDateLocal(
    date: Date | number,
    format:
        | "YYYY-MM-DD"
        | "DayName, Month Day"
        | "Month Day"
        | "Month Day, YYYY"
        | "Month Day, YYYY, at HH:MM period"
        | "DayName"
        | "Day"
        | "Month"
        | "YYYY"
        | "MM"
        | "DD",
    options: {
        style?: "cbc" | "rc"
        abbreviations?: boolean
    } = {}
): string {
    if (typeof date === "number") {
        date = new Date(date)
    }

    const mergedOptions: {
        style: "cbc" | "rc"
        abbreviations: boolean
    } = {
        style: "cbc",
        abbreviations: false,
        ...options,
    }

    let dateFormatted = ""

    if (format === "YYYY-MM-DD") {
        const representation = "%Y-%m-%d"
        dateFormatted = dateToString(date, representation)
    } else if (format === "DayName, Month Day") {
        const representations = {
            cbc: "%A, %B %_d",
            rc: "%A %_d %B",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "Month Day") {
        const representations = {
            cbc: "%B %_d",
            rc: "%_d %B",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "Month Day, YYYY") {
        const representations = {
            cbc: "%B %_d, %Y",
            rc: "%_d %B %Y",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "Month Day, YYYY, at HH:MM period") {
        const representations = {
            cbc: "%B %_d, %Y, at %_I:%M %p",
            rc: "%_d %B %Y à %_H h %M",
        }
        dateFormatted = dateToString(date, representations[mergedOptions.style])
    } else if (format === "DayName") {
        dateFormatted = dateToString(date, "%A")
    } else if (format === "Day") {
        dateFormatted = dateToString(date, "%_d")
    } else if (format === "Month") {
        dateFormatted = dateToString(date, "%B")
    } else if (format === "YYYY") {
        dateFormatted = dateToString(date, "%Y")
    } else if (format === "MM") {
        dateFormatted = dateToString(date, "%m")
    } else if (format === "DD") {
        dateFormatted = dateToString(date, "%d")
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

    return dateFormatted.replace(/ {2}/g, " ")
}

function dateToString(date: Date, representation: string) {
    const f = timeFormat(representation)
    return f(date)
}
