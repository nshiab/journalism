import AdmZip from "adm-zip"
import { unlinkSync } from "node:fs"

/**
 * Unzips a given zipped file to a specified output directory.
 *
 * @example
 * Basic usage
 * ```js
 * unzip('path/to/file.zip', 'path/to/output', { deleteZippedFile: true });
 * ```
 *
 * @param zippedFile - The path to the zipped file to be extracted.
 * @param output - The directory where the contents of the zipped file will be extracted.
 * @param options - Optional settings for the unzip operation.
 * @param options.deleteZippedFile - If true, the zipped file will be deleted after extraction.
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
