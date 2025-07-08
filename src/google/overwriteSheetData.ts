import formatDate from "../format/formatDate.ts";
import cleanData from "./helpers/cleanData.ts";
import logToSheet from "./helpers/logToSheet.ts";

/**
 * Clears the content of a Google Sheet and then populates it with new data. This function is useful for regularly updating datasets in Google Sheets, ensuring that the sheet always reflects the latest information without manual intervention.
 *
 * The function automatically infers column headers from the keys of the first object in your `data` array. It supports various options for customizing the update process, including adding a timestamp of the last update, prepending custom text, and controlling how Google Sheets interprets the data types.
 *
 * By default, authentication is handled via environment variables (`GOOGLE_PRIVATE_KEY` and `GOOGLE_SERVICE_ACCOUNT_EMAIL`). For detailed setup instructions, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 *
 * @param data - An array of objects to be written to the Google Sheet. The keys of the first object in this array will be used as column headers.
 * @param sheetUrl - The URL of the Google Sheet to be updated. This URL should point to a specific sheet (e.g., ending with `#gid=0`).
 * @param options - An optional object with configuration options:
 *   @param options.prepend - A string to be added as a new row at the very top of the sheet, before any data or `lastUpdate` information. Useful for adding notes or disclaimers.
 *   @param options.lastUpdate - If `true`, a row indicating the date and time of the update will be added before the data. Defaults to `false`.
 *   @param options.timeZone - If `lastUpdate` is `true`, this option allows you to specify a time zone for the timestamp (e.g., `"Canada/Eastern"`). If omitted, the date will be formatted in UTC.
 *   @param options.raw - If `true`, data will be written as raw values, preventing Google Sheets from automatically guessing data types or applying formatting. This can be useful for preserving exact string representations. Defaults to `false`.
 *   @param options.apiEmail - Optional. Your Google Service Account email. If provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment variable.
 *   @param options.apiKey - Optional. Your Google Service Account private key. If provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.
 * @returns A Promise that resolves when the sheet has been successfully cleared and populated with new data.
 *
 * @example
 * ```ts
 * // The data needs to be an array of objects. The keys of the first object will be used to create the header row.
 * const data = [
 *   { first: "Nael", last: "Shiab" },
 *   { first: "Andrew", last: "Ryan" }
 * ];
 * // Fake URL used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 *
 * // Clearing the sheet and then populating it.
 * await overwriteSheetData(data, sheetUrl);
 * console.log("Sheet updated successfully with data.");
 * ```
 *
 * @example
 * ```ts
 * // Write data as raw values to prevent Google Sheets from interpreting them.
 * const rawData = [
 *   { id: '001', value: '05' }, // '05' might be interpreted as 5 without raw: true
 *   { id: '002', value: '10' }
 * ];
 * await overwriteSheetData(rawData, sheetUrl, { raw: true });
 * console.log("Sheet updated successfully with raw data.");
 * ```
 * @example
 * ```ts
 * // Add a timestamp of the update in UTC.
 * await overwriteSheetData(data, sheetUrl, { lastUpdate: true });
 * console.log("Sheet updated with UTC timestamp.");
 *
 * // Add a timestamp formatted to a specific time zone.
 * await overwriteSheetData(data, sheetUrl, { lastUpdate: true, timeZone: "Canada/Eastern" });
 * console.log("Sheet updated with Eastern Time timestamp.");
 * ```
 * @example
 * ```ts
 * // Add a custom message at the top of the sheet.
 * await overwriteSheetData(data, sheetUrl, { prepend: "For inquiries, contact data.team@example.com" });
 * console.log("Sheet updated with prepended text.");
 *
 * // Combine prepend with last update and time zone.
 * await overwriteSheetData(data, sheetUrl, {
 *   prepend: "For inquiries, contact data.team@example.com",
 *   lastUpdate: true,
 *   timeZone: "Canada/Eastern"
 * });
 * console.log("Sheet updated with prepended text and timestamp.");
 * ```
 * @example
 * ```ts
 * // Use explicitly provided API credentials instead of environment variables.
 * await overwriteSheetData(data, sheetUrl, {
 *   apiEmail: "your-service-account@project-id.iam.gserviceaccount.com",
 *   apiKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
 * });
 * console.log("Sheet updated using custom API credentials.");
 * ```
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
