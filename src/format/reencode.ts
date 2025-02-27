import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import iconv from "npm:iconv-lite@0.6";

/**
 * Converts a file from one character encoding to another. Optimized for large CSV files.
 *
 * @example
 * ```ts
 * await reencode('input.csv', 'output.csv', 'windows-1252', 'utf-8');
 * ```
 *
 * @param inputFilePath - Path to the input CSV file
 * @param outputFilePath - Path to save the converted CSV file
 * @param fromEncoding - Source encoding
 * @param toEncoding - Target encoding
 * @param options - Optional configuration
 * @param options.bufferSize - Read buffer size in KB (default: 256)
 * @param options.addBOM - Whether to add UTF-8 BOM to output file (default: false)
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
