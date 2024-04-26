/**
 * Returns the duration as a string in terms of milliseconds, seconds, minutes, hours, and days.
 *
 * ```js
 * // A starting Date somewhere in your code
 * const startDate = new Date() // or Date.now()
 *
 * // When you want to know the elapsed duration, pass the start date
 * const duration = prettyDuration(startDate)
 * // Returns something like "22 days, 6 h, 3 min, 15 sec, 3 ms"
 *
 * // If you want to console.log it, set the option log to true
 * prettyDuration(startDate, {log: true})
 *
 * // You can also use a prefix and/or suffix
 * prettyDuration(startDate, {log: true, prefix: "Total duration: ", suffix: " (Main function)"})
 * // Returns and logs something like "Total duration: 3 min, 15 sec, 3 ms (Main function)"
 *
 * // If you want to format the duration between two specific dates, use the end option.
 * prettyDuration(new Date("2024-01-01T17:00:00"), { end: new Date("2024-01-23T23:03:15") })
 * // Returns "22 days, 6 h, 3 min, 15 sec, 0 ms"
 * ```
 *
 * @category Formatting
 */
export default function prettyDuration(
    start: Date | number,
    options: {
        log?: boolean
        end?: Date | number
        prefix?: string
        suffix?: string
    } = {}
): string {
    if (start instanceof Date) {
        start = start.getTime()
    }

    let end
    if (options.end instanceof Date) {
        end = options.end.getTime()
    } else if (typeof options.end === "number") {
        end = options.end
    } else {
        end = Date.now()
    }

    const differenceInMs = end - start

    let prettyDuration = ""

    if (differenceInMs < 1000) {
        // Less than a second
        prettyDuration = `${differenceInMs} ms`
    } else if (differenceInMs < 60_000) {
        // Less than a minute
        const sec = Math.floor(differenceInMs / 1000)
        const ms = differenceInMs % 1000
        prettyDuration = `${sec} sec, ${ms} ms`
    } else if (differenceInMs < 3_600_000) {
        // Less than an hour
        const min = Math.floor(differenceInMs / 60_000)
        const remainingMs = differenceInMs % 60_000
        const sec = Math.floor(remainingMs / 1000)
        const ms = remainingMs % 1000
        prettyDuration = `${min} min, ${sec} sec, ${ms} ms`
    } else if (differenceInMs < 86_400_000) {
        // Less than a day
        const hours = Math.floor(differenceInMs / 3_600_000)
        const remainingMsAfterHours = differenceInMs % 3_600_000
        const min = Math.floor(remainingMsAfterHours / 60_000)
        const remainingMsAfterMinutes = remainingMsAfterHours % 60_000
        const sec = Math.floor(remainingMsAfterMinutes / 1000)
        const ms = remainingMsAfterMinutes % 1000
        prettyDuration = `${hours} h, ${min} min, ${sec} sec, ${ms} ms`
    } else {
        // At least one day
        const days = Math.floor(differenceInMs / 86_400_000)
        const remainingMsAfterDays = differenceInMs % 86_400_000
        const hours = Math.floor(remainingMsAfterDays / 3_600_000)
        const remainingMsAfterHours = remainingMsAfterDays % 3_600_000
        const min = Math.floor(remainingMsAfterHours / 60_000)
        const remainingMsAfterMin = remainingMsAfterHours % 60_000
        const sec = Math.floor(remainingMsAfterMin / 1000)
        const ms = remainingMsAfterMin % 1000
        prettyDuration = `${days} days, ${hours} h, ${min} min, ${sec} sec, ${ms} ms`
    }

    if (typeof options.prefix === "string") {
        prettyDuration = `${options.prefix}${prettyDuration}`
    }
    if (typeof options.suffix === "string") {
        prettyDuration = `${prettyDuration}${options.suffix}`
    }

    if (options.log === true) {
        console.log(prettyDuration)
    }

    return prettyDuration
}
