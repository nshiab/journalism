import process from "node:process";

/**
 * Publishes a specified Datawrapper chart, table, or map. This function streamlines the process of making your Datawrapper visualizations live, allowing for automated deployment and updates. It handles authentication using an API key, which can be provided via environment variables or directly through options.
 *
 * @param chartId - The unique ID of the Datawrapper chart, table, or map to be published. This ID can be found in the Datawrapper URL or dashboard.
 * @param options - Optional parameters to configure the publishing process.
 *   @param options.apiKey - The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.
 *   @param options.returnResponse - If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.
 * @returns A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.
 *
 * @example
 * ```ts
 * // Publish a Datawrapper chart with a given ID.
 * const chartID = "myChartId";
 * await publishChartDW(chartID);
 * console.log(`Chart ${chartID} published successfully.`);
 * ```
 * @example
 * ```ts
 * // If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
 * const customApiKeyChartID = "anotherChartId";
 * await publishChartDW(customApiKeyChartID, { apiKey: "DW_API_KEY" });
 * console.log(`Chart ${customApiKeyChartID} published using custom API key.`);
 * ```
 * @example
 * ```ts
 * // Get the full HTTP response object after publishing.
 * const chartIDForResponse = "yetAnotherChartId";
 * const response = await publishChartDW(chartIDForResponse, { returnResponse: true });
 * console.log(`Response status for ${chartIDForResponse}: ${response?.status}`);
 * ```
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
