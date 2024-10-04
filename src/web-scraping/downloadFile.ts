import { createWriteStream } from "node:fs"
import { Readable } from "node:stream"
import { finished } from "node:stream/promises"

/**
 * Downloads a file.
 *
 * @example
 * Basic usage
 * ```ts
 * await downloadFile("http://some-website.com/data.csv", "./downloads/data.csv")
 * ```
 *
 * @param url - The URL of the file to download
 * @param filePath - The local path where the file should be saved
 *
 * @category Web scraping
 */

export default async function downloadFile(url: string, filePath: string) {
    const res = await fetch(url)
    const fileStream = createWriteStream(filePath, { flags: "w" })
    if (res.body === null) {
        throw new Error("Response body is null")
    }
    //@ts-expect-error No sure why
    await finished(Readable.fromWeb(res.body).pipe(fileStream))
}
