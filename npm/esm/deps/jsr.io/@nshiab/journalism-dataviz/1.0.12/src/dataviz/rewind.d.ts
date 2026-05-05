/**
 * Rewinds the winding order of the specified GeoJSON object to be clockwise. It is based on the D3-geo library's winding order conventions.
 *
 * @param object - The GeoJSON object to rewind.
 * @returns A new GeoJSON object.
 *
 * @example
 * ```ts
 * // Rewind a FeatureCollection.
 * const featureCollection = {
 *   type: "FeatureCollection",
 *   features: [
 *     {
 *       type: "Feature",
 *       properties: {},
 *       geometry: {
 *         type: "Polygon",
 *         coordinates: [[[-10, -10], [-10, 10], [10, 10], [10, -10], [-10, -10]]]
 *       }
 *     }
 *   ]
 * };
 * const rewoundFeatureCollection = rewind(featureCollection);
 * ```
 * @example
 * ```ts
 * // Rewind a GeoJSON Feature containing a Polygon geometry.
 * const feature = {
 *   type: "Feature",
 *   properties: { name: "Example Area" },
 *   geometry: {
 *     type: "Polygon",
 *     coordinates: [[[-5, -5], [-5, 5], [5, 5], [5, -5], [-5, -5]]]
 *   }
 * };
 * const rewoundFeature = rewind(feature);
 * console.log(rewoundFeature);
 * ```
 * @category Geo
 */
export default function rewind(object: any): any;
//# sourceMappingURL=rewind.d.ts.map