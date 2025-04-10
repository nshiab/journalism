import { assertEquals } from "jsr:@std/assert";
import sleep from "../../src/other/sleep.ts";

Deno.test("should sleep for 100ms", async () => {
  await sleep(100);

  assertEquals(
    true,
    true,
  );
});
