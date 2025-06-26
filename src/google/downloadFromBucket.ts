import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Downloads a file from a Google Cloud Storage bucket to a local path.
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
 * @param options - Optional settings including project ID and bucket name.
 * @param options.project - The Google Cloud project ID.
 * @param options.bucket - The bucket name.
 */
export default async function downloadFromBucket(
  source: string,
  destination: string,
  options: {
    project?: string;
    bucket?: string;
  } = {},
): Promise<void> {
  const projectId = options.project ?? process.env.BUCKET_PROJECT;
  const bucketName = options.bucket ?? process.env.BUCKET_NAME;

  if (!projectId || !bucketName) {
    throw new Error(
      "Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.",
    );
  }

  const s = new Storage({ projectId });
  const b = s.bucket(bucketName);
  const file = b.file(source);

  await file.download({ destination });
}
