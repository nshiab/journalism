import { Storage, type UploadOptions } from "@google-cloud/storage";
import process from "node:process";

/**
 * Uploads a file to a Google Cloud Storage bucket. This function expects the project ID and bucket name to be set either through environment variables (BUCKET_PROJECT and BUCKET_NAME) or passed as options.
 *
 * @example
 * Basic usage:
 * ```ts
 * // Upload a file using environment variables for project and bucket
 * await toBucket("./local/file.txt", "remote/file.txt");
 * ```
 *
 * @example
 * Using explicit options:
 * ```ts
 * await toBucket("./local/file.txt", "remote/file.txt", {
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
 * @param options - Optional settings including project ID, bucket name, and metadata.
 */
export default async function toBucket(
  file: string,
  destination: string,
  options: {
    project?: string;
    bucket?: string;
    metadata?: UploadOptions["metadata"];
    overwrite?: boolean;
  } = {},
) {
  const projectId = options.project ?? process.env.BUCKET_PROJECT;
  const bucketName = options.bucket ?? process.env.BUCKET_NAME;

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
  if (exists && !options.overwrite) {
    throw new Error(
      `File '${destination}' already exists in bucket '${bucketName}'. Set overwrite: true to replace it.`,
    );
  }

  return await b.upload(file, {
    destination,
    metadata: options.metadata,
  });
}
