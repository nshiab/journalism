"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeason = exports.getHumidex = exports.getEnvironmentCanadaRecords = void 0;
const getHumidex_js_1 = __importDefault(require("./climate/getHumidex.js"));
exports.getHumidex = getHumidex_js_1.default;
const getSeason_js_1 = __importDefault(require("./climate/getSeason.js"));
exports.getSeason = getSeason_js_1.default;
const getEnvironmentCanadaRecords_js_1 = __importDefault(require("./climate/getEnvironmentCanadaRecords.js"));
exports.getEnvironmentCanadaRecords = getEnvironmentCanadaRecords_js_1.default;
