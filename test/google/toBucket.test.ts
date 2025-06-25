import "@std/dotenv/load";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import toBucket from "../../src/google/toBucket.ts";
import inBucket from "../../src/google/inBucket.ts";
import deleteFromBucket from "../../src/google/deleteFromBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");
const testDataFile = "test/data/data.json";
const testDestination = "journalism-tests/test-file.json";

if (typeof bucketKey === "string") {
  Deno.test("should upload a file when it does not exist", async () => {
    // Ensure file doesn't exist before test
    const existsBefore = await inBucket(testDestination);
    if (existsBefore) {
      await deleteFromBucket(testDestination);
    }

    // Upload the file
    const result = await toBucket(testDataFile, testDestination);

    // Verify upload was successful and returns URI
    assertEquals(typeof result, "string");
    assertEquals(result?.startsWith("gs://"), true);
    assertEquals(result?.includes(testDestination), true);

    // Verify file now exists
    const existsAfter = await inBucket(testDestination);
    assertEquals(existsAfter, true);
  });

  Deno.test("should throw if file exists and overwrite is false", async () => {
    // Try to upload without overwrite - should throw
    await assertRejects(
      () => toBucket(testDataFile, testDestination),
      Error,
      "already exists",
    );
  });

  Deno.test("should overwrite file when overwrite option is true", async () => {
    // Then overwrite it
    const result = await toBucket(testDataFile, testDestination, {
      overwrite: true,
    });

    // Should return the URI, not null
    assertEquals(typeof result, "string");
    assertEquals(result.startsWith("gs://"), true);
    assertEquals(result.includes(testDestination), true);
  });

  Deno.test("should skip upload when skip option is true and file exists", async () => {
    // Then try to upload with skip option
    const result = await toBucket(testDataFile, testDestination, {
      skip: true,
    });

    // Should return URI when skipped
    assertEquals(typeof result, "string");
    assertEquals(result.startsWith("gs://"), true);
    assertEquals(result.includes(testDestination), true);
  });

  Deno.test("should upload when skip option is true but file does not exist", async () => {
    // Ensure file doesn't exist before test
    const existsBefore = await inBucket(testDestination);
    if (existsBefore) {
      await deleteFromBucket(testDestination);
    }

    // Try to upload a file that doesn't exist with skip option
    const result = await toBucket(testDataFile, testDestination, {
      skip: true,
    });

    // Should upload successfully and return URI
    assertEquals(typeof result, "string");
    assertEquals(result.startsWith("gs://"), true);
    assertEquals(result.includes(testDestination), true);

    // File should now exist
    const existsAfter = await inBucket(testDestination);
    assertEquals(existsAfter, true);
  });

  Deno.test("should throw error when both skip and overwrite are true", async () => {
    await assertRejects(
      () =>
        toBucket(
          testDataFile,
          testDestination,
          { skip: true, overwrite: true },
        ),
      Error,
      "Cannot use both 'skip' and 'overwrite' options",
    );
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
