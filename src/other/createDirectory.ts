import { mkdirSync, existsSync } from "node:fs"

/**
 * Creates folders recursively if they don't exist.
 *
 * @example
 * Basic usage
 * ```js
 * // Creates folders if they don't exist
 * createDirectory("./data/json")
 *
 * // This will give the same result. A file with an extension at the end of the path will be ignored.
 * createDirectory("./data/json/items.json")
 * ```
 *
 * @param path - The directory path to create.
 */

export default function createDirectory(path: string) {
    // For windows?
    if (path.includes("\\")) {
        path = path
            .split("\\")
            .filter((d) => (d.startsWith(".") ? true : !d.includes(".")))
            .join("\\")
    } else {
        path = path
            .split("/")
            .filter((d) => (d.startsWith(".") ? true : !d.includes(".")))
            .join("/")
    }

    if (path !== "" && !existsSync(path)) {
        mkdirSync(path, { recursive: true })
    }
}
