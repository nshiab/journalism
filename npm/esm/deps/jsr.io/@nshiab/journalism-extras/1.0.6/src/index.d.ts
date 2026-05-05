/**
 * @module
 *
 * The Journalism library
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-extras
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism-extras
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-extras";
 * ```
 */
import unzip from "./extras/unzip.js";
import zip from "./extras/zip.js";
import createDirectory from "./extras/createDirectory.js";
import removeDirectory from "./extras/removeDirectory.js";
import getId from "./extras/getId.js";
import sleep from "./extras/sleep.js";
import DurationTracker from "./extras/DurationTracker.js";
import reencode from "./extras/reencode.js";
export { createDirectory, DurationTracker, getId, reencode, removeDirectory, sleep, unzip, zip, };
//# sourceMappingURL=index.d.ts.map