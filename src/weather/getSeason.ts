/**
 * Determines the current season based on a date (current date by default). Options include hemisphere (northern by default) and type (astronomical by default).
 *
 * @example
 * Basic usage
 * ```js
 * // Get the current season in the northern hemisphere using astronomical seasons
 * const season = getSeason();
 * console.log(season); // e.g., "spring"
 * ```
 *
 * @example
 * With options
 * ```js
 * // Get the season for a specific date in the southern hemisphere using meteorological seasons
 * const season = getSeason({ date: new Date('2023-06-15'), hemisphere: 'southern', type: 'meteorological' });
 * console.log(season); // e.g., "winter"
 * ```
 *
 * @param options - The options for determining the season.
 * @param options.date - The date to determine the season for.
 * @param options.hemisphere - The hemisphere ("northern" or "southern").
 * @param options.type - The type of season calculation ("meteorological" or "astronomical").
 *
 * @category Weather and climate
 */
export default function getSeason(
  options: {
    date?: Date;
    hemisphere?: "northern" | "southern";
    type?: "meteorological" | "astronomical";
  } = {},
): "winter" | "spring" | "summer" | "fall" {
  const {
    date = new Date(),
    hemisphere = "northern",
    type = "astronomical",
  } = options;

  const month = date.getMonth();

  let season: "winter" | "spring" | "summer" | "fall" | undefined;

  if (type === "meteorological") {
    if (month >= 2 && month <= 4) {
      // March, April, and May
      season = "spring";
    } else if (month >= 5 && month <= 7) {
      // June, July, and August
      season = "summer";
    } else if (month >= 8 && month <= 10) {
      // September, October, and November
      season = "fall";
    } else {
      // December, January, and February
      season = "winter";
    }
  } else {
    // astronomical
    const day = date.getDate();
    if (month === 0 || month === 1) {
      // January and February
      season = "winter";
    } else if (month === 2) {
      // March
      if (day <= 20) {
        season = "winter";
      } else {
        season = "spring";
      }
    } else if (month === 3 || month === 4) {
      // April and May
      season = "spring";
    } else if (month === 5) {
      // June
      if (day <= 20) {
        season = "spring";
      } else {
        season = "summer";
      }
    } else if (month === 6 || month === 7) {
      // July and August
      season = "summer";
    } else if (month === 8) {
      // September
      if (day <= 20) {
        season = "summer";
      } else {
        season = "fall";
      }
    } else if (month === 9 || month === 10) {
      season = "fall";
    } else if (month === 11) {
      if (day <= 20) {
        season = "fall";
      } else {
        season = "winter";
      }
    }
  }

  if (typeof season !== "string") {
    throw new Error("No season");
  }

  if (hemisphere === "southern") {
    const oppositeSeasons: {
      [key: string]: "winter" | "spring" | "summer" | "fall";
    } = {
      winter: "summer",
      spring: "fall",
      summer: "winter",
      fall: "spring",
    };
    season = oppositeSeasons[season];
  }

  return season;
}
