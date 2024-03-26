import { createWriteStream } from "fs"
import { Readable } from "stream"
import { finished } from "stream/promises"

/**
 * Downloads a file.
 *
 * ```ts
 * await dowloadFile("http://some-website.com/data.csv", "./downloads/data.csv" )
 * ```
 */

export default async function downloadFile(url: string, filePath: string) {
    const res = await fetch(url)
    const fileStream = createWriteStream(filePath, { flags: "w" })
    // @ts-expect-error No sure why
    await finished(Readable.fromWeb(res.body).pipe(fileStream))
}
