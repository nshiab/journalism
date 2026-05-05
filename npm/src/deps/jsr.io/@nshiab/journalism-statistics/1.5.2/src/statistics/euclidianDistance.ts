/**
 * Calculates the Euclidean distance between two points in a 2D Cartesian coordinate system. The Euclidean distance is the shortest straight-line distance between two points, often referred to as the "as the crow flies" distance.
 *
 * This function applies the Pythagorean theorem to compute the distance.
 *
 * @param x1 The x-coordinate of the first point.
 * @param y1 The y-coordinate of the first point.
 * @param x2 The x-coordinate of the second point.
 * @param y2 The y-coordinate of the second point.
 *
 * @returns The Euclidean distance between the two points.
 *
 * @example
 * ```ts
 * // Basic usage: Calculate the distance between (0,0) and (3,4).
 * const dist1 = euclideanDistance(0, 0, 3, 4);
 * console.log(dist1); // 5
 * ```
 * @example
 * ```ts
 * // Calculate the distance between two points with negative coordinates.
 * const dist2 = euclideanDistance(-1, -1, 2, 3);
 * console.log(dist2); // 5
 * ```
 * @example
 * ```ts
 * // Distance between identical points should be zero.
 * const dist3 = euclideanDistance(5, 10, 5, 10);
 * console.log(dist3); // 0
 * ```
 * @category Statistics
 */
export default function euclideanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  // Calculate the differences
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Use the Pythagorean theorem to calculate the distance
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
}
