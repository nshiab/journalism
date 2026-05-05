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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatCanTable = exports.getHtmlTable = exports.downloadFile = void 0;
const getStatCanTable_js_1 = __importDefault(require("./web-scraping/getStatCanTable.js"));
exports.getStatCanTable = getStatCanTable_js_1.default;
const getHtmlTable_js_1 = __importDefault(require("./web-scraping/getHtmlTable.js"));
exports.getHtmlTable = getHtmlTable_js_1.default;
const downloadFile_js_1 = __importDefault(require("./web-scraping/downloadFile.js"));
exports.downloadFile = downloadFile_js_1.default;
