export default function dateToRCStyle(string: string, abrev: boolean): string {
    string = string.replace(" h 00", " h").trim()

    if (abrev) {
        return string
            .replace("January", "janv.")
            .replace("February", "fév.")
            .replace("March", "mars")
            .replace("April", "avr.")
            .replace("May", "mai")
            .replace("June", "juin")
            .replace("July", "juill.")
            .replace("August", "août")
            .replace("September", "sept.")
            .replace("October", "oct.")
            .replace("November", "nov.")
            .replace("December", "déc.")
    } else {
        return string
            .replace("January", "janvier")
            .replace("February", "février")
            .replace("March", "mars")
            .replace("April", "avril")
            .replace("May", "mai")
            .replace("June", "juin")
            .replace("July", "juillet")
            .replace("August", "août")
            .replace("September", "septembre")
            .replace("October", "octobre")
            .replace("November", "novembre")
            .replace("December", "décembre")
    }
}
