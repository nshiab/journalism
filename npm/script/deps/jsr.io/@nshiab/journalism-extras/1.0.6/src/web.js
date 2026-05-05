"use strict";
/**
 * This module provides a collection of functions to be used in web applications.
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-extras/web";
 * ```
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.getId = exports.DurationTracker = void 0;
const getId_js_1 = __importDefault(require("./extras/getId.js"));
exports.getId = getId_js_1.default;
const sleep_js_1 = __importDefault(require("./extras/sleep.js"));
exports.sleep = sleep_js_1.default;
const DurationTracker_js_1 = __importDefault(require("./extras/DurationTracker.js"));
exports.DurationTracker = DurationTracker_js_1.default;
