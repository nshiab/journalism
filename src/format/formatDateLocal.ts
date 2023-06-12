import { timeFormat } from "d3-time-format"
import dateToCBCStyle from "./helpers/dateToCBCStyle.js"
import dateToRCStyle from "./helpers/dateToRCStyle.js"

export default function formatDateLocal(
    date: Date | number,
    format:
        | "YYYY-MM-DD"
        | "Month Day, YYYY"
        | "Month Day, YYYY, at HH:MM period",
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
