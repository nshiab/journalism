import "@std/dotenv/load";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import toBucket from "../../src/google/toBucket.ts";

const bucketKey = Deno.env.get("BUCKET_PROJECT");

if (typeof bucketKey === "string") {
  Deno.test("should upload a file when it does not exist", async () => {
    await toBucket(
      "test/data/data.json",
      "journalism-tests/data.json",
      { overwrite: true }, // Ensure clean state
    );
    assertEquals(true, true);
  });

  Deno.test("should throw if file exists and overwrite is false", async () => {
    await assertRejects(
      () =>
        toBucket(
          "test/data/data.json",
          "journalism-tests/data.json",
        ),
      Error,
      "already exists",
    );
  });
} else {
  console.log("No BUCKET_PROJECT in process.env");
}
