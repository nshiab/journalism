import AdmZip from "adm-zip"
import { unlinkSync } from "fs"

/**
 * Unzips a file and outputs the result in a folder.
 *
 * ```js
 * unzip("files.zip", "./output/")
 * ```
 *
 * There is an option to remove the zipped file after extraction.
 * ```js
 * unzip("files.zip", "./output/", { deleteZippedFile: true })
 * ```
 *
 * @category Other
 */
export default function unzip(
    zippedFile: string,
    output: string,
    options: { deleteZippedFile?: boolean } = {}
) {
    const zip = new AdmZip(zippedFile)
    zip.extractAllTo(output, true)
    if (options.deleteZippedFile) {
        unlinkSync(zippedFile)
    }
}
