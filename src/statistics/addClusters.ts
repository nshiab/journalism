/**
 * Adds clusters to the given data points based on the specified distance and minimum number of neighbours.
 *
 * This function is an implementation of the [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN), a density-based clustering algorithm to group points into clusters. Points are classified as core points, border points, or noise based on their neighbourhood.
 *
 * - Core points have at least `minNeighbours` within `minDistance`.
 * - Border points are within `minDistance` of a core point but have fewer than `minNeighbours`.
 * - Noise points are not within `minDistance` of any core points.
 *
 * The function modifies the input data array in place, adding `clusterId` and `clusterType` properties to each point.
 *
 * @param data - An array of data points where each point is an object with arbitrary properties.
 * @param minDistance - The maximum distance between points to be considered neighbours.
 * @param minNeighbours - The minimum number of neighbours required for a point to be considered a core point.
 * @param distance - A function that calculates the distance between two points.
 * @param options - Optional settings for the clustering process.
 * @param options.reset - If true, resets the clusterId and clusterType of all points before clustering.
 *
 * @returns void
 *
 * @category Statistics
 */
export default function addClusters(
    data: { [key: string]: unknown }[],
    minDistance: number,
    minNeighbours: number,
    distance: (
        a: { [key: string]: unknown },
        b: { [key: string]: unknown }
    ) => number,
    options: { reset?: boolean } = {}
): void {
    if (options.reset) {
        data.forEach((d) => {
            d.clusterId = undefined
            d.clusterType = undefined
        })
    }

    let clusterId = 0

    for (const point of data) {
        // Skip points that are already assigned to a cluster.
        if (point.clusterId !== undefined) continue

        // Find the neighbours of the current point.
        const neighbours = getNeighbours(point)

        // If the point has less than minPts neighbours, it's noise or a border point.
        if (neighbours.length < minNeighbours) {
            point.clusterId = null
            // We mark the point as noise initially. We double-check later if it's a border point.
            point.clusterType = "noise"
        } else {
            // We know that the point is a core point, so we assign it to a new cluster and we look for more points to add to the cluster.
            clusterId++
            const clusterLabel = `cluster${clusterId}`
            point.clusterId = clusterLabel
            point.clusterType = "core"
            expandCluster(neighbours, clusterLabel)
        }
    }

    // Assign border points to a cluster if they are reachable from a core point.
    for (const point of data) {
        if (point.clusterId === null) {
            const neighbours = getNeighbours(point)
            const clusterNeighbours = neighbours.find(
                (n) => n.clusterType === "core"
            )
            if (clusterNeighbours) {
                point.clusterId = clusterNeighbours.clusterId
                point.clusterType = "border"
            }
        }
    }

    // Find the neighbours of a point.
    function getNeighbours(point: {
        [key: string]: unknown
    }): { [key: string]: unknown }[] {
        return data.filter(
            (p) => p !== point && distance(point, p) <= minDistance
        )
    }

    // Add a point and its neighbours to the same cluster.
    function expandCluster(
        neighbours: { [key: string]: unknown }[],
        clusterLabel: string
    ): void {
        for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i]

            if (neighbour.clusterId === undefined) {
                // If the neighbour is not assigned to a cluster, we add it to the cluster.
                neighbour.clusterId = clusterLabel

                const newNeighbours = getNeighbours(neighbour)

                // If the neighbour is a core point, we add its neighbours to the list of points to be checked.
                if (newNeighbours.length >= minNeighbours) {
                    neighbour.clusterType = "core"
                    neighbours.push(
                        ...newNeighbours.filter((n) => !neighbours.includes(n))
                    )
                } else {
                    // If not core, it's a border point
                    neighbour.clusterType = "border"
                }
            } else if (neighbour.clusterId === null) {
                // If the neighbour is a border point, we add it to the cluster.
                neighbour.clusterId = clusterLabel
                neighbour.clusterType = "border"
            }
        }
    }
}
