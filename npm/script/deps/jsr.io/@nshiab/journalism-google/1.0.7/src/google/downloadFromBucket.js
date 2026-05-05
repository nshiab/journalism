"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = downloadFromBucket;
const storage_1 = require("@google-cloud/storage");
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = require("node:fs");
/**
 * Downloads a file from a Google Cloud Storage (GCS) bucket to a specified local path. This function provides robust handling for existing local files, allowing you to skip downloads or overwrite files as needed.
 *
 * The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.
 *
 * By default, if a local file with the same name already exists at the `destination` path, the function will throw an error to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.
 *
 * @param source The path to the file within the GCS bucket (e.g., 'my-folder/document.pdf').
 * @param destination The local file path where the downloaded file will be saved (e.g., './downloads/document.pdf').
 * @param options Optional configuration for the download operation.
 * @param options.project The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.
 * @param options.bucket The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.
 * @param options.overwrite If `true`, an existing local file at the `destination` path will be overwritten. Cannot be used with `skip`. Defaults to `false`.
 * @param options.skip If `true`, the download will be skipped if a local file already exists at the `destination` path. Cannot be used with `overwrite`. Defaults to `false`.
 *
 * @example
 * ```ts
 * // Basic usage: Download a file.
 * await downloadFromBucket("reports/annual-report.pdf", "./local-reports/annual-report.pdf");
 * console.log("File downloaded successfully!");
 * ```
 * @example
 * ```ts
 * // Skip download if the file already exists locally.
 * await downloadFromBucket("images/profile.jpg", "./local-images/profile.jpg", { skip: true });
 * console.log("Download skipped if file exists, or downloaded otherwise.");
 * ```
 * @example
 * ```ts
 * // Overwrite an existing local file.
 * await downloadFromBucket("data/latest-data.csv", "./local-data/latest-data.csv", { overwrite: true });
 * console.log("File downloaded and overwritten if it existed.");
 * ```
 * @example
 * ```ts
 * // Specify project and bucket explicitly.
 * await downloadFromBucket("configs/app-settings.json", "./local-configs/settings.json", {
 *   project: "my-gcp-project",
 *   bucket: "my-config-bucket"
 * });
 * ```
 * @category Google
 */
async function downloadFromBucket(source, destination, options = {}) {
    const projectId = options.project ?? node_process_1.default.env.BUCKET_PROJECT;
    const bucketName = options.bucket ?? node_process_1.default.env.BUCKET_NAME;
    if (options.skip && options.overwrite) {
        throw new Error("Cannot use both 'skip' and 'overwrite' options at the same time. Choose one: set 'skip: true' to skip existing files or 'overwrite: true' to replace them.");
    }
    if (!projectId || !bucketName) {
        throw new Error("Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.");
    }
    const localFileExists = (0, node_fs_1.existsSync)(destination);
    if (localFileExists) {
        if (options.skip) {
            return; // Skip download if file exists and skip is true
        }
        if (!options.overwrite) {
            throw new Error(`Local file '${destination}' already exists. Set overwrite: true to replace it or skip: true to skip download.`);
        }
    }
    const s = new storage_1.Storage({ projectId });
    const b = s.bucket(bucketName);
    const file = b.file(source);
    await file.download({ destination });
}
