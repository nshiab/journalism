import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import { existsSync } from "jsr:@std/fs";
import toBucket from "../../src/google/toBucket.ts";
import downloadFromBucket from "../../src/google/downloadFromBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");
const testDataFile = "test/data/data.json";
const testDestination = "journalism-tests/test-file.json";
const localDestination = "test/output/downloaded-file.json";

if (typeof bucketKey === "string") {
  Deno.test("should download a file from a bucket", async () => {
    await toBucket(testDataFile, testDestination, { overwrite: true });

    if (existsSync(localDestination)) {
      await Deno.remove(localDestination);
    }

    await downloadFromBucket(testDestination, localDestination);

    assertEquals(existsSync(localDestination), true);
  });
}
