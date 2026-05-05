"use strict";
/**
 * @module
 *
 * This module provides a collection of functions to be used in web applications.
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-geo/web";
 * ```
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styledLayerDescriptor = exports.getClosest = exports.geoTo3D = exports.distance = void 0;
const geoTo3D_js_1 = __importDefault(require("./geo/geoTo3D.js"));
exports.geoTo3D = geoTo3D_js_1.default;
const distance_js_1 = __importDefault(require("./geo/distance.js"));
exports.distance = distance_js_1.default;
const styledLayerDescriptor_js_1 = __importDefault(require("./geo/styledLayerDescriptor.js"));
exports.styledLayerDescriptor = styledLayerDescriptor_js_1.default;
const getClosest_js_1 = __importDefault(require("./geo/getClosest.js"));
exports.getClosest = getClosest_js_1.default;
