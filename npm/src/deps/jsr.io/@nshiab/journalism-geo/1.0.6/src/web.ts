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

import geoTo3D from "./geo/geoTo3D.js";
import distance from "./geo/distance.js";
import styledLayerDescriptor from "./geo/styledLayerDescriptor.js";
import getClosest from "./geo/getClosest.js";

export { distance, geoTo3D, getClosest, styledLayerDescriptor };
