[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / downloadFromBucket

# Function: downloadFromBucket()

> **downloadFromBucket**(`source`, `destination`, `options?`): `Promise`\<`void`\>

Downloads a file from a Google Cloud Storage (GCS) bucket to a specified local path. This function provides robust handling for existing local files, allowing you to skip downloads or overwrite files as needed.

The function requires the Google Cloud project ID and the target bucket name. These can be provided either through environment variables (`BUCKET_PROJECT` and `BUCKET_NAME`) or directly as parameters in the `options` object. Parameters passed in `options` will take precedence over environment variables.

By default, if a local file with the same name already exists at the `destination` path, the function will throw an error to prevent accidental overwrites. You can modify this behavior using the `skip` or `overwrite` options.

## Parameters

### source

`string`

The path to the file within the GCS bucket (e.g., 'my-folder/document.pdf').

### destination

`string`

The local file path where the downloaded file will be saved (e.g., './downloads/document.pdf').

### options?

Optional configuration for the download operation.

#### bucket?

`string`

The name of the Google Cloud Storage bucket. If not provided, it defaults to the `BUCKET_NAME` environment variable.

#### overwrite?

`boolean`

If `true`, an existing local file at the `destination` path will be overwritten. Cannot be used with `skip`. Defaults to `false`.

#### project?

`string`

The Google Cloud project ID. If not provided, it defaults to the `BUCKET_PROJECT` environment variable.

#### skip?

`boolean`

If `true`, the download will be skipped if a local file already exists at the `destination` path. Cannot be used with `overwrite`. Defaults to `false`.

## Returns

`Promise`\<`void`\>

## Examples

```ts
import { downloadFromBucket } from "@nshiab/journalism-google";

// Basic usage: Download a file.
await downloadFromBucket("reports/annual-report.pdf", "./local-reports/annual-report.pdf");
console.log("File downloaded successfully!");
```

```ts
// Skip download if the file already exists locally.
await downloadFromBucket("images/profile.jpg", "./local-images/profile.jpg", { skip: true });
console.log("Download skipped if file exists, or downloaded otherwise.");
```

```ts
// Overwrite an existing local file.
await downloadFromBucket("data/latest-data.csv", "./local-data/latest-data.csv", { overwrite: true });
console.log("File downloaded and overwritten if it existed.");
```

```ts
// Specify project and bucket explicitly.
await downloadFromBucket("configs/app-settings.json", "./local-configs/settings.json", {
  project: "my-gcp-project",
  bucket: "my-config-bucket"
});
```
