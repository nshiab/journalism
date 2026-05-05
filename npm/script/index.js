"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./deps/jsr.io/@nshiab/journalism-ai/1.2.20/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-climate/1.0.8/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-dataviz/1.0.12/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-extras/1.0.6/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-finance/1.5.24/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-format/1.1.7/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-geo/1.0.6/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-google/1.0.7/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-statistics/1.5.2/src/index.js"), exports);
__exportStar(require("./deps/jsr.io/@nshiab/journalism-web-scraping/2.0.2/src/index.js"), exports);
