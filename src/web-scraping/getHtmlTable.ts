import { chromium } from "playwright-chromium";
import { load } from "cheerio";
import { csvFormatRow, csvParse, type DSVRowArray } from "d3-dsv";

/**
 * Extracts tabular data from an HTML table on a given URL and returns it as an array of objects. This function is particularly useful for scraping structured data from web pages.
 *
 * @param url - The URL of the web page containing the HTML table.
 * @param options - An optional object to specify how to locate the table.
 * @param options.selector - A CSS selector string to identify the target table on the page. If not provided, the function will look for the first `<table>` element.
 * @param options.index - The 0-based index of the table to select if multiple tables match the `selector`. Defaults to `0`.
 * @returns A Promise that resolves to an array of objects representing the table data, where each row is an object with column headers as keys.
 *
 * @example
 * ```ts
 * // Extract data from the first table on a page
 * const data = await getHtmlTable("https://example.com/data");
 * console.log(data[0]); // Accessing data from the first row
 * ```
 *
 * @example
 * ```ts
 * // Extract data from a specific table using a selector and index
 * // This parses the fourth table with the class name 'data-table'.
 * const specificTableData = await getHtmlTable("https://example.com/data", {
 *   selector: ".data-table",
 *   index: 3
 * });
 * console.table(specificTableData);
 * ```
 */

export default async function getHtmlTable(
  url: string,
  options: {
    selector?: string;
    index?: number;
  } = {},
): Promise<DSVRowArray<string>> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 5000,
  });
  const html = await page.locator("body").innerHTML();
  await browser.close();

  const $ = load(html);

  let table;
  if (typeof options.selector === "string") {
    table = $(options.selector).filter(
      (i) => i === (typeof options.index === "number" ? options.index : 0),
    );
  } else {
    table = $("table").filter(
      (i) => i === (typeof options.index === "number" ? options.index : 0),
    );
  }

  let csv = "";
  table.find("tr").each((_i, tr) => {
    const row: string[] = [];

    $(tr)
      .find("th, td")
      .each((_j, th) => {
        row.push($(th).text().trim());
      });

    csv += `${csvFormatRow(row)}\n`;
  });

  const data = csvParse(csv);
  delete data["columns" as unknown as number];

  return data;
}
