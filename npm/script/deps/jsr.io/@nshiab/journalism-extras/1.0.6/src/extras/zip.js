"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = zip;
const adm_zip_1 = __importDefault(require("adm-zip"));
const createDirectory_js_1 = __importDefault(require("./createDirectory.js"));
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
function zip(files, zipFile) {
    const z = new adm_zip_1.default();
    if (Array.isArray(files)) {
        for (const file of files) {
            z.addLocalFile(file);
        }
    }
    else {
        z.addLocalFolder(files);
    }
    (0, createDirectory_js_1.default)(zipFile);
    z.writeZip(zipFile);
}
