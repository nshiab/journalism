[**Journalism v4.0.1**](../index.md)

***

[Journalism](../globals.md) / deleteFromBucket

# Function: deleteFromBucket()

> **deleteFromBucket**(`destination`, `options?`): `Promise`\<`void`\>

Deletes a specified file from a Google Cloud Storage (GCS) bucket.

The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

By default, if the specified file does not exist in the bucket, the function will throw an error. However, you can suppress this behavior by setting the `try` option to `true`, which will cause the function to complete silently if the file is not found.

## Parameters

### destination

`string`

The full path to the file within the bucket (e.g., 'my-folder/my-file.txt').

### options?

Optional configuration for the deletion operation.

#### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

#### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

#### try?

`boolean`

If `true`, the function will not throw an error if the file to be deleted does not exist. Defaults to `false`.

## Returns

`Promise`\<`void`\>

## Examples

```ts
import { deleteFromBucket } from "@nshiab/journalism-google";

// Basic usage: Delete a file from the bucket.
await deleteFromBucket("path/to/your/file.txt");
```

```ts
// Delete a file, suppressing errors if it doesn't exist.
await deleteFromBucket("path/to/non-existent-file.txt", { try: true });
```

```ts
// Explicitly specify project ID and bucket name.
await deleteFromBucket("reports/2023-summary.pdf", {
  project: "my-gcp-project-id",
  bucket: "my-data-bucket"
});
```
