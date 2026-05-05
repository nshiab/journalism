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

import geoTo3D from "./geo/geoTo3D.js";
import distance from "./geo/distance.js";
import styledLayerDescriptor from "./geo/styledLayerDescriptor.js";
import getClosest from "./geo/getClosest.js";
import getGeoTiffDetails from "./geo/getGeoTiffDetails.js";
import getGeoTiffValues from "./geo/getGeoTiffValues.js";

export {
  distance,
  geoTo3D,
  getClosest,
  getGeoTiffDetails,
  getGeoTiffValues,
  styledLayerDescriptor,
};
