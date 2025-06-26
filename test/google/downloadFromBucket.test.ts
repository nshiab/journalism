import "@std/dotenv/load";
import { assertEquals, assertRejects } from "jsr:@std/assert";
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

  Deno.test("should throw error when file exists and no options are set", async () => {
    await toBucket(testDataFile, testDestination, { overwrite: true });

    // Ensure local file exists
    if (!existsSync(localDestination)) {
      await downloadFromBucket(testDestination, localDestination);
    }

    await assertRejects(
      () => downloadFromBucket(testDestination, localDestination),
      Error,
      "Local file",
    );
  });

  Deno.test("should skip download when file exists and skip option is true", async () => {
    // Ensure local file exists
    if (!existsSync(localDestination)) {
      await downloadFromBucket(testDestination, localDestination);
    }

    // This should not throw an error and should return without downloading
    await downloadFromBucket(testDestination, localDestination, { skip: true });

    assertEquals(existsSync(localDestination), true);
  });

  Deno.test("should overwrite file when exists and overwrite option is true", async () => {
    // Ensure local file exists
    if (!existsSync(localDestination)) {
      await downloadFromBucket(testDestination, localDestination);
    }

    // This should overwrite the existing file without error
    await downloadFromBucket(testDestination, localDestination, {
      overwrite: true,
    });

    assertEquals(existsSync(localDestination), true);
  });

  Deno.test("should throw error when both skip and overwrite options are true", async () => {
    await assertRejects(
      () =>
        downloadFromBucket(testDestination, localDestination, {
          skip: true,
          overwrite: true,
        }),
      Error,
      "Cannot use both 'skip' and 'overwrite' options",
    );
  });
}
