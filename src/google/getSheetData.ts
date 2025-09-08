import { csvParse } from "npm:d3-dsv@3";
import logToSheet from "./helpers/logToSheet.ts";

/**
 * Retrieves data from a Google Sheet.
 *
 * By default, this function attempts to authenticate using environment variables (`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the service account email). For detailed instructions on setting up credentials, refer to the `node-google-spreadsheet` authentication guide: [https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).
 *
 * @param sheetUrl - The URL of the Google Sheet from which to retrieve data. This URL should point to a specific sheet (e.g., ending with `#gid=0`).
 * @param options - An optional object with configuration options:
 *   @param options.skip - The number of rows to skip from the beginning of the sheet before parsing the data. This is useful for sheets that have metadata at the top. Defaults to `0`.
 *   @param options.csv - If `true`, the function will return the raw data as a CSV string. If `false` or omitted, it will return an array of objects, where each object represents a row and keys correspond to column headers. Defaults to `false`.
 *   @param options.apiEmail - Optional. Your Google Service Account email. If provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment variable.
 *   @param options.apiKey - Optional. Your Google Service Account private key. If provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.
 * @returns A Promise that resolves to either an array of objects (`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string (`string`) if `options.csv` is `true`.
 *
 * @example
 * ```ts
 * // Fake URL used as an example.
 * const sheetUrl = "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";
 *
 * // Returning the data as an array of objects.
 * const data = await getSheetData(sheetUrl);
 * console.log(data);
 * // Expected output (example):
 * // [
 * //   { Header1: 'Value1', Header2: 'Value2' },
 * //   { Header1: 'Value3', Header2: 'Value4' }
 * // ]
 * ```
 * @example
 * ```ts
 * // Retrieve data, skipping the first row (e.g., if it contains metadata).
 * const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
 * console.log(dataSkippingFirstRow);
 * // Expected output (example, assuming first row was metadata):
 * // [
 * //   { Header1: 'Value1', Header2: 'Value2' },
 * //   { Header1: 'Value3', Header2: 'Value4' }
 * // ]
 * ```
 * @example
 * ```ts
 * // Return the data as a raw CSV string, useful for direct writing to files or other systems.
 * const csvString = await getSheetData(sheetUrl, { csv: true });
 * console.log(csvString);
 * // Expected output (example):
 * // "Header1,Header2\nValue1,Value2\nValue3,Value4"
 * ```
 * @example
 * ```ts
 * // Use custom environment variable names for API email and key.
 * const dataWithCustomCredentials = await getSheetData(sheetUrl, {
 *   apiEmail: "GG_EMAIL",
 *   apiKey: "GG_KEY"
 * });
 * console.log(dataWithCustomCredentials);
 * ```
 * @category Google
 */

// When csv is true, return a CSV string
export default function getSheetData(
  sheetUrl: string,
  options: {
    csv: true;
    skip?: number;
    apiEmail?: string;
    apiKey?: string;
  },
): Promise<string>;

/**
 * Retrieves data from a Google Sheet and returns it as an array of objects.
 *
 * @param sheetUrl - The URL of the Google Sheet from which to retrieve data.
 * @param options - Optional configuration options (csv defaults to false).
 * @returns A Promise that resolves to an array of objects representing the sheet data.
 */
export default function getSheetData(
  sheetUrl: string,
  options?: {
    csv?: false;
    skip?: number;
    apiEmail?: string;
    apiKey?: string;
  },
): Promise<Record<string, string>[]>;

// Implementation signature
export default async function getSheetData(
  sheetUrl: string,
  options: {
    csv?: boolean;
    skip?: number;
    apiEmail?: string;
    apiKey?: string;
  } = {},
): Promise<Record<string, string>[] | string> {
  const sheet = await logToSheet(sheetUrl, options);

  const buffer = await sheet.downloadAsCSV();
  const enc = new TextDecoder("utf-8");
  let csv = enc.decode(buffer);

  if (typeof options.skip === "number") {
    csv = csv.split("\n").slice(options.skip).join("\n");
  }

  if (options.csv) {
    return csv;
  } else {
    const data = csvParse(csv);
    delete data.columns;
    return data;
  }
}
