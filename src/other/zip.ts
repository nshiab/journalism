import AdmZip from "npm:adm-zip@0.5";
import createDirectory from "./createDirectory.ts";

/**
 * Compresses files or a folder into a zip archive.
 *
 * @example
 * Basic usage
 * ```typescript
 * // Compressing multiple files into a zip archive
 * zip(['file1.txt', 'file2.txt'], 'archive.zip');
 *
 * // Compressing a folder into a zip archive
 * zip('filePath', 'archive.zip');
 * ```
 *
 * @param files - A folder path or an array of file paths to be included in the zip archive.
 * @param zipFile - The destination path for the created zip file.
 */
export default function zip(files: string | string[], zipFile: string) {
  const z = new AdmZip();
  if (Array.isArray(files)) {
    for (const file of files) {
      z.addLocalFile(file);
    }
  } else {
    z.addLocalFolder(files);
  }

  createDirectory(zipFile);
  z.writeZip(zipFile);
}
