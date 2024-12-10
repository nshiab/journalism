import formatDate from "../format/formatDate.ts";
import cleanData from "./helpers/cleanData.ts";
import logToSheet from "./helpers/logToSheet.ts";

/**
 * Clears a Google Sheet and populates it with new data.
 *
 * By default, this function looks for the API key in process.env.GOOGLE_PRIVATE_KEY and the service account email in process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL. If you don't have credentials, check [this](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 *
 * @example
 * Basic usage
 * ```ts
 * // The data needs to be an array of objects. The keys of the first object will be used to create the header row.
 * const data = [
 *   { first: "Nael", last: "Shiab" },
 *   { first: "Andrew", last: "Ryan" }
 * ];
 * // Fake url used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 *
 * // Clearing the sheet and then populating it.
 * await overwriteSheetData(data, sheetUrl);
 *
 * // Same thing but with raw values. Google Sheet won't try to guess the data types and won't format or parse the values.
 * await overwriteSheetData(data, sheetUrl, { raw: true });
 *
 * // Adding the UTC date of the update before the data.
 * await overwriteSheetData(data, sheetUrl, { lastUpdate: true });
 *
 * // You can also format the date to a specific time zone.
 * await overwriteSheetData(data, sheetUrl, { lastUpdate: true, timeZone: "Canada/Eastern" });
 *
 * // The prepend option allows you to add extra text on the first row.
 * await overwriteSheetData(data, sheetUrl, { prepend: "Contact xxxx.xxxx@gmail.com for more information", lastUpdate: true, timeZone: "Canada/Eastern" });
 *
 * // If your API email and key are stored under different names in process.env, use the options.
 * await overwriteSheetData(data, sheetUrl, { apiEmail: "GG_EMAIL", apiKey: "GG_KEY" });
 * ```
 *
 * @param data - An array of objects.
 * @param sheetUrl - The url directing to a specific sheet.
 * @param options - An optional object with configuration options:
 *   @param options.prepend - Text to be added before the data.
 *   @param options.lastUpdate - If true, adds a row before the data with the date of the update.
 *   @param options.timeZone - If lastUpdate is true, you can use this option to format the date to a specific time zone.
 *   @param options.raw - If true, Google Sheet won't try to guess the data type and won't format or parse the values.
 *   @param options.apiEmail - If your API email is stored under different names in process.env, use this option.
 *   @param options.apiKey - If your API key is stored under different names in process.env, use this option.
 *
 * @category Google
 */
export default async function overwriteSheetData(
  data: { [key: string]: string | number | boolean | Date | null }[],
  sheetUrl: string,
  options: {
    prepend?: string;
    lastUpdate?: boolean;
    timeZone?:
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon";
    raw?: boolean;
    apiEmail?: string;
    apiKey?: string;
  } = {},
) {
  const sheet = await logToSheet(sheetUrl, options);
  await sheet.clear();

  let startIndex = 1;

  if (typeof options.prepend === "string" || options.lastUpdate) {
    await sheet.loadCells("A1:B2");
  }
  if (typeof options.prepend === "string") {
    const cellPrepend = sheet.getCellByA1(`A${startIndex}`);
    cellPrepend.value = options.prepend;
    startIndex += 1;
  }

  if (options.lastUpdate) {
    const cellLastUpdate = sheet.getCellByA1(`A${startIndex}`);
    cellLastUpdate.value = "Last update:";
    const cellDate = sheet.getCellByA1(`B${startIndex}`);
    if (typeof options.timeZone === "string") {
      cellDate.value = formatDate(new Date(), "YYYY-MM-DD HH:MM:SS TZ", {
        timeZone: options.timeZone,
      });
    } else {
      cellDate.value = formatDate(new Date(), "YYYY-MM-DD HH:MM:SS TZ", {
        utc: true,
      });
    }
    startIndex += 1;
  }

  if (typeof options.prepend === "string" || options.lastUpdate) {
    await sheet.saveUpdatedCells();
  }

  const headerRow = Object.keys(data[0]);
  await sheet.setHeaderRow(headerRow, startIndex);
  await sheet.addRows(cleanData(data), { raw: options.raw });
}
