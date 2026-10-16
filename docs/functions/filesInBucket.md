[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / filesInBucket

# Function: filesInBucket()

> **filesInBucket**(`options?`): `Promise`\<`string`[]\>

Lists files within a Google Cloud Storage (GCS) bucket. You can list all files in the bucket or narrow down the results to a specific folder. The function can also return the full Google Storage URIs for each file.

This function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

## Parameters

### options?

Optional configuration for listing files.

#### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

#### folder?

`string`

The path to a specific folder within the bucket (e.g., 'my-data/'). Only files within this folder will be listed.

#### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

#### URI?

`boolean`

If `true`, the function will return the full Google Storage URI (e.g., 'gs://your-bucket/path/to/file.txt') for each file. Defaults to `false`, returning just the file path within the bucket.

## Returns

`Promise`\<`string`[]\>

An array of strings, where each string is either the file path within the bucket or its full Google Storage URI, depending on the `URI` option.

## Examples

```ts
import { filesInBucket } from "@nshiab/journalism-google";

// List all files in the default bucket.
const allFiles = await filesInBucket();
console.log("All files:", allFiles);
```

```ts
// List files within a specific folder.
const folderFiles = await filesInBucket({ folder: "images/thumbnails/" });
console.log("Files in folder:", folderFiles);
```

```ts
// Get Google Storage URIs for files in a folder.
const fileURIs = await filesInBucket({ folder: "documents/", URI: true });
console.log("File URIs:", fileURIs);
```

```ts
// Explicitly specify project and bucket.
const specificBucketFiles = await filesInBucket({
  project: "my-gcp-project",
  bucket: "my-archive-bucket",
  folder: "old-data/"
});
console.log("Files from specific bucket:", specificBucketFiles);
```
