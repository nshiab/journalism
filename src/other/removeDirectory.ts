import { rmSync } from "node:fs";

/**
 * Removes a directory and all its contents recursively.
 *
 * @example
 * Basic usage
 * ```js
 * // Removes the directory and all its contents
 * removeDirectory("./data/temp")
 * ```
 *
 * @param path - The directory path to remove.
 */

export default function removeDirectory(path: string) {
  rmSync(path, { recursive: true, force: true });
}
