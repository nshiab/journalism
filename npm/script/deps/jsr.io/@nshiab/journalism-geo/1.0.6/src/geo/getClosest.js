"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getClosest;
const d3_array_1 = require("d3-array");
const distance_js_1 = __importDefault(require("./distance.js"));
/**
 * Implementation signature for getClosest function.
 * @ignore
 */
function getClosest(lon, lat, geoItems, getItemLon, getItemLat, options = {}) {
    const distances = [];
    for (let i = 0; i < geoItems.length; i++) {
        const item = geoItems[i];
        distances[i] = (0, distance_js_1.default)(lon, lat, getItemLon(item), getItemLat(item), {
            decimals: options.decimals,
        });
    }
    const distanceMinIndex = (0, d3_array_1.minIndex)(distances);
    const closest = geoItems[distanceMinIndex];
    if (options.addDistance) {
        if (typeof closest !== "object" || closest === null) {
            throw new Error("Cannot add distance property to non-object item");
        }
        const result = { ...closest };
        if ("properties" in result && typeof result.properties === "object" &&
            result.properties !== null) {
            result.properties = {
                ...result.properties,
                distance: distances[distanceMinIndex],
            };
        }
        else {
            result.distance = distances[distanceMinIndex];
        }
        return result;
    }
    return closest;
}
