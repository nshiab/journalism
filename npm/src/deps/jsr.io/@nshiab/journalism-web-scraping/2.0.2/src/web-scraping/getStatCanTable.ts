import AdmZip from "adm-zip";
import { csvParse, type DSVRowArray } from "d3-dsv";
import { Buffer } from "node:buffer";

/**
 * Retrieves tabular data from Statistics Canada's website using a provided Product ID (PID). This function automates the process of fetching, unzipping, and parsing the CSV data directly from StatCan's API, making it easy to integrate official Canadian statistics into applications or analyses.
 *
 * The PID is a unique identifier for each table on the Statistics Canada website. It can typically be found in the URL of the table's page (e.g., `https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=98100001` where `98100001` is the PID).
 *
 * @param pid - The Product ID (PID) of the Statistics Canada table. This is a string of up to 8 digits. If a longer string is provided, it will be truncated to the first 8 characters.
 * @param options - Optional settings to customize the data retrieval.
 * @param options.lang - The language of the table data. Can be 'en' for English or 'fr' for French. Defaults to 'en'.
 * @param options.returnRawCSV - A boolean indicating whether to return the raw CSV data as a string instead of a parsed array of objects. Useful for direct file storage or custom parsing. Defaults to `false`.
 * @param options.debug - A boolean indicating whether to enable debug logging to the console, showing fetch URLs and other process details. Defaults to `false`.
 * @returns A Promise that resolves to either a `string` (if `returnRawCSV` is `true`) or an array of objects representing the table rows.
 *
 * @example
 * ```ts
 * // Retrieve data for a specific Statistics Canada table (e.g., PID '98100001').
 * const data = await getStatCanTable('98100001');
 * console.table(data);
 * ```
 *
 * @example
 * ```ts
 * // Retrieve data in French and return as raw CSV.
 * const rawCsvData = await getStatCanTable('98100001', {
 *   lang: 'fr',
 *   returnRawCSV: true,
 * });
 * console.log(rawCsvData);
 * ```
 *
 * @example
 * ```ts
 * // The function automatically truncates PIDs longer than 8 characters.
 * const truncatedPidData = await getStatCanTable('9810000112345', { debug: true });
 * console.table(truncatedPidData); // Console will show a warning about truncation.
 * ```
 *
 * @category Web scraping
 */

export default async function getStatCanTable(
  pid: string,
  options: {
    lang?: "en" | "fr";
    returnRawCSV?: boolean;
    debug?: boolean;
  } = {},
): Promise<string | DSVRowArray<string>> {
  const lang = options.lang ?? "en";

  if (pid.length > 8) {
    options.debug &&
      console.log(
        `pid ${pid} is too long (max 8 characters). Using ${
          pid.slice(
            0,
            8,
          )
        } instead.`,
      );
    pid = pid.slice(0, 8);
  }

  const getCSVResponse = await fetch(
    `https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/${pid}/${lang}`,
  );
  const zippedCsvUrl = await getCSVResponse.json();
  options.debug && console.log(`Fetching ${zippedCsvUrl.object}`);

  const response = await fetch(zippedCsvUrl.object);
  const zipBuffer = Buffer.from(await response.arrayBuffer());
  const zip = new AdmZip(zipBuffer);
  const zipEntries = zip.getEntries();
  const csvEntry = zipEntries.find((d: { entryName: string }) =>
    d.entryName === `${pid}.csv`
  );
  if (csvEntry === undefined) {
    throw new Error(`No ${pid}.csv in the zipped file.`);
  }
  const csv = csvEntry.getData().toString().replace(/\uFEFF/g, "");

  if (options.returnRawCSV) {
    return csv;
  }

  const data = csvParse(csv);
  delete data["columns" as unknown as number];

  options.debug &&
    console.log("colums:", JSON.stringify(Object.keys(data[0])));

  options.debug && console.table(data);

  return data;
}
