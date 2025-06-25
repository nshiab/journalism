import "@std/dotenv/load";
import { assertArrayIncludes, assertEquals } from "jsr:@std/assert";
import toBucket from "../../src/google/toBucket.ts";
import filesInBucket from "../../src/google/filesInBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");

if (typeof bucketKey === "string") {
  Deno.test("filesInBucket lists uploaded files in a folder", async () => {
    await toBucket(
      "test/data/data.json",
      "journalism-tests/list-test/data.json",
      { overwrite: true },
    );
    const files = await filesInBucket({
      folder: "journalism-tests/list-test/",
    });
    assertArrayIncludes(files, ["journalism-tests/list-test/data.json"]);
  });

  Deno.test("filesInBucket lists all files in the bucket", async () => {
    const files = await filesInBucket();
    if (files.length === 0) throw new Error("No files found in bucket");
  });

  Deno.test("filesInBucket returns Google Storage URIs when URI is true", async () => {
    const uris = await filesInBucket({
      folder: "journalism-tests/list-test/",
      URI: true,
    });
    assertEquals(
      uris,
      ["gs://nael_test_bucket/journalism-tests/list-test/data.json"],
    );
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
