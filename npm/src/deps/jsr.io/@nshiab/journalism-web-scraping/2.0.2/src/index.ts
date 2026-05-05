/**
 * @module
 *
 * The Journalism library
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism";
 * ```
 */

import getStatCanTable from "./web-scraping/getStatCanTable.js";
import getHtmlTable from "./web-scraping/getHtmlTable.js";
import downloadFile from "./web-scraping/downloadFile.js";

export { downloadFile, getHtmlTable, getStatCanTable };
