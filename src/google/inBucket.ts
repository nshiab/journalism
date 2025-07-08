import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Checks if a specified file exists within a Google Cloud Storage (GCS) bucket. This function provides a straightforward way to verify the presence of a file in your GCS infrastructure, which is useful for conditional operations, data validation, or status checks.
 *
 * Authentication and bucket identification can be configured either through environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and `BUCKET_NAME` for the bucket name) or by passing them directly as options to the function. Options provided directly will take precedence over environment variables.
 *
 * @param destination - The full path to the file within the bucket (e.g., 'my-folder/my-file.txt').
 * @param options - Optional settings for configuring the GCS client.
 *   @param options.project - Your Google Cloud Project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.
 *   @param options.bucket - The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.
 * @returns A Promise that resolves to `true` if the file exists in the bucket, and `false` otherwise.
 *
 * @example
 * ```ts
 * // Check if a file exists in the default Google Cloud Storage bucket (configured via environment variables).
 * const exists = await inBucket("remote/file.txt");
 * if (exists) {
 *   console.log("File exists in the bucket.");
 * } else {
 *   console.log("File does not exist in the bucket.");
 * }
 * ```
 * @example
 * ```ts
 * // Check for a file's existence in a specified project and bucket, overriding environment variables.
 * const existsInSpecificBucket = await inBucket("remote/file.txt", {
 *  project: "my-gcp-project",
 *  bucket: "my-bucket-name"
 * });
 * if (existsInSpecificBucket) {
 *   console.log("File exists in the specified bucket.");
 * } else {
 *   console.log("File does not exist in the specified bucket.");
 * }
 * ```
 * @category Google
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
