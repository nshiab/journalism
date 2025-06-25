import "@std/dotenv/load";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import toBucket from "../../src/google/toBucket.ts";
import inBucket from "../../src/google/inBucket.ts";
import deleteFromBucket from "../../src/google/deleteFromBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");
const testDataFile = "test/data/data.json";
const testDestination = "journalism-tests/delete-test-file.json";

if (typeof bucketKey === "string") {
  Deno.test("deleteFromBucket deletes a file from the bucket", async () => {
    // Upload a file first
    await toBucket(testDataFile, testDestination, { skip: true });

    // Ensure it exists
    let exists = await inBucket(testDestination);
    assertEquals(exists, true);

    // Delete it
    await deleteFromBucket(testDestination);

    // Ensure it no longer exists
    exists = await inBucket(testDestination);
    assertEquals(exists, false);
  });

  Deno.test("deleteFromBucket throws error when file doesn't exist", async () => {
    const nonExistentFile = "journalism-tests/non-existent-file.json";

    // Ensure file doesn't exist
    const exists = await inBucket(nonExistentFile);
    assertEquals(exists, false);

    // Try to delete non-existent file - should throw
    await assertRejects(
      () => deleteFromBucket(nonExistentFile),
      Error,
    );
  });

  Deno.test("deleteFromBucket with try option doesn't throw when file doesn't exist", async () => {
    const nonExistentFile = "journalism-tests/try-delete-test.json";

    // Ensure file doesn't exist
    const exists = await inBucket(nonExistentFile);
    assertEquals(exists, false);

    // Delete with try option - should not throw
    await deleteFromBucket(nonExistentFile, { try: true });

    // Still shouldn't exist
    const stillExists = await inBucket(nonExistentFile);
    assertEquals(stillExists, false);
  });

  Deno.test("deleteFromBucket with try option deletes existing file", async () => {
    // Upload a file first
    await toBucket(testDataFile, testDestination);

    // Ensure it exists
    let exists = await inBucket(testDestination);
    assertEquals(exists, true);

    // Delete with try option
    await deleteFromBucket(testDestination, { try: true });

    // Ensure it no longer exists
    exists = await inBucket(testDestination);
    assertEquals(exists, false);
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
