import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Checks if a file exists in a Google Cloud Storage bucket. This function expects the project ID and bucket name to be set either through environment variables (BUCKET_PROJECT and BUCKET_NAME) or passed as options.
 *
 * @example
 * Basic usage:
 * ```ts
 * const exists = await checkBucket("remote/file.txt");
 * if (exists) {
 *   console.log("File exists in the bucket.");
 * }
 * ```
 *
 * @example
 * Using explicit options:
 * ```ts
 * const exists = await checkBucket("remote/file.txt", {
 *  project: "my-gcp-project",
 *  bucket: "my-bucket-name"
 * });
 *
 * @param destination - The destination path in the bucket to check.
 * @param options - Optional settings including project ID and bucket name.
 */
export default async function inBucket(
  destination: string,
  options: {
    project?: string;
    bucket?: string;
  } = {},
): Promise<boolean> {
  const projectId = options.project ?? process.env.BUCKET_PROJECT;
  const bucketName = options.bucket ?? process.env.BUCKET_NAME;

  if (!projectId || !bucketName) {
    throw new Error(
      "Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.",
    );
  }

  const s = new Storage({ projectId });
  const b = s.bucket(bucketName);
  const file = b.file(destination);
  const [exists] = await file.exists();
  return exists;
}
