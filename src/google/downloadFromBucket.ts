import { Storage } from "@google-cloud/storage";
import process from "node:process";
import { existsSync } from "node:fs";

/**
 * Downloads a file from a Google Cloud Storage bucket to a local path. By default, if the local file already exists, an error is thrown. To skip the download if the file exists, set `skip: true` in the options. To overwrite an existing file, set `overwrite: true`.
 *
 * This function expects the project ID and bucket name to be set either through environment variables (BUCKET_PROJECT and BUCKET_NAME) or passed as options.
 *
 * @example
 * Basic usage:
 * ```ts
 * await downloadFromBucket("remote/file.txt", "local/file.txt");
 * ```
 *
 * @example
 * Skip download if file exists:
 * ```ts
 * await downloadFromBucket("remote/file.txt", "local/file.txt", {
 *   skip: true
 * });
 * ```
 *
 * @example
 * Overwrite existing file:
 * ```ts
 * await downloadFromBucket("remote/file.txt", "local/file.txt", {
 *   overwrite: true
 * });
 * ```
 *
 * @example
 * Using explicit options:
 * ```ts
 * await downloadFromBucket("remote/file.txt", "local/file.txt", {
 *   project: "my-gcp-project",
 *   bucket: "my-bucket-name"
 * });
 * ```
 *
 * @param source - The path to the file in the bucket.
 * @param destination - The local path to save the file to.
 * @param options - Optional settings including project ID, bucket name, and behavior options.
 * @param options.project - The Google Cloud project ID.
 * @param options.bucket - The bucket name.
 * @param options.overwrite - If true, overwrites existing files. Default is false.
 * @param options.skip - If true, skips download if file already exists. Default is false.
 */
export default async function downloadFromBucket(
  source: string,
  destination: string,
  options: {
    project?: string;
    bucket?: string;
    overwrite?: boolean;
    skip?: boolean;
  } = {},
): Promise<void> {
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

  const localFileExists = existsSync(destination);

  if (localFileExists) {
    if (options.skip) {
      return; // Skip download if file exists and skip is true
    }
    if (!options.overwrite) {
      throw new Error(
        `Local file '${destination}' already exists. Set overwrite: true to replace it or skip: true to skip download.`,
      );
    }
  }

  const s = new Storage({ projectId });
  const b = s.bucket(bucketName);
  const file = b.file(source);

  await file.download({ destination });
}
