import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import iconv from "iconv-lite";

/**
 * Converts a file from one character encoding to another. This function is particularly optimized for handling large files.
 *
 * Character encoding is crucial for ensuring that text data is displayed correctly across different systems and applications. This function helps resolve issues related to garbled text when files are created or read with different encoding standards.
 *
 * @param inputFilePath - The absolute path to the input file that needs to be re-encoded.
 * @param outputFilePath - The absolute path where the converted file will be saved.
 * @param fromEncoding - The character encoding of the input file (e.g., 'windows-1252', 'latin1', 'ISO-8859-1').
 * @param toEncoding - The desired character encoding for the output file (e.g., 'utf-8').
 * @param options - Optional configuration settings for the re-encoding process.
 *   @param options.bufferSize - The size of the read buffer in kilobytes (KB). A larger buffer can improve performance for very large files but consumes more memory. Defaults to `256` KB.
 *   @param options.addBOM - If `true`, a Byte Order Mark (BOM) will be added to the output file if the `toEncoding` is UTF-8. A BOM can help some applications correctly identify the UTF-8 encoding. Defaults to `false`.
 * @returns A Promise that resolves when the file has been successfully re-encoded and saved.
 *
 * @example
 * ```ts
 * // Convert a CSV file from Windows-1252 to UTF-8 encoding.
 * await reencode('input.csv', 'output.csv', 'windows-1252', 'utf-8');
 * console.log("File re-encoded successfully.");
 * ```
 * @example
 * ```ts
 * // Re-encode a large file with a larger buffer size and add a UTF-8 Byte Order Mark (BOM).
 * await reencode('large_input.csv', 'large_output.csv', 'latin1', 'utf-8', {
 *   bufferSize: 1024, // 1MB buffer
 *   addBOM: true,
 * });
 * console.log("Large file re-encoded with custom buffer and BOM.");
 * ```
 * @category Formatting
 */
export default async function reencode(
  inputFilePath: string,
  outputFilePath: string,
  fromEncoding: string,
  toEncoding: string,
  options: {
    bufferSize?: number;
    addBOM?: boolean;
  } = {},
): Promise<void> {
  const bufferSize = options.bufferSize ?? 256;
  const addBOM = options.addBOM;

  const readStream = fs.createReadStream(inputFilePath, {
    highWaterMark: bufferSize * 1024,
  });

  const writeStream = fs.createWriteStream(outputFilePath);

  try {
    // Add BOM if necessary
    if (addBOM && toEncoding.toLowerCase() === "utf-8") {
      writeStream.write("\uFEFF");
    }

    await pipeline(
      readStream,
      iconv.decodeStream(fromEncoding),
      iconv.encodeStream(toEncoding),
      writeStream,
    );
  } catch (err) {
    throw new Error(`Encoding conversion error: ${(err as Error).message}`);
  } finally {
    // Ensuring streams are always closed
    readStream.close();
    writeStream.close();
  }
}
