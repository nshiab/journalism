import { load } from "cheerio";
import { csvFormatRow, csvParse, type DSVRowArray } from "d3-dsv";

/**
 * Extracts tabular data from an HTML table from a given URL or an HTML string and returns it as an array of objects. This function is particularly useful for scraping structured data from web pages.
 *
 * If the page uses JavaScript to render the table, you should fetch the HTML first using a tool like Playwright or Puppeteer and then pass the HTML string to this function.
 *
 * @param urlOrHtml - The URL of the web page containing the HTML table or the HTML string itself.
 * @param options - An optional object to specify how to locate the table.
 * @param options.selector - A CSS selector string to identify the target table on the page. If not provided, the function will look for the first `<table>` element.
 * @param options.index - The 0-based index of the table to select if multiple tables match the `selector`. Defaults to `0`.
 * @returns A Promise that resolves to an array of objects representing the table data, where each row is an object with column headers as keys.
 *
 * @example
 * ```ts
 * // Extract data from the first table on a page via URL
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
 *
 * @example
 * ```ts
 * // Extract data from an HTML string
 * const html = "<table><tr><th>Header</th></tr><tr><td>Data</td></tr></table>";
 * const dataFromHtml = await getHtmlTable(html);
 * console.log(dataFromHtml);
 * ```
 */

export default async function getHtmlTable(
  urlOrHtml: string,
  options: {
    selector?: string;
    index?: number;
  } = {},
): Promise<DSVRowArray<string>> {
  let html = "";
  if (
    urlOrHtml.startsWith("http://") || urlOrHtml.startsWith("https://")
  ) {
    const response = await fetch(urlOrHtml, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${urlOrHtml}: ${response.status} ${response.statusText}`,
      );
    }
    html = await response.text();
  } else {
    html = urlOrHtml;
  }

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
