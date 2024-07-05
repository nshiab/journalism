import { mkdirSync, existsSync } from "fs"

/**
 * Creates folders recursively if they don't exist. Folder names must not include `.`.
 *
 * ```js
 * // Creates folders if they don't exist
 * createDirectory("./data/json")
 *
 * // This will give the same result. The file at the end of the path is ignored.
 * createDirectory("./data/json/items.json")
 * ```
 */

export default function createDirectory(path: string) {
    // For windows?
    if (path.includes("\\")) {
        path = path
            .split("\\")
            .filter((d) => !d.includes("."))
            .join("\\")
    } else {
        path = path
            .split("/")
            .filter((d) => !d.includes("."))
            .join("/")
    }

    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true })
    }
}
