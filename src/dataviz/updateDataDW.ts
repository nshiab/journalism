import process from "node:process";
/**
 * Updates the data of a specified Datawrapper chart, table or map. By default, this function looks for the API key in process.env.DATAWRAPPER_KEY.
 *
 * @example
 * Basic usage
 * ```js
 * import { updateDataDW, dataAsCsv } from "journalism"
 *
 * const chartID = "myChartId"
 *
 * const data = [
 *  { salary: 75000, hireDate: new Date("2022-12-15") },
 *  ...
 * ]
 * const dataForChart = dataAsCsv(data)
 *
 * await updateDataDW(chartID, dataForChart)
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await updateDataDW(chartID, dataForChart, { apiKey: "DW_KEY" })
 * ```
 *
 * Example for a locator map.
 * ```js
 * import { updateDataDW } from "journalism"
 *
 * const mapID = "myMapId"
 *
 * const geojson = {
 *  "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "coordinates": [
 *           [
 *             [
 *               11.127454320325711,
 *               20.34856592751224
 *             ],
 *             [
 *               11.127454320325711,
 *               -13.781306861158996
 *             ],
 *             [
 *               55.68071875381875,
 *               -13.781306861158996
 *             ],
 *             [
 *               55.68071875381875,
 *               20.34856592751224
 *             ],
 *             [
 *               11.127454320325711,
 *               20.34856592751224
 *             ]
 *           ]
 *         ],
 *         "type": "Polygon"
 *       }
 *     }
 *   ]
 * }
 *
 * const dataForMap = {
 *   "markers": [
 *     {
 *       "id": "m1",
 *       "type": "area",
 *       "visible": true,
 *       "exactShape": true,
 *       "fill": true,
 *       "stroke": true,
 *       "properties": {
 *         "fill": "#15607a",
 *         "fill-opacity": 0.2,
 *         "stroke": "#15607a",
 *         "stroke-width": 1,
 *         "stroke-opacity": 1,
 *         "stroke-dasharray": "100000",
 *         "pattern": "solid",
 *         "pattern-line-width": 2,
 *         "pattern-line-gap": 2
 *       },
 *       "feature": geojson
 *     }
 *   ]
 * }
 *
 * await updateDataDW(mapID, JSON.stringify(dataForMap))
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await updateDataDW(mapID, JSON.stringify(dataForMap), { apiKey: "DW_KEY" })
 * ```
 *
 * @param chartId - The ID of the chart, table, or map to update.
 * @param data - The data to update the chart, table, or map with, in CSV format for charts or JSON format for maps.
 * @param options - Optional parameters.
 * @param options.apiKey - The process.env API key name to use for authentication. If not provided, the function will look for the key in process.env.DATAWRAPPER_KEY.
 * @param options.returnResponse - If true, the function will return the response object from the fetch call.
 *
 * @category Dataviz
 */

export default async function updateDataDW(
  chartId: string,
  data: string,
  options: { apiKey?: string; returnResponse?: boolean } = {},
): Promise<void | Response> {
  const envVar = options.apiKey ?? "DATAWRAPPER_KEY";
  const apiKey = process.env[envVar];
  if (apiKey === undefined || apiKey === "") {
    throw new Error(`process.env.${envVar} is undefined or ''.`);
  }

  const response = await fetch(
    `https://api.datawrapper.de/v3/charts/${chartId}/data`,
    {
      method: "PUT",
      body: data,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "text/csv",
      },
    },
  );

  // if returning a response, do it before the response.status checks
  if (options.returnResponse === true) {
    return response;
  }

  if (response.status !== 204) {
    throw new Error(
      `updateDataDW ${chartId}: Upstream HTTP ${response.status} - ${response.statusText}`,
    );
  }
}
