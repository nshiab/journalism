import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Deletes a specified file from a Google Cloud Storage (GCS) bucket.
 *
 * The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.
 *
 * By default, if the specified file does not exist in the bucket, the function will throw an error. However, you can suppress this behavior by setting the `try` option to `true`, which will cause the function to complete silently if the file is not found.
 *
 * @param destination The full path to the file within the bucket (e.g., 'my-folder/my-file.txt').
 * @param options Optional configuration for the deletion operation.
 * @param options.project The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.
 * @param options.bucket The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.
 * @param options.try If `true`, the function will not throw an error if the file to be deleted does not exist. Defaults to `false`.
 *
 * @example
 * ```ts
 * // Basic usage: Delete a file from the bucket.
 * await deleteFromBucket("path/to/your/file.txt");
 * ```
 * @example
 * ```ts
 * // Delete a file, suppressing errors if it doesn't exist.
 * await deleteFromBucket("path/to/non-existent-file.txt", { try: true });
 * ```
 * @example
 * ```ts
 * // Explicitly specify project ID and bucket name.
 * await deleteFromBucket("reports/2023-summary.pdf", {
 *   project: "my-gcp-project-id",
 *   bucket: "my-data-bucket"
 * });
 * ```
 * @category Google
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
