/**
 * Assigns a color code to each category from a predefined list of colors.
 * @param categories An array of category names.
 * @returns An array of objects, each containing a category name and its assigned color code.
 */
export default function getColors(categories: string[]) {
  const colorCodes = [
    "\x1b[38;5;208m", // Orange
    "\x1b[31m", // Red
    "\x1b[32m", // Green
    "\x1b[33m", // Yellow
    "\x1b[34m", // Blue
    "\x1b[35m", // Magenta
    "\x1b[36m", // Cyan
  ];
  const colors = categories.map((d, i) => ({
    category: d,
    color: colorCodes[i % colorCodes.length],
  }));

  return colors;
}
