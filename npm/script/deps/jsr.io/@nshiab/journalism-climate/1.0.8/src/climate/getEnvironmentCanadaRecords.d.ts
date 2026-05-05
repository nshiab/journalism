/**
 * Retrieves historical weather records from Environment and Climate Change Canada for specified locations and date ranges. This function fetches extreme weather records (daily maximum temperatures, precipitation, or snowfall) from the closest weather stations to your provided coordinates.
 *
 * The function uses Environment Canada's Long-Term Climate Extremes (LTCE) API to find the nearest weather stations that have recorded the specified weather variable, then retrieves the historical record values for each day in your specified date range.
 *
 * **Weather Variables**:
 * - `"DAILY MAXIMUM TEMPERATURE"`: Historical record high temperatures for each day
 * - `"DAILY TOTAL PRECIPITATION"`: Historical record precipitation amounts for each day
 * - `"DAILY TOTAL SNOWFALL"`: Historical record snowfall amounts for each day
 *
 * **Station Selection**:
 * For each location you provide, the function automatically finds the closest weather station that has recorded the specified weather variable. The distance to the station is calculated and included in the results, allowing you to assess the relevance of the data to your specific location.
 *
 * **Rate Limiting**:
 * The function includes built-in rate limiting with a configurable delay between API calls to respect Environment Canada's servers. The default delay is 100ms between requests, but this can be adjusted based on your needs.
 *
 * @example
 * ```ts
 * // Get record high temperatures for Toronto in July 2023
 * const torontoRecords = await getEnvironmentCanadaRecords(
 *   [{ lat: 43.6532, lon: -79.3832, city: "Toronto" }],
 *   "DAILY MAXIMUM TEMPERATURE",
 *   ["2023-07-01", "2023-07-31"]
 * );
 * console.table(torontoRecords);
 * // Returns daily record highs with station info and distances
 * ```
 *
 * @example
 * ```ts
 * // Get precipitation records for multiple cities with custom options
 * const cities = [
 *   { lat: 45.4215, lon: -75.6972, name: "Ottawa" },
 *   { lat: 43.6532, lon: -79.3832, name: "Toronto" },
 *   { lat: 45.5017, lon: -73.5673, name: "Montreal" }
 * ];
 *
 * const precipitationRecords = await getEnvironmentCanadaRecords(
 *   cities,
 *   "DAILY TOTAL PRECIPITATION",
 *   ["2023-06-01", "2023-08-31"],
 *   {
 *     delay: 200, // Slower requests to be extra respectful
 *     verbose: true // Log progress and station information
 *   }
 * );
 * console.table(precipitationRecords);
 * ```
 *
 * @example
 * ```ts
 * // Get snowfall records for winter months
 * const vancouverSnow = await getEnvironmentCanadaRecords(
 *   [{ lat: 49.2827, lon: -123.1207, region: "Vancouver" }],
 *   "DAILY TOTAL SNOWFALL",
 *   ["2023-12-01", "2024-02-29"]
 * );
 *
 * // Filter for days with significant snowfall records
 * const significantSnow = vancouverSnow.filter(record => record.recordValue > 10);
 * console.table(significantSnow);
 * ```
 *
 * @param locations - An array of location objects, each containing `lat` and `lon` properties. Additional properties will be preserved in the output.
 * @param variable - The type of weather record to retrieve. Must be one of:
 *   - `"DAILY MAXIMUM TEMPERATURE"`: Record high temperatures in Celsius
 *   - `"DAILY TOTAL PRECIPITATION"`: Record precipitation amounts in millimeters
 *   - `"DAILY TOTAL SNOWFALL"`: Record snowfall amounts in centimeters
 * @param dateRange - A tuple of two date strings in "YYYY-MM-DD" format representing the start and end dates (inclusive) for the record retrieval. Note: The year values are only used for iteration purposes to determine which calendar days to fetch records for - the actual records returned are historical all-time extremes regardless of the year specified.
 * @param options - Configuration options for the data retrieval.
 *   @param options.delay - Delay in milliseconds between API requests. Defaults to 100ms. Increase this value if you encounter rate limiting.
 *   @param options.verbose - If `true`, logs detailed information about station selection and API requests. Useful for debugging and monitoring progress. Defaults to `false`.
 * @return {Promise<Array>} A Promise that resolves to an array of objects containing the weather records. Each object includes:
 *   - All original properties from the input location
 *   - `recordMonth`: The month (1-12) of the record
 *   - `recordDay`: The day of the month of the record
 *   - `recordVariable`: The weather variable that was requested
 *   - `recordValue`: The record value (temperature in °C, precipitation/snowfall in mm/cm)
 *   - `recordYear`: The year when the record was set
 *   - `previousRecordValue`: The previous record value before the current record
 *   - `previousRecordYear`: The year when the previous record was set
 *   - `recordStationName`: The name of the weather station where the record was measured
 *   - `recordStationId`: The unique identifier of the weather station
 *   - `recordStationLat`: The latitude of the weather station
 *   - `recordStationLon`: The longitude of the weather station
 *   - `recordStationDistance`: The distance in meters from your location to the weather station
 *   - `recordStationRecordBegin`: The date when record-keeping began at this station
 *   - `recordStationRecordEnd`: The date when record-keeping ended at this station (null if still active)
 *
 * @category Weather
 */
export default function getEnvironmentCanadaRecords<T extends {
    lat: number;
    lon: number;
    [key: string]: unknown;
}>(locations: T[], variable: "DAILY MAXIMUM TEMPERATURE" | "DAILY TOTAL PRECIPITATION" | "DAILY TOTAL SNOWFALL", dateRange: [
    `${number}-${number}-${number}`,
    `${number}-${number}-${number}`
], options?: {
    delay?: number;
    verbose?: boolean;
}): Promise<(T & {
    recordMonth: number;
    recordDay: number;
    recordVariable: string;
    recordValue: number;
    recordYear: number;
    previousRecordValue: number;
    previousRecordYear: number;
    recordStationName: string;
    recordStationId: string;
    recordStationLat: number;
    recordStationLon: number;
    recordStationDistance: number;
    recordStationRecordBegin: string;
    recordStationRecordEnd: string | null;
})[]>;
//# sourceMappingURL=getEnvironmentCanadaRecords.d.ts.map