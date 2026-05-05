import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

/**
 * Downloads a file from a given URL and saves it to a specified local path. This function is useful for programmatically fetching resources from the web, such as datasets, images, or documents.
 *
 * The function uses streams for efficient handling of potentially large files, ensuring that the entire file does not need to be loaded into memory at once.
 *
 * @param url The URL of the file to download. This should be a complete and valid URL (e.g., 'https://example.com/data.zip').
 * @param filePath The absolute or relative local path where the downloaded file should be saved (e.g., './downloads/report.pdf').
 *
 * @example
 * ```ts
 * // Basic usage: Download a CSV file.
 * await downloadFile("https://example.com/data.csv", "./data/downloaded_data.csv");
 * console.log("CSV file downloaded successfully!");
 * ```
 *
 * @example
 * ```ts
 * // Download an image file.
 * await downloadFile("https://www.example.com/image.jpg", "./images/downloaded_image.jpg");
 * console.log("Image downloaded successfully!");
 * ```
 *
 * @category Web scraping
 */

export default async function downloadFile(
  url: string,
  filePath: string,
): Promise<void> {
  const res = await fetch(url);
  const fileStream = createWriteStream(filePath, { flags: "w" });
  if (res.body === null) {
    throw new Error("Response body is null");
  }
  //@ts-expect-error Different types between Node and Deno?
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
}
