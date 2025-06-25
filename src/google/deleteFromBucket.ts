import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Deletes a file from a Google Cloud Storage bucket. By default, it will throw an error if the file does not exist, but you can use the `try` option to avoid errors in such cases.
 *
 * This function expects the project ID and bucket name to be set either through environment variables (BUCKET_PROJECT and BUCKET_NAME) or passed as options.
 *
 * @example
 * Basic usage:
 * ```ts
 * await deleteFromBucket("remote/file.txt");
 * ```
 *
 * @example
 * No error if file doesn't exist:
 * ```ts
 * await deleteFromBucket("remote/file.txt", { try: true });
 * ```
 *
 * @example
 * Using explicit options:
 * ```ts
 * await deleteFromBucket("remote/file.txt", { project: "my-gcp-project", bucket: "my-bucket-name" });
 * ```
 *
 * @param destination - The destination path in the bucket to delete.
 * @param options - Optional settings including project ID, bucket name, and behavior options.
 * @param options.project - The Google Cloud project ID.
 * @param options.bucket - The bucket name.
 * @param options.try - If true, won't throw an error if the file doesn't exist. Default is false.
 */
export default async function deleteFromBucket(
  destination: string,
  options: {
    project?: string;
    bucket?: string;
    try?: boolean;
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
  const file = b.file(destination);

  if (options.try) {
    try {
      await file.delete();
    } catch (error) {
      // Ignore 404 errors (file doesn't exist)
      if (
        error instanceof Error && (
          error.message.includes("404") ||
          error.message.includes("No such object")
        )
      ) {
        return;
      }
      throw error;
    }
  } else {
    await file.delete();
  }
}
