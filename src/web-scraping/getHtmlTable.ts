import { load } from "npm:cheerio@1";
import { csvFormatRow, csvParse, type DSVRowArray } from "npm:d3-dsv@3";

/**
 * Returns the data from an HTML table as an array of objects.
 *
 * @param url The URL of the page containing the HTML table.
 * @param options Optional parameters to specify the table selector and index.
 * @param options.selector A CSS selector to identify the table.
 * @param options.index The index of the table if multiple tables match the selector.
 *
 * @example
 * Basic usage
 * ```js
 * // This would parse the data from the fourth
 * // table with the class name data-table.
 * const data = await getHtmlTable("your-url-here", {
 *   selector: ".data-table",
 *   index: 3
 * })
 * ```
 *
 * @category Web scraping
 */

export default async function getHtmlTable(
  url: string,
  options: {
    selector?: string;
    index?: number;
  } = {},
): Promise<DSVRowArray<string>> {
  const response = await fetch(url);
  const html = await response.text();

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
