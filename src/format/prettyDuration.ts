export default function prettyDuration(start: Date, end: Date) {
    const differenceInSeconds = Math.round(
        (end.getTime() - start.getTime()) / 1000
    )

    if (differenceInSeconds < 60) {
        // Less than a minute
        return `${differenceInSeconds} seconds`
    } else if (differenceInSeconds < 3600) {
        // Less than an hour
        const minutes = Math.floor(differenceInSeconds / 60)
        const seconds = differenceInSeconds % 60
        return `${minutes} minutes, ${seconds} seconds`
    } else if (differenceInSeconds < 86400) {
        // Less than a day
        const hours = Math.floor(differenceInSeconds / 3600)
        const minutes = Math.floor((differenceInSeconds % 3600) / 60)
        const seconds = differenceInSeconds % 60
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
    } else {
        // At least one day
        const days = Math.floor(differenceInSeconds / 86400)
        const hours = Math.floor((differenceInSeconds % 86400) / 3600)
        const minutes = Math.floor((differenceInSeconds % 3600) / 60)
        const seconds = differenceInSeconds % 60
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    }
}
