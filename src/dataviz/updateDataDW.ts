import process from "node:process";
/**
 * Updates the data of a specified Datawrapper chart, table, or map. This function is essential for keeping your Datawrapper visualizations dynamic and up-to-date with the latest information. It supports both CSV data for standard charts and tables, and JSON data for more complex visualizations like locator maps.
 *
 * Datawrapper is a powerful tool for creating interactive data visualizations. This function allows for programmatic updates, which is ideal for automated data pipelines, dashboards, or applications that require fresh data to be reflected in visualizations without manual intervention.
 *
 * Authentication is handled via an API key, which can be provided through environment variables (`process.env.DATAWRAPPER_KEY`) or explicitly in the options. The `Content-Type` header for the API request is automatically set based on whether the data is CSV or JSON.
 *
 * @param chartId - The unique ID of the Datawrapper chart, table, or map to update. This ID can be found in the Datawrapper URL or dashboard.
 * @param data - The data to update the chart, table, or map with. For standard charts and tables, this should be a CSV formatted string. For locator maps, this should be a JSON string representing the map's data (e.g., markers, areas).
 * @param options - Optional parameters to configure the data update process.
 *   @param options.apiKey - The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for `process.env.DATAWRAPPER_KEY`.
 *   @param options.returnResponse - If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.
 * @returns A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.
 * @throws {Error} If the API key is not found, if the Datawrapper API returns an error status (e.g., invalid chart ID, authentication failure, malformed data), or if there's a network issue.
 *
 * @example
 * // -- Basic Usage (for charts/tables) --
 *
 * // Update the data of a Datawrapper chart or table with CSV formatted data.
 * import { updateDataDW, dataAsCsv } from "journalism";
 *
 * const chartID = "myChartId";
 * const data = [
 *  { salary: 75000, hireDate: new Date("2022-12-15") },
 *  { salary: 80000, hireDate: new Date("2023-01-20") },
 * ];
 * const dataForChart = dataAsCsv(data);
 *
 * await updateDataDW(chartID, dataForChart);
 * console.log(`Data updated for chart ${chartID}.`);
 *
 * @example
 * // -- Example for a Locator Map (GeoJSON) --
 *
 * // Update the data of a Datawrapper locator map with GeoJSON data.
 * import { updateDataDW } from "journalism";
 *
 * const mapID = "myMapId";
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
 * };
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
 * };
 *
 * await updateDataDW(mapID, JSON.stringify(dataForMap));
 * console.log(`Data updated for map ${mapID}.`);
 *
 * @example
 * // -- Using Custom API Key Environment Variable --
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * const chartIDCustomKey = "anotherChartId";
 * const dataForCustomKey = "col1,col2\nval1,val2";
 * await updateDataDW(chartIDCustomKey, dataForCustomKey, { apiKey: "DW_KEY" });
 * console.log(`Data updated for chart ${chartIDCustomKey} using custom API key.`);
 *
 * @example
 * // -- Handling Missing API Key --
 *
 * // Attempting to update data without a configured API key will throw an error.
 * try {
 *   await updateDataDW("someChartId", "data", { apiKey: "NON_EXISTENT_KEY" });
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   // Expected output: "Error: process.env.NON_EXISTENT_KEY is undefined or ''."
 * }
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
