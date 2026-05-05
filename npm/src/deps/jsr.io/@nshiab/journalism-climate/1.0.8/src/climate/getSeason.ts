/**
 * Determines the current season based on a given date, hemisphere, and season type. This function provides flexibility by allowing you to specify the exact date, the hemisphere (Northern or Southern), and the method of season calculation (astronomical or meteorological). By default, it uses the current date, the Northern Hemisphere, and astronomical seasons.
 *
 * Astronomical seasons are based on the Earth's position in its orbit around the sun, marked by equinoxes and solstices. Meteorological seasons are based on the annual temperature cycle and are typically defined by calendar months, making them consistent for statistical purposes.
 *
 * @param options - An object containing options for determining the season.
 * @param options.date - Optional. The date for which to determine the season. Defaults to the current date if not provided.
 * @param options.hemisphere - Optional. The hemisphere for which to determine the season. Can be 'northern' or 'southern'. Defaults to 'northern'.
 * @param options.type - Optional. The type of season calculation to use. Can be 'meteorological' or 'astronomical'. Defaults to 'astronomical'.
 * @returns The name of the season ('winter', 'spring', 'summer', or 'fall').
 *
 * @example
 * ```ts
 * // Get the current season in the northern hemisphere using astronomical seasons.
 * const season = getSeason();
 * console.log(season); // e.g., "summer" (if current date is July 7, 2025)
 * ```
 *
 * @example
 * ```ts
 * // Get the season for a specific date in the southern hemisphere using meteorological seasons.
 * const specificDate = new Date('2023-06-15');
 * const seasonSouthernMeteorological = getSeason({
 *   date: specificDate,
 *   hemisphere: 'southern',
 *   type: 'meteorological'
 * });
 * console.log(seasonSouthernMeteorological); // Output: "winter"
 * ```
 *
 * @example
 * ```ts
 * // Compare astronomical and meteorological seasons for a specific date in the Northern Hemisphere.
 * const march21 = new Date('2024-03-21');
 * const astronomicalSeason = getSeason({ date: march21, type: 'astronomical' });
 * console.log(`Astronomical season on March 21: ${astronomicalSeason}`); // Output: "spring"
 *
 * const meteorologicalSeason = getSeason({ date: march21, type: 'meteorological' });
 * console.log(`Meteorological season on March 21: ${meteorologicalSeason}`); // Output: "spring"
 *
 * const december1 = new Date('2024-12-01');
 * const astronomicalSeasonDec = getSeason({ date: december1, type: 'astronomical' });
 * console.log(`Astronomical season on December 1: ${astronomicalSeasonDec}`); // Output: "fall"
 *
 * const meteorologicalSeasonDec = getSeason({ date: december1, type: 'meteorological' });
 * console.log(`Meteorological season on December 1: ${meteorologicalSeasonDec}`); // Output: "winter"
 * ```
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
