import { rmSync } from "node:fs";

/**
 * Removes a directory and all its contents recursively.
 *
 * **Caution**: Use this function with care, as it permanently deletes files and directories without sending them to the recycle bin or trash. Ensure that the `path` provided is correct to avoid accidental data loss.
 *
 * @param path - The absolute or relative path to the directory to be removed.
 * @returns `void`
 *
 * @example
 * ```ts
 * // Removes the directory and all its contents recursively.
 * removeDirectory("./data/temp");
 * console.log("Directory removed successfully.");
 * ```
 * @example
 * ```ts
 * // Attempting to remove a directory that does not exist will not throw an error due to `force: true`.
 * removeDirectory("./non-existent-folder");
 * console.log("Attempted to remove non-existent folder (no error thrown).");
 * ```
 * @category Other
 */

export default function removeDirectory(path: string): void {
  rmSync(path, { recursive: true, force: true });
}
