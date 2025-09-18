import AdmZip from "adm-zip";
import createDirectory from "./createDirectory.ts";

/**
 * Compresses one or more files or an entire folder into a single zip archive. This function is useful for bundling multiple assets, preparing data for transfer, or creating backups.
 *
 * You can specify individual files to be added to the archive, or provide a path to a directory, in which case all its contents will be compressed. The function automatically creates the necessary directory structure for the output zip file if it doesn't already exist.
 *
 * @param files - A string representing the path to a folder, or an array of strings representing paths to individual files. These are the items to be included in the zip archive.
 * @param zipFile - The absolute or relative path, including the filename and `.zip` extension, where the created zip archive will be saved (e.g., `"./archives/my-data.zip"`).
 * @returns `void`
 *
 * @example
 * ```ts
 * // Compressing multiple files into a zip archive.
 * zip(['file1.txt', 'file2.txt'], 'archive.zip');
 * console.log("Files zipped successfully.");
 *
 * // Compressing a folder into a zip archive.
 * zip('path/to/folder', 'folder-archive.zip');
 * console.log("Folder zipped successfully.");
 * ```
 * @category Other
 */
export default function zip(files: string | string[], zipFile: string): void {
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
