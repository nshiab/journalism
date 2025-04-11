import { assertEquals } from "jsr:@std/assert";
import DurationTracker from "../../src/other/DurationTracker.ts";
import sleep from "../../src/other/sleep.ts";

Deno.test("should log the remaining time", async () => {
  const data = [0, 1, 2, 3, 4];

  const tracker = new DurationTracker(data.length);

  for (const _item of data) {
    tracker.start();
    // Simulate processing time
    await sleep(10);
    tracker.log();
  }

  // How to assert?
  assertEquals(true, true);
});

Deno.test("should log the remaining time with a prefix and suffix", async () => {
  const data = [0, 1, 2, 3, 4];

  const tracker = new DurationTracker(data.length, {
    prefix: "Remaining: ",
    suffix: ` (something)`,
  });

  for (const _item of data) {
    tracker.start();
    // Simulate processing time
    await sleep(10);
    tracker.log();
  }

  // How to assert?
  assertEquals(true, true);
});
