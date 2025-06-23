import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import toBucket from "../../src/google/toBucket.ts";
import inBucket from "../../src/google/inBucket.ts";
import deleteFromBucket from "../../src/google/deleteFromBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");

if (typeof bucketKey === "string") {
  Deno.test("deleteFromBucket deletes a file from the bucket", async () => {
    await toBucket(
      "test/data/data.json",
      "journalism-tests/delete-test.json",
    );
    // Ensure it exists
    let exists = await inBucket("journalism-tests/delete-test.json");
    assertEquals(exists, true);
    // Delete it
    await deleteFromBucket("journalism-tests/delete-test.json");
    // Ensure it no longer exists
    exists = await inBucket("journalism-tests/delete-test.json");
    assertEquals(exists, false);
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
