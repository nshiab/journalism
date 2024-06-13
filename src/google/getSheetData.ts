import { csvParse } from "d3-dsv"
import logToSheet from "./helpers/logToSheet.js"

/**
 * Returns the data of a Google Sheet.
 *
 * By default, this function looks for the API key in process.env.GOOGLE_PRIVATE_KEY and the service account email in process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL. If you don't have credentials, check [this](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 *
 *
 * ```ts
 * // Fake url used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 *
 * // Returning the data as an array of objects.
 * const data = await getSheetData(data, sheetUrl);
 *
 * // Same but skipping first row.
 * const data = await getSheetData(data, sheetUrl, { skip: 1});
 *
 * // You have an option to return the data as a CSV string. Useful if you just want to write the data somewhere.
 * const csv = await getSheetData(data, sheetUrl, { csv: true });
 *
 * // If your API email and key are stored under different names in process.env, use the options.
 * const csv = await getSheetData(data, sheetUrl, { apiEmail: "GG_EMAIL", apiKey: "GG_KEY" });
 * ```
 *
 * @param sheetUrl - The url directing to a specific sheet.
 * @param options - An optional object with configuration options:
 *   @param options.skip - The number of rows to skip before parsing the data. Defaults to 0.
 *   @param options.csv - If true, the function will return a CSV string instead of an array of objects.
 *   @param options.apiEmail - If your API email is stored under different names in process.env, use this option.
 *   @param options.apiKey - If your API key is stored under different names in process.env, use this option.
 *
 * @category Google
 */
export default async function getSheetData(
    sheetUrl: string,
    options: {
        csv?: boolean
        skip?: number
        apiEmail?: string
        apiKey?: string
    } = {}
) {
    const sheet = await logToSheet(sheetUrl, options)

    const buffer = await sheet.downloadAsCSV()
    const enc = new TextDecoder("utf-8")
    let csv = enc.decode(buffer)

    if (typeof options.skip === "number") {
        csv = csv.split("\n").slice(options.skip).join("\n")
    }

    if (options.csv) {
        return csv
    } else {
        const data = csvParse(csv)
        // @ts-expect-error no sure why
        delete data.columns
        return data
    }
}
