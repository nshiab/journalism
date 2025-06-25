import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import inBucket from "../../src/google/inBucket.ts";
import toBucket from "../../src/google/toBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");

if (typeof bucketKey === "string") {
  Deno.test("inBucket returns true for an uploaded file", async () => {
    // Upload a file first
    await toBucket(
      "test/data/data.json",
      "journalism-tests/data.json",
      { skip: true },
    );
    // Check if it exists
    const exists = await inBucket("journalism-tests/data.json");
    assertEquals(exists, true);
  });

  Deno.test("inBucket returns false for a non-existent file", async () => {
    const exists = await inBucket(
      "journalism-tests/this-file-should-not-exist.json",
    );
    assertEquals(exists, false);
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
