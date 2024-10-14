export default function dateToRCStyle(string: string, abrev: boolean): string {
  string = string
    .replace(" h 00", " h")
    .replace("NDT", "HAT")
    .replace("NST", "HNT")
    .replace("ADT", "HAA")
    .replace("AST", "HNA")
    .replace("CDT", "HAC")
    .replace("CST", "HNC")
    .replace("MDT", "HAR")
    .replace("MST", "HNR")
    .replace("PDT", "HAP")
    .replace("PST", "HNP")
    .replace("EDT", "HAE")
    .replace("EST", "HNE")
    .trim();

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
      .replace("Monday", "Lun.")
      .replace("Tuesday", "Mar.")
      .replace("Wednesday", "Mer.")
      .replace("Thursday", "Jeu.")
      .replace("Friday", "Ven.")
      .replace("Saturday", "Sam.")
      .replace("Sunday", "Dim.");
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
      .replace("Monday", "Lundi")
      .replace("Tuesday", "Mardi")
      .replace("Wednesday", "Mercredi")
      .replace("Thursday", "Jeudi")
      .replace("Friday", "Vendredi")
      .replace("Saturday", "Samedi")
      .replace("Sunday", "Dimanche");
  }
}
