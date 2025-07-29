import getClosest from "../geo/getClosest.ts";
import sleep from "../other/sleep.ts";

type Location = {
  id: string;
  properties: {
    VIRTUAL_CLIMATE_ID: string;
    VIRTUAL_STATION_NAME_E: string;
    START_DATE: string | null;
    END_DATE: string | null;
    ELEMENT_NAME_E: string;
    distance: number;
  };
  geometry: {
    coordinates: [number, number];
  };
};

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
export default async function getEnvironmentCanadaRecords(
  locations: { lat: number; lon: number; [key: string]: unknown }[],
  variable:
    | "DAILY MAXIMUM TEMPERATURE"
    | "DAILY TOTAL PRECIPITATION"
    | "DAILY TOTAL SNOWFALL",
  dateRange: [string, string],
  options: {
    delay?: number;
    verbose?: boolean;
  } = {},
) {
  const delay = options.delay ?? 100; // Default delay in milliseconds
  const startDate = new Date(Date.UTC(
    parseInt(dateRange[0].split("-")[0]),
    parseInt(dateRange[0].split("-")[1]) - 1,
    parseInt(dateRange[0].split("-")[2]),
  ));
  const endDate = new Date(Date.UTC(
    parseInt(dateRange[1].split("-")[0]),
    parseInt(dateRange[1].split("-")[1]) - 1,
    parseInt(dateRange[1].split("-")[2]),
  ));

  const allStationsResponse = await fetch(
    "https://api.weather.gc.ca/collections/ltce-stations/items?f=json&limit=9999999",
  );

  const allStations = await allStationsResponse.json() as {
    features: Location[];
  };

  const allStationsWithVariable = allStations.features.filter((d) =>
    d.properties.ELEMENT_NAME_E === variable
  );
  const stationsIdsAndCoordinates: {
    id: string;
    lat: number;
    lon: number;
    name: string;
  }[] = [];
  const returnedData: {
    recordMonth: number;
    recordDay: number;
    recordVariable: string;
    recordValue: number;
    recordYear: number;
    recordStationName: string;
    recordStationId: string;
    recordStationLat: number;
    recordStationLon: number;
    recordStationDistance: number;
    recordStationRecordBegin: string;
    recordStationRecordEnd: string | null;
    [key: string]: unknown;
  }[] = [];
  for (const station of allStationsWithVariable) {
    if (
      !stationsIdsAndCoordinates.some(
        (s) => s.id === station.properties.VIRTUAL_CLIMATE_ID,
      )
    ) {
      stationsIdsAndCoordinates.push({
        id: station.properties.VIRTUAL_CLIMATE_ID,
        lat: station.geometry.coordinates[1],
        lon: station.geometry.coordinates[0],
        name: station.properties.VIRTUAL_STATION_NAME_E,
      });
    }
  }

  for (const location of locations) {
    const { lat, lon } = location;
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error(
        "Each location must have numeric lat and lon properties.",
      );
    }
    const closestStation = getClosest(
      lon,
      lat,
      stationsIdsAndCoordinates,
      (d) => (d as { lon: number }).lon,
      (d) => (d as { lat: number }).lat,
      {
        addDistance: true,
        decimals: 0,
      },
    ) as { id: string; lat: number; lon: number; distance: number };

    if (options.verbose) {
      console.log("closestStation", closestStation);
    }

    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    for (let i = 0; i <= numberOfDays; i++) {
      const date = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const monthDay = `${month}-${day}`;
      let ltceCollection:
        | "ltce-temperature"
        | "ltce-precipitation"
        | "ltce-snowfall";
      if (variable === "DAILY MAXIMUM TEMPERATURE") {
        ltceCollection = "ltce-temperature";
      } else if (variable === "DAILY TOTAL PRECIPITATION") {
        ltceCollection = "ltce-precipitation";
      } else {
        ltceCollection = "ltce-snowfall";
      }
      const url =
        `https://api.weather.gc.ca/collections/${ltceCollection}/items/${closestStation.id}-${monthDay}?f=json`;
      if (options.verbose) {
        console.log(`Fetching ${url}`);
      }
      const recordResponse = await fetch(url);
      const record = await recordResponse.json();
      let recordValue: number;
      let recordYear: number;
      let recordStationRecordBegin: string;
      let recordStationRecordEnd: string | null = null;
      if (variable === "DAILY MAXIMUM TEMPERATURE") {
        recordValue = record.properties.RECORD_HIGH_MAX_TEMP;
        recordYear = record.properties.RECORD_HIGH_MAX_TEMP_YR;
        recordStationRecordBegin = record.properties.MAX_TEMP_RECORD_BEGIN;
        recordStationRecordEnd = record.properties.MAX_TEMP_RECORD_END;
      } else if (variable === "DAILY TOTAL PRECIPITATION") {
        recordValue = record.properties.RECORD_PRECIPITATION;
        recordYear = record.properties.RECORD_PRECIPITATION_YR;
        recordStationRecordBegin = record.properties.RECORD_BEGIN;
        recordStationRecordEnd = record.properties.RECORD_END;
      } else {
        recordValue = record.properties.RECORD_SNOWFALL;
        recordYear = record.properties.RECORD_SNOWFALL_YR;
        recordStationRecordBegin = record.properties.RECORD_BEGIN;
        recordStationRecordEnd = record.properties.RECORD_END;
      }
      returnedData.push({
        ...location,
        recordMonth: month,
        recordDay: day,
        recordVariable: variable,
        recordValue,
        recordYear,
        recordStationName: record.properties.VIRTUAL_STATION_NAME_E,
        recordStationId: record.properties.VIRTUAL_CLIMATE_ID,
        recordStationLat: closestStation.lat,
        recordStationLon: closestStation.lon,
        recordStationDistance: closestStation.distance,
        recordStationRecordBegin,
        recordStationRecordEnd,
      });
      await sleep(delay);
    }
  }
  return returnedData;
}
