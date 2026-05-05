import { minIndex } from "d3-array";
import distance from "./distance.js";
/**
 * Implementation signature for getClosest function.
 * @ignore
 */
export default function getClosest(lon, lat, geoItems, getItemLon, getItemLat, options = {}) {
    const distances = [];
    for (let i = 0; i < geoItems.length; i++) {
        const item = geoItems[i];
        distances[i] = distance(lon, lat, getItemLon(item), getItemLat(item), {
            decimals: options.decimals,
        });
    }
    const distanceMinIndex = minIndex(distances);
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
