"use strict";
/**
 * @module
 *
 * The Journalism library (geospatial functions)
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-geo
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism-geo
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-geo";
 * ```
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styledLayerDescriptor = exports.getGeoTiffValues = exports.getGeoTiffDetails = exports.getClosest = exports.geoTo3D = exports.distance = void 0;
const geoTo3D_js_1 = __importDefault(require("./geo/geoTo3D.js"));
exports.geoTo3D = geoTo3D_js_1.default;
const distance_js_1 = __importDefault(require("./geo/distance.js"));
exports.distance = distance_js_1.default;
const styledLayerDescriptor_js_1 = __importDefault(require("./geo/styledLayerDescriptor.js"));
exports.styledLayerDescriptor = styledLayerDescriptor_js_1.default;
const getClosest_js_1 = __importDefault(require("./geo/getClosest.js"));
exports.getClosest = getClosest_js_1.default;
const getGeoTiffDetails_js_1 = __importDefault(require("./geo/getGeoTiffDetails.js"));
exports.getGeoTiffDetails = getGeoTiffDetails_js_1.default;
const getGeoTiffValues_js_1 = __importDefault(require("./geo/getGeoTiffValues.js"));
exports.getGeoTiffValues = getGeoTiffValues_js_1.default;
