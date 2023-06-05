export default function dateToCBCStyle(string: string, abrev: boolean): string {
    string = string
        .replace("AM", "a.m.")
        .replace("PM", "p.m.")
        .replace(":00", "")
        .trim()

    if (abrev) {
        return (
            string
                .replace("January", "Jan.")
                .replace("February", "Feb.")
                // same for March, April, May, June, July
                .replace("August", "Aug.")
                .replace("September", "Sep.")
                .replace("October", "Oct.")
                .replace("November", "Nov.")
                .replace("December", "Dec.")
        )
    } else {
        return string
    }
}
