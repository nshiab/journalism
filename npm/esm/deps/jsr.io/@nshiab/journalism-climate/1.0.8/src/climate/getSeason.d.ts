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
export default function getSeason(options?: {
    date?: Date;
    hemisphere?: "northern" | "southern";
    type?: "meteorological" | "astronomical";
}): "winter" | "spring" | "summer" | "fall";
//# sourceMappingURL=getSeason.d.ts.map