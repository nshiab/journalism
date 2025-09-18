/**
 * Formats a date string into CBC (Canadian Broadcasting Corporation) style.
 * @param string The date string to format.
 * @param abrev If true, uses abbreviations for months and days.
 * @param monthAbbr3 If true, uses three-letter abbreviations for months.
 * @returns The formatted date string.
 */
export default function dateToCBCStyle(
  string: string,
  abrev: boolean,
  monthAbbr3?: boolean,
): string {
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
    .trim();

  if (monthAbbr3) {
    string = string
      .replace("January", "Jan.")
      .replace("February", "Feb.")
      .replace("March", "Mar.")
      .replace("April", "Apr.")
      // No abbreviation needed for May
      .replace("June", "Jun.")
      .replace("July", "Jul.")
      .replace("August", "Aug.")
      .replace("September", "Sep.")
      .replace("October", "Oct.")
      .replace("November", "Nov.")
      .replace("December", "Dec.");
  }

  if (abrev) {
    return (
      string
        .replace("January", "Jan.")
        .replace("February", "Feb.")
        // same for March, April, May, June, July
        .replace("August", "Aug.")
        .replace("September", "Sept.")
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
    );
  } else {
    return string;
  }
}
