import logToSheet from "./helpers/logToSheet.js"

/**
 * Appends rows to a Google Sheet.  By default, this function looks for the API key in process.env.GOOGLE_PRIVATE_KEY and the service account email in process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL. If you don't have credentials, check [this](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 * 
 * ```ts
 * // The data needs to be an array of objects. The keys of the objects must match the sheet's columns.
 * const data = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
];
 * // Fake url used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 * 
 * // Appending the new rows to the sheet
 * await addSheetRows(data, sheetUrl)
 * ```
 * 
 * @param data - An array of objects.
 * @param sheetUrl - The url directing to a specific sheet.
 * @param options - An optional object with configuration options:
 *   @param options.headerIndex - By default, the first row of the sheet is considered as the header, but you can specify another row. First row is index 0. So second row is index 1, etc.
 *   @param options.raw - If true, Google Sheet won't try to guess the data type and won't format or parse the values.
 *   @param options.apiEmail - If your API email is stored under different names in process.env, use this option.
 *   @param options.apiKey - If your API key is stored under different names in process.env, use this option.
 */
export default async function addSheetRows(
    data: { [key: string]: string | number | boolean | Date }[],
    sheetUrl: string,
    options: {
        headerIndex?: number
        raw?: boolean
        apiEmail?: string
        apiKey?: string
    } = {}
) {
    const sheet = await logToSheet(sheetUrl, options)
    const headerRow = Object.keys(data[0])
    await sheet.setHeaderRow(
        headerRow,
        typeof options.headerIndex === "number" ? options.headerIndex + 1 : 1
    )
    await sheet.addRows(data, { raw: options.raw })
}
