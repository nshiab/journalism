/**
 * Groups data points into clusters using the DBSCAN (Density-Based Spatial Clustering of Applications with Noise) algorithm. This method is particularly effective at identifying clusters of arbitrary shapes and handling noise in the data.
 *
 * The function operates based on two key parameters: `minDistance` (also known as epsilon or ε) and `minNeighbours`. It classifies each data point into one of three categories:
 *
 * - **Core point**: A point that has at least `minNeighbours` other points (including itself) within a `minDistance` radius. These points are the foundation of a cluster.
 * - **Border point**: A point that is within the `minDistance` of a core point but does not have enough neighbors to be a core point itself. Border points are on the edge of a cluster.
 * - **Noise point**: A point that is neither a core point nor a border point. These are outliers that do not belong to any cluster.
 *
 * The function modifies the input `data` array by adding two properties to each point:
 * - `clusterId`: A unique identifier for the cluster the point belongs to (e.g., 'cluster1'). For noise points, this will be `null`.
 * - `clusterType`: The classification of the point, which can be 'core', 'border', or 'noise'.
 *
 * @param data An array of data points. Each point is an object with any number of properties.
 * @param minDistance The maximum distance between two points for them to be considered neighbors. This is a crucial parameter that defines the density of the clusters.
 * @param minNeighbours The minimum number of points required to form a dense region (a core point). A larger value will result in more points being classified as noise.
 * @param distance A function that takes two points as input and returns the distance between them. This allows for flexible distance metrics (e.g., Euclidean, Manhattan).
 * @param options Optional settings for the clustering process.
 * @param options.reset If `true`, the `clusterId` and `clusterType` properties of all points will be cleared before the clustering process begins. This is useful for re-running the clustering with different parameters.
 *
 * @example
 * ```ts
 * // Basic usage with Euclidean distance
 * const data = [
 *   { id: 'a', x: 1, y: 2 },
 *   { id: 'b', x: 2, y: 3 },
 *   { id: 'c', x: 10, y: 10 },
 *   { id: 'd', x: 11, y: 11 },
 *   { id: 'e', x: 50, y: 50 }
 * ];
 *
 * // Use the journalism library's euclideanDistance function to calculate the distance
 * const distance = (a, b) => euclideanDistance(a.x, a.y, b.x, b.y);
 *
 * addClusters(data, 5, 2, distance);
 *
 * console.log(data);
 * // Expected output:
 * // [
 * //   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
 * //   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'core' },
 * //   { id: 'c', x: 10, y: 10, clusterId: 'cluster2', clusterType: 'core' },
 * //   { id: 'd', x: 11, y: 11, clusterId: 'cluster2', clusterType: 'core' },
 * //   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
 * // ]
 * ```
 * @example
 * ```ts
 * // Re-running clustering with different parameters
 * addClusters(data, 10, 2, distance, { reset: true });
 *
 * console.log(data);
 * // Expected output with a larger minDistance:
 * // [
 * //   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
 * //   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'border' },
 * //   { id: 'c', x: 10, y: 10, clusterId: 'cluster1', clusterType: 'core' },
 * //   { id: 'd', x: 11, y: 11, clusterId: 'cluster1', clusterType: 'border' },
 * //   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
 * // ]
 * ```
 * @category Statistics
 */
export default function addClusters<T extends Record<string, unknown>>(data: T[], minDistance: number, minNeighbours: number, distance: (a: T, b: T) => number, options?: {
    reset?: boolean;
}): asserts data is (T & {
    clusterId: string | null;
    clusterType: "core" | "border" | "noise";
})[];
//# sourceMappingURL=addClusters.d.ts.map