"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unzip;
const adm_zip_1 = __importDefault(require("adm-zip"));
const node_fs_1 = require("node:fs");
/**
 * Unzips a given zipped file to a specified output directory. This function provides a convenient way to extract compressed archives, commonly used for distributing data or software. It offers an option to delete the original zipped file after successful extraction, which is useful for cleanup operations.
 *
 * @param zippedFile - The absolute or relative path to the zipped file (`.zip`) to be extracted.
 * @param output - The absolute or relative path to the directory where the contents of the zipped file will be extracted. If the directory does not exist, it will be created.
 * @param options - Optional settings for the unzip operation.
 *   @param options.deleteZippedFile - If `true`, the original zipped file will be deleted from the filesystem after its contents have been successfully extracted. Defaults to `false`.
 * @returns `void`
 *
 * @example
 * ```ts
 * // Unzip a file to a specified output directory.
 * unzip('path/to/file.zip', 'path/to/output');
 * console.log("File unzipped successfully.");
 * ```
 * @example
 * ```ts
 * // Unzip a file and then delete the original zipped file.
 * unzip('path/to/another-file.zip', 'path/to/another-output', { deleteZippedFile: true });
 * console.log("File unzipped and original zipped file deleted.");
 * ```
 * @category Other
 */
function unzip(zippedFile, output, options = {}) {
    const zip = new adm_zip_1.default(zippedFile);
    zip.extractAllTo(output, true);
    if (options.deleteZippedFile) {
        (0, node_fs_1.unlinkSync)(zippedFile);
    }
}
