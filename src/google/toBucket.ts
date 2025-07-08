import { Storage, type UploadOptions } from "@google-cloud/storage";
import process from "node:process";
import { existsSync } from "node:fs";

/**
 * Uploads a local file to a Google Cloud Storage (GCS) bucket and returns the URI of the uploaded file. This function provides robust control over the upload process, including options for skipping uploads if the file already exists, overwriting existing files, and setting custom metadata.
 *
 * By default, if a file with the same destination path already exists in the bucket, an error will be thrown to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.
 *
 * Authentication and bucket identification can be configured either through environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and `BUCKET_NAME` for the bucket name) or by passing them directly as options to the function. Options provided directly will take precedence over environment variables.
 *
 * @param file - The absolute or relative path to the local file that you want to upload.
 * @param destination - The desired path and filename for the file within the GCS bucket (e.g., `"my-folder/my-uploaded-file.txt"`).
 * @param options - Optional settings to customize the upload behavior.
 *   @param options.project - Your Google Cloud Project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.
 *   @param options.bucket - The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.
 *   @param options.metadata - An object containing custom metadata to be associated with the uploaded file (e.g., `contentType`, `cacheControl`). This is passed directly to the GCS upload options.
 *   @param options.overwrite - If `true`, an existing file at the `destination` path in the bucket will be overwritten. Cannot be used with `skip: true`. Defaults to `false`.
 *   @param options.skip - If `true`, the upload will be skipped if a file with the same `destination` path already exists in the bucket. If the local file does not exist but the remote file does, the URI of the remote file will be returned without an error. Cannot be used with `overwrite: true`. Defaults to `false`.
 * @returns A Promise that resolves to the Google Cloud Storage URI of the uploaded file (e.g., `"gs://your-bucket-name/your-file-path.txt"`).
 *
 * @example
 * // -- Basic Usage --
 *
 * // Upload a file using environment variables for project and bucket.
 * // Assuming `BUCKET_PROJECT` and `BUCKET_NAME` are set in your environment.
 * const uri = await toBucket("./local/file.txt", "remote/file.txt");
 * console.log(uri); // "gs://my-bucket/remote/file.txt"
 *
 * @example
 * // -- Skip Upload if File Exists --
 *
 * // Skip upload if the file already exists in the bucket.
 * const uriSkip = await toBucket("./local/file.txt", "remote/file.txt", {
 *   skip: true
 * });
 * console.log(uriSkip); // Returns URI whether file was uploaded or already existed
 *
 * @example
 * // -- Skip with Non-Existent Local File --
 *
 * // If the local file doesn't exist but the remote file does, the URI is returned without error.
 * // (Assuming "./non-existent.txt" does not exist locally, but "remote/file.txt" exists in the bucket)
 * const uriNonExistentLocal = await toBucket("./non-existent.txt", "remote/file.txt", {
 *   skip: true
 * });
 * console.log(uriNonExistentLocal); // "gs://my-bucket/remote/file.txt"
 *
 * @example
 * // -- Overwrite Existing File --
 *
 * // Overwrite an existing file in the bucket.
 * const uriOverwrite = await toBucket("./local/file.txt", "remote/file.txt", {
 *   overwrite: true
 * });
 * console.log(uriOverwrite); // "gs://my-bucket/remote/file.txt"
 *
 * @example
 * // -- Using Explicit Options and Metadata --
 *
 * // Upload a file with specified project, bucket, and custom metadata.
 * const uriExplicit = await toBucket("./local/file.txt", "remote/file.txt", {
 *   project: "my-gcp-project",
 *   bucket: "my-bucket-name",
 *   metadata: {
 *     contentType: "text/plain",
 *     cacheControl: "public, max-age=3600"
 *   }
 * });
 * console.log(uriExplicit);
 *
 * @category Google
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
