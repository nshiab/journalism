export default function dateToCBCStyle(string: string, abrev: boolean): string {
    string = string
        .replace("AM", "a.m.")
        .replace("PM", "p.m.")
        .replace(":00", "")
        .replace("NDT", "NT")
        .replace("NST", "NT")
        .replace("ADT", "AT")
        .replace("AST", "AT")
        .replace("CDT", "CT")
        .replace("CST", "CT")
        .replace("MDT", "MT")
        .replace("MST", "MT")
        .replace("PDT", "PT")
        .replace("PST", "PT")
        .replace("EDT", "ET")
        .replace("EST", "ET")
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
                .replace("Monday", "Mon.")
                .replace("Tuesday", "Tues.")
                .replace("Wednesday", "Wed.")
                .replace("Thursday", "Thu.")
                .replace("Friday", "Fri.")
                .replace("Saturday", "Sat.")
                .replace("Sunday", "Sun.")
        )
    } else {
        return string
    }
}
