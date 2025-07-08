import { existsSync, mkdirSync } from "node:fs";

/**
 * Recursively creates a directory structure. This function is useful for ensuring that a path exists before writing a file to it.
 *
 * The function will not throw an error if the directory already exists. It can also accept a full file path, in which case it will create all the parent directories, ignoring the filename portion.
 *
 * @param path The path of the directory to create. This can be a path to a directory or a full path to a file.
 *
 * @example
 * // Create a simple directory
 * createDirectory("./output/data");
 * // This will create the 'output' and 'data' folders if they don't exist.
 *
 * @example
 * // Create a directory from a file path
 * createDirectory("./output/data/my-file.json");
 * // This will create the './output/data' directory structure. The 'my-file.json' part is ignored.
 * @category Other
 */

export default function createDirectory(path: string) {
  path = path
    .split("/")
    .filter((d) => (d.startsWith(".") ? true : !d.includes(".")))
    .join("/");

  if (path !== "" && !existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}
