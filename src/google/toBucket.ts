import { Storage, type UploadOptions } from "@google-cloud/storage";
import process from "node:process";
import { existsSync } from "node:fs";

/**
 * Uploads a file to a Google Cloud Storage bucket and returns the URI of the uploaded file. By default, if the file already exists, an error is thrown. To skip the upload if the file exists, set `skip: true` in the options. To overwrite an existing file, set `overwrite: true`.
 *
 * When `skip: true` is set and the local file doesn't exist, the function checks if the remote file exists in the bucket. If it does, it returns the URI without error. If neither local nor remote file exists, it throws an error.
 *
 * This function expects the project ID and bucket name to be set either through environment variables (BUCKET_PROJECT and BUCKET_NAME) or passed as options.
 *
 * @example
 * Basic usage:
 * ```ts
 * // Upload a file using environment variables for project and bucket
 * const uri = await toBucket("./local/file.txt", "remote/file.txt");
 * console.log(uri); // "gs://my-bucket/remote/file.txt"
 * ```
 *
 * @example
 * Skip upload if file exists:
 * ```ts
 * const uri = await toBucket("./local/file.txt", "remote/file.txt", {
 *   skip: true
 * });
 * // Returns URI whether file was uploaded or already existed
 * console.log(uri); // "gs://my-bucket/remote/file.txt"
 * ```
 *
 * @example
 * Skip with non-existent local file:
 * ```ts
 * // If local file doesn't exist but remote file does, returns URI
 * const uri = await toBucket("./non-existent.txt", "remote/file.txt", {
 *   skip: true
 * });
 * console.log(uri); // "gs://my-bucket/remote/file.txt"
 * ```
 *
 * @example
 * Overwrite existing file:
 * ```ts
 * const uri = await toBucket("./local/file.txt", "remote/file.txt", {
 *   overwrite: true
 * });
 * console.log(uri); // "gs://my-bucket/remote/file.txt"
 * ```
 *
 * @example
 * Using explicit options:
 * ```ts
 * const uri = await toBucket("./local/file.txt", "remote/file.txt", {
 *   project: "my-gcp-project",
 *   bucket: "my-bucket-name",
 *   metadata: {
 *     contentType: "text/plain",
 *     cacheControl: "public, max-age=3600"
 *   }
 * });
 * ```
 *
 * @param file - The local path to the file to upload.
 * @param destination - The destination path in the bucket.
 * @param options - Optional settings including project ID, bucket name, metadata, and behavior options.
 * @param options.project - The Google Cloud project ID.
 * @param options.bucket - The bucket name.
 * @param options.metadata - File metadata to set on upload.
 * @param options.overwrite - If true, overwrites existing files. Default is false.
 * @param options.skip - If true, skips upload if file already exists. If local file doesn't exist but remote file does, returns URI. Default is false.
 * @returns The URI of the uploaded file (gs://bucket/path).
 */
export default async function toBucket(
  file: string,
  destination: string,
  options: {
    project?: string;
    bucket?: string;
    metadata?: UploadOptions["metadata"];
    overwrite?: boolean;
    skip?: boolean;
  } = {},
): Promise<string> {
  const projectId = options.project ?? process.env.BUCKET_PROJECT;
  const bucketName = options.bucket ?? process.env.BUCKET_NAME;

  if (options.skip && options.overwrite) {
    throw new Error(
      "Cannot use both 'skip' and 'overwrite' options at the same time. Choose one: set 'skip: true' to skip existing files or 'overwrite: true' to replace them.",
    );
  }

  if (!projectId || !bucketName) {
    throw new Error(
      "Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.",
    );
  }

  const s = new Storage({
    projectId: projectId,
  });

  const b = s.bucket(bucketName);
  const fileRef = b.file(destination);
  const [exists] = await fileRef.exists();

  if (options.skip) {
    const localFileExists = existsSync(file);
    if (!localFileExists && exists) {
      // Local file doesn't exist but remote file does, return URI
      return `gs://${bucketName}/${destination}`;
    }
    if (!localFileExists && !exists) {
      // Neither local nor remote file exists, throw error
      throw new Error(
        `Local file '${file}' does not exist. Cannot upload to bucket.`,
      );
    }
    if (exists) {
      // Local file exists and remote file exists, skip upload
      return `gs://${bucketName}/${destination}`;
    }
    // Local file exists but remote file doesn't, proceed with upload
  } else if (exists && !options.overwrite) {
    throw new Error(
      `File '${destination}' already exists in bucket '${bucketName}'. Set overwrite: true to replace it or skip: true to skip upload.`,
    );
  }

  await b.upload(file, {
    destination,
    metadata: options.metadata,
  });

  return `gs://${bucketName}/${destination}`;
}
