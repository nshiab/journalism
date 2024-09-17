/**
 * Calculates the Euclidean distance between two points (x1, y1) and (x2, y2).
 *
 * The Euclidean distance is the straight-line distance between two points in a
 * Euclidean space and is calculated using the Pythagorean theorem.
 *
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 */
export default function euclideanDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    // Calculate the differences
    const dx = x2 - x1
    const dy = y2 - y1

    // Use the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(dx * dx + dy * dy)

    return distance
}
