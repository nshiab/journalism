"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateNotesDW;
const node_process_1 = __importDefault(require("node:process"));
/**
 * Updates the notes field for a specified Datawrapper chart, table, or map. This function provides a programmatic way to add or modify descriptive text associated with your Datawrapper visualizations, which can include data sources, methodologies, or any other relevant context.
 *
 * Authentication is handled via an API key, which can be provided through environment variables (`DATAWRAPPER_KEY`) or explicitly in the options.
 *
 * @param chartId - The unique ID of the Datawrapper chart, table, or map to update. This ID can be found in the Datawrapper URL or dashboard.
 * @param note - The string content to update the chart's notes field with.
 * @param options - Optional parameters to configure the notes update process.
 *   @param options.apiKey - The name of the environment variable that stores your Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function defaults to looking for the `DATAWRAPPER_KEY` environment variable.
 *   @param options.returnResponse - If `true`, the function will return the full `Response` object from the Datawrapper API call. This can be useful for debugging or for more detailed handling of the API response. Defaults to `false`.
 * @returns A Promise that resolves to `void` if `returnResponse` is `false` (default), or a `Response` object if `returnResponse` is `true`.
 *
 * @example
 * ```ts
 * // Update the notes field of a Datawrapper chart with a simple text string.
 * import { updateNotesDW, formatDate } from "journalism";
 *
 * const chartID = "myChartId";
 * const dateString = formatDate(new Date(), "Month DD, YYYY, at HH:MM period", { abbreviations: true });
 * const note = `This chart was last updated on ${dateString}`;
 *
 * await updateNotesDW(chartID, note);
 * console.log(`Notes updated for chart ${chartID}.`);
 * ```
 * @example
 * ```ts
 * // If your API key is stored under a different name in process.env (e.g., `DW_KEY`).
 * const customApiKeyChartID = "anotherChartId";
 * const customNote = "This is a note using a custom API key.";
 * await updateNotesDW(customApiKeyChartID, customNote, { apiKey: "DW_KEY" });
 * console.log(`Notes updated for chart ${customApiKeyChartID} using custom API key.`);
 * ```
 * @category Dataviz
 */
async function updateNotesDW(chartId, note, options = {}) {
    const envVar = options.apiKey ?? "DATAWRAPPER_KEY";
    const apiKey = node_process_1.default.env[envVar];
    if (apiKey === undefined || apiKey === "") {
        throw new Error(`process.env.${envVar} is undefined or ''.`);
    }
    const response = await fetch(`https://api.datawrapper.de/v3/charts/${chartId}`, {
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
    });
    await response.json();
    // if returning a response, do it before the response.status checks
    if (options.returnResponse === true) {
        return response;
    }
    if (response.status !== 200) {
        throw new Error(`updateNotesDW ${chartId}: Upstream HTTP ${response.status} - ${response.statusText}`);
    }
}
