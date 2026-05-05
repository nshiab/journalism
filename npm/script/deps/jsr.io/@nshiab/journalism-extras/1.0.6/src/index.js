"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.unzip = exports.sleep = exports.removeDirectory = exports.reencode = exports.getId = exports.DurationTracker = exports.createDirectory = void 0;
const unzip_js_1 = __importDefault(require("./extras/unzip.js"));
exports.unzip = unzip_js_1.default;
const zip_js_1 = __importDefault(require("./extras/zip.js"));
exports.zip = zip_js_1.default;
const createDirectory_js_1 = __importDefault(require("./extras/createDirectory.js"));
exports.createDirectory = createDirectory_js_1.default;
const removeDirectory_js_1 = __importDefault(require("./extras/removeDirectory.js"));
exports.removeDirectory = removeDirectory_js_1.default;
const getId_js_1 = __importDefault(require("./extras/getId.js"));
exports.getId = getId_js_1.default;
const sleep_js_1 = __importDefault(require("./extras/sleep.js"));
exports.sleep = sleep_js_1.default;
const DurationTracker_js_1 = __importDefault(require("./extras/DurationTracker.js"));
exports.DurationTracker = DurationTracker_js_1.default;
const reencode_js_1 = __importDefault(require("./extras/reencode.js"));
exports.reencode = reencode_js_1.default;
