import AdmZip from "adm-zip"
import createDirectory from "./createDirectory.js"

/**
 * Zips multiple files together. To zip an entire folder, pass the folder path as the first parameter. To zip specific files, pass their path as an array of strings.
 *
 * ```js
 * // Entire folder
 * zip("./data", "./data.zip")
 *
 * // Specific files
 * zip(["./file1.json", "./file2.txt", "./file3.jpg"], "./files.zip")
 * ```
 *
 * @category Other
 */
export default function zip(files: string | string[], zipFile: string) {
    const z = new AdmZip()
    if (Array.isArray(files)) {
        for (const file of files) {
            z.addLocalFile(file)
        }
    } else {
        z.addLocalFolder(files)
    }

    createDirectory(zipFile)
    z.writeZip(zipFile)
}
