export default function noZeroPadding(dateFormatted: string) {
    if (dateFormatted.at(0) === "0") {
        return (dateFormatted = dateFormatted.slice(1))
    }
    return dateFormatted
}
