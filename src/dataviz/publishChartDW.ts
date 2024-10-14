import process from "node:process";

/**
 * Publishes the specified Datawrapper chart, table, or map. By default, this function looks for the API key in process.env.DATAWRAPPER_KEY.
 *
 * @example
 * Basic usage
 * ```js
 * const chartID = "myChartId"
 * await publishChartDW(chartID)
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await publishChartDW(chartID, { apiKey: "DW_KEY" })
 * ```
 *
 * @param chartId - The ID of the chart to be published.
 * @param options - Optional parameters.
 * @param options.apiKey - The process.env API key name to use for authentication. If not provided, it defaults to process.env.DATAWRAPPER_KEY.
 * @param options.returnResponse - If true, the function returns the response object from the fetch call.
 *
 * @category Dataviz
 */
export default async function publishChartDW(
  chartId: string,
  options: { apiKey?: string; returnResponse?: boolean } = {},
): Promise<void | Response> {
  const envVar = options.apiKey ?? "DATAWRAPPER_KEY";
  const apiKey = process.env[envVar];
  if (apiKey === undefined || apiKey === "") {
    throw new Error(`process.env.${envVar} is undefined or ''.`);
  }

  const response = await fetch(
    `https://api.datawrapper.de/v3/charts/${chartId}/publish`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );
  await response.json();

  // if returning a response, do it before the response.status checks
  if (options.returnResponse === true) {
    return response;
  }

  if (response.status !== 200) {
    throw new Error(
      `publishChartDW ${chartId}: Upstream HTTP ${response.status} - ${response.statusText}`,
    );
  }
}
