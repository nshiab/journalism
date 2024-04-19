import AdmZip from "adm-zip"

/**
 * Unzips a file and output the result in a folder.
 *
 * ```js
 * unzip("files.zip", "./output/")
 * ```
 * @category Other
 */
export default function unzip(zippedFile: string, output: string) {
    const zip = new AdmZip(zippedFile)
    zip.extractAllTo(output, true)
}
