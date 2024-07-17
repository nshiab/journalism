import { mkdirSync, existsSync } from "fs"

/**
 * Creates folders recursively if they don't exist.
 *
 * ```js
 * // Creates folders if they don't exist
 * createDirectory("./data/json")
 *
 * // This will give the same result. A file with an extension at the end of the path will be ignored.
 * createDirectory("./data/json/items.json")
 * ```
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
