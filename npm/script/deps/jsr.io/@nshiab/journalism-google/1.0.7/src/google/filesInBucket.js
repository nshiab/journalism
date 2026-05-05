"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filesInBucket;
const storage_1 = require("@google-cloud/storage");
const node_process_1 = __importDefault(require("node:process"));
/**
 * Lists files within a Google Cloud Storage (GCS) bucket. You can list all files in the bucket or narrow down the results to a specific folder. The function can also return the full Google Storage URIs for each file.
 *
 * This function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.
 *
 * @param options Optional configuration for listing files.
 * @param options.folder The path to a specific folder within the bucket (e.g., 'my-data/'). Only files within this folder will be listed.
 * @param options.project The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.
 * @param options.bucket The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.
 * @param options.URI If `true`, the function will return the full Google Storage URI (e.g., 'gs://your-bucket/path/to/file.txt') for each file. Defaults to `false`, returning just the file path within the bucket.
 *
 * @returns An array of strings, where each string is either the file path within the bucket or its full Google Storage URI, depending on the `URI` option.
 *
 * @example
 * ```ts
 * // List all files in the default bucket.
 * const allFiles = await filesInBucket();
 * console.log("All files:", allFiles);
 * ```
 * @example
 * ```ts
 * // List files within a specific folder.
 * const folderFiles = await filesInBucket({ folder: "images/thumbnails/" });
 * console.log("Files in folder:", folderFiles);
 * ```
 * @example
 * ```ts
 * // Get Google Storage URIs for files in a folder.
 * const fileURIs = await filesInBucket({ folder: "documents/", URI: true });
 * console.log("File URIs:", fileURIs);
 * ```
 * @example
 * ```ts
 * // Explicitly specify project and bucket.
 * const specificBucketFiles = await filesInBucket({
 *   project: "my-gcp-project",
 *   bucket: "my-archive-bucket",
 *   folder: "old-data/"
 * });
 * console.log("Files from specific bucket:", specificBucketFiles);
 * ```
 * @category Google
 */
async function filesInBucket(options = {}) {
    const projectId = options.project ?? node_process_1.default.env.BUCKET_PROJECT;
    const bucketName = options.bucket ?? node_process_1.default.env.BUCKET_NAME;
    const folder = options.folder;
    const URI = options.URI ?? false;
    if (!projectId || !bucketName) {
        throw new Error("Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.");
    }
    const s = new storage_1.Storage({ projectId });
    const b = s.bucket(bucketName);
    const [files] = await b.getFiles({ prefix: folder, autoPaginate: true });
    if (URI) {
        return files.map((file) => `gs://${bucketName}/${file.name}`);
    }
    // Default: return file paths
    return files.map((file) => file.name);
}
