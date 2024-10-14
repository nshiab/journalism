import process from "node:process";

/**
 * Updates notes field for a specified Datawrapper chart, table or map. By default, this function looks for the API key in process.env.DATAWRAPPER_KEY.
 *
 * @example
 * Basic usage
 * ```js
 * import { updateNotesDW, formatDate } from "journalism"
 *
 * const chartID = "myChartId"
 * const dateString = formatDate(new Date(), "Month DD, YYYY, at HH:MM period", { abbreviations: true })
 * const note = `This chart was last updated on ${dateString}`
 *
 * await updateNotesDW(chartID, note)
 *
 * // If your API key is stored under a different name in process.env, use the options.
 * await updateNotesDW(chartID, note, { apiKey: "DW_KEY" })
 * ```
 *
 * @param chartId - The ID of the chart to update.
 * @param note - The note content to update in the chart.
 * @param options - Optional parameters.
 * @param options.apiKey - The process.env API key name to use for authentication. If not provided, defaults to process.env.DATAWRAPPER_KEY.
 * @param options.returnResponse - If true, the function returns the response object from the fetch call.
 *
 * @category Dataviz
 */
export default async function updateNotesDW(
  chartId: string,
  note: string,
  options: { apiKey?: string; returnResponse?: boolean } = {},
): Promise<void | Response> {
  const envVar = options.apiKey ?? "DATAWRAPPER_KEY";
  const apiKey = process.env[envVar];
  if (apiKey === undefined || apiKey === "") {
    throw new Error(`process.env.${envVar} is undefined or ''.`);
  }

  const response = await fetch(
    `https://api.datawrapper.de/v3/charts/${chartId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          annotate: {
            notes: note,
          },
        },
      }),
    },
  );

  await response.json();
  // if returning a response, do it before the response.status checks
  if (options.returnResponse === true) {
    return response;
  }

  if (response.status !== 200) {
    throw new Error(
      `updateNotesDW ${chartId}: Upstream HTTP ${response.status} - ${response.statusText}`,
    );
  }
}
