/**
 * @module
 *
 * The Journalism library (climate functions)
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-climate
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism-climate
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-climate";
 * ```
 */
import getHumidex from "./climate/getHumidex.js";
import getSeason from "./climate/getSeason.js";
import getEnvironmentCanadaRecords from "./climate/getEnvironmentCanadaRecords.js";
export { getEnvironmentCanadaRecords, getHumidex, getSeason };
