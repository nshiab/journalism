[**Journalism v3.1.2**](../index.md)

***

[Journalism](../globals.md) / toBucket

# Function: toBucket()

> **toBucket**(`file`, `destination`, `options?`): `Promise`\<`string`\>

Uploads a local file to a Google Cloud Storage (GCS) bucket and returns the URI of the uploaded file. This function provides robust control over the upload process, including options for skipping uploads if the file already exists, overwriting existing files, and setting custom metadata.

By default, if a file with the same destination path already exists in the bucket, an error will be thrown to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.

Authentication and bucket identification can be configured either through environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and `BUCKET_NAME` for the bucket name) or by passing them directly as options to the function. Options provided directly will take precedence over environment variables.

## Parameters

### file

`string`

The absolute or relative path to the local file that you want to upload.

### destination

`string`

The desired path and filename for the file within the GCS bucket (e.g., `"my-folder/my-uploaded-file.txt"`).

### options?

Optional settings to customize the upload behavior.

#### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

#### metadata?

\{\[`key`: `string`\]: `unknown`; \}

An object containing custom metadata to be associated with the uploaded file (e.g., `contentType`, `cacheControl`). This is passed directly to the GCS upload options.

#### overwrite?

`boolean`

If `true`, an existing file at the `destination` path in the bucket will be overwritten. Cannot be used with `skip: true`. Defaults to `false`.

#### project?

`string`

Your Google Cloud Project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

#### skip?

`boolean`

If `true`, the upload will be skipped if a file with the same `destination` path already exists in the bucket. If the local file does not exist but the remote file does, the URI of the remote file will be returned without an error. Cannot be used with `overwrite: true`. Defaults to `false`.

## Returns

`Promise`\<`string`\>

A Promise that resolves to the Google Cloud Storage URI of the uploaded file (e.g., `"gs://your-bucket-name/your-file-path.txt"`).

## Examples

```ts
import { toBucket } from "@nshiab/journalism-google";

// Upload a file using environment variables for project and bucket.
// Assuming `BUCKET_PROJECT` and `BUCKET_NAME` are set in your environment.
const uri = await toBucket("./local/file.txt", "remote/file.txt");
console.log(uri); // "gs://my-bucket/remote/file.txt"
```

```ts
// Skip upload if the file already exists in the bucket.
const uriSkip = await toBucket("./local/file.txt", "remote/file.txt", {
  skip: true
});
console.log(uriSkip); // Returns URI whether file was uploaded or already existed
```

```ts
// If the local file doesn't exist but the remote file does, the URI is returned without error.
// (Assuming "./non-existent.txt" does not exist locally, but "remote/file.txt" exists in the bucket)
const uriNonExistentLocal = await toBucket("./non-existent.txt", "remote/file.txt", {
  skip: true
});
console.log(uriNonExistentLocal); // "gs://my-bucket/remote/file.txt"
```

```ts
// Overwrite an existing file in the bucket.
const uriOverwrite = await toBucket("./local/file.txt", "remote/file.txt", {
  overwrite: true
});
console.log(uriOverwrite); // "gs://my-bucket/remote/file.txt"
```

```ts
// Upload a file with specified project, bucket, and custom metadata.
const uriExplicit = await toBucket("./local/file.txt", "remote/file.txt", {
  project: "my-gcp-project",
  bucket: "my-bucket-name",
  metadata: {
    contentType: "text/plain",
    cacheControl: "public, max-age=3600"
  }
});
console.log(uriExplicit);
```
