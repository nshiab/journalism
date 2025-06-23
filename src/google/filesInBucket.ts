import { Storage } from "@google-cloud/storage";
import process from "node:process";

/**
 * Lists all files in a Google Cloud Storage bucket or in a specific folder within the bucket. Optionally returns Google Storage URIs for each file.
 *
 * @example
 * Basic usage (all files in the bucket):
 * ```ts
 * const files = await filesInBucket();
 * ```
 *
 * @example
 * Using a specific folder:
 * ```ts
 * const files = await filesInBucket({ folder: "my-folder/" });
 * ```
 *
 * @example
 * Get Google Storage URIs:
 * ```ts
 * const uris = await filesInBucket({ folder: "my-folder/", URI: true });
 * ```
 *
 * @param options - (Optional) folder (path), project, bucket, URI (boolean).
 * @returns An array of file paths or Google Storage URIs in the bucket or folder.
 */
export default async function filesInBucket(
  options: {
    folder?: string;
    project?: string;
    bucket?: string;
    URI?: boolean;
  } = {},
): Promise<string[]> {
  const projectId = options.project ?? process.env.BUCKET_PROJECT;
  const bucketName = options.bucket ?? process.env.BUCKET_NAME;
  const folder = options.folder;
  const URI = options.URI ?? false;

  if (!projectId || !bucketName) {
    throw new Error(
      "Project ID and bucket name must be provided. Make sure to set BUCKET_PROJECT and BUCKET_NAME environment variables or pass them in options.",
    );
  }

  const s = new Storage({ projectId });
  const b = s.bucket(bucketName);
  const [files] = await b.getFiles({ prefix: folder });

  if (URI) {
    return files.map((file) => `gs://${bucketName}/${file.name}`);
  }

  // Default: return file paths
  return files.map((file) => file.name);
}
