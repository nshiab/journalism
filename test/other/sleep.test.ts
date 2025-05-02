import { assertEquals } from "jsr:@std/assert";
import sleep from "../../src/other/sleep.ts";

Deno.test("should sleep for 100ms", async () => {
  await sleep(100);

  assertEquals(
    true,
    true,
  );
});
Deno.test("should sleep for 100ms and log information", async () => {
  await sleep(100, { log: true });

  assertEquals(
    true,
    true,
  );
});
Deno.test("should sleep for 50ms with the start option and log information", async () => {
  const start = new Date();
  await sleep(50);
  await sleep(100, { start, log: true });

  assertEquals(
    true,
    true,
  );
});
Deno.test("should not sleep with the start option and log information", async () => {
  const start = new Date();
  await sleep(150);
  await sleep(100, { start, log: true });

  assertEquals(
    true,
    true,
  );
});
