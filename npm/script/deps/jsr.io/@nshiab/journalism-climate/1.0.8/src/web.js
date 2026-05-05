"use strict";
/**
 * @module
 *
 * This module provides a collection of functions to be used in web applications.
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-climate/web";
 * ```
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeason = exports.getHumidex = void 0;
const getHumidex_js_1 = __importDefault(require("./climate/getHumidex.js"));
exports.getHumidex = getHumidex_js_1.default;
const getSeason_js_1 = __importDefault(require("./climate/getSeason.js"));
exports.getSeason = getSeason_js_1.default;
