import logToSheet from "./helpers/logToSheet.ts";

/**
 * Removes all rows from a sheet.
 *
 * By default, this function looks for the API key in process.env.GOOGLE_PRIVATE_KEY and the service account email in process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL. If you don't have credentials, check [this](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 *
 * @example
 * Basic usage
 * ```ts
 * // Fake url used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 *
 * // Removing all rows from the sheet.
 * await clearSheet(sheetUrl)
 * ```
 *
 * @param sheetUrl
 * @param options - An optional object with configuration options:
 *   @param options.apiEmail - If your API email is stored under different names in process.env, use this option.
 *   @param options.apiKey - If your API key is stored under different names in process.env, use this option.
 *
 * @category Google
 */
export default async function clearSheet(
  sheetUrl: string,
  options: { apiEmail?: string; apiKey?: string } = {},
) {
  const sheet = await logToSheet(sheetUrl, options);
  await sheet.clear();
}
