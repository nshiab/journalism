import { assertEquals } from "jsr:@std/assert";
import prettyDuration from "../../src/format/prettyDuration.ts";

Deno.test("should return a string with a number of ms", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-01T17:00:00.015"),
    log: true,
  });
  assertEquals(duration, "15 ms");
});
Deno.test("should return a string with a number of seconds", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-01T17:00:15"),
  });
  assertEquals(duration, "15 sec, 0 ms");
});
Deno.test("should return a string with a number of seconds and minutes", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-01T17:03:15"),
  });
  assertEquals(duration, "3 min, 15 sec, 0 ms");
});
Deno.test("should return a string with a number of seconds, minutes, and hours", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-01T23:03:15"),
  });
  assertEquals(duration, "6 h, 3 min, 15 sec, 0 ms");
});
Deno.test("should return a string with a number of seconds, minutes, hours, and days (singular)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-02T23:03:15"),
  });
  assertEquals(duration, "1 day, 6 h, 3 min, 15 sec, 0 ms");
});
Deno.test("should return a string with a number of seconds, minutes, hours, and days (plural)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-23T23:03:15"),
  });
  assertEquals(duration, "22 days, 6 h, 3 min, 15 sec, 0 ms");
});
Deno.test("should return a string with a number of seconds, minutes, hours, days, and months (singular)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-02-02T23:03:15"),
  });
  assertEquals(
    duration,
    "1 month, 2 days, 6 h, 3 min, 15 sec, 0 ms",
  );
});
Deno.test("should return a string with a number of seconds, minutes, hours, days, and months (plural)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-06-23T23:03:15"),
  });
  assertEquals(
    duration,
    "5 months, 24 days, 5 h, 3 min, 15 sec, 0 ms",
  );
});
Deno.test("should return a string with a number of seconds, minutes, hours, days, months, and years (singular)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2025-02-02T23:03:15"),
  });
  assertEquals(
    duration,
    "1 year, 1 month, 8 days, 6 h, 3 min, 15 sec, 0 ms",
  );
});
Deno.test("should return a string with a number of seconds, minutes, hours, days, months, and year (plural)", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2034-06-23T23:03:15"),
  });
  assertEquals(
    duration,
    "10 years, 5 months, 16 days, 5 h, 3 min, 15 sec, 0 ms",
  );
});
Deno.test("should return a string with a number of seconds, minutes, hours, and days. It should also add a prefix.", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-23T23:03:15"),
    prefix: "Total duration: ",
  });
  assertEquals(
    duration,
    "Total duration: 22 days, 6 h, 3 min, 15 sec, 0 ms",
  );
});
Deno.test("should return a string with a number of seconds, minutes, hours, and days. It should also add a suffix.", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-23T23:03:15"),
    suffix: " (test)",
  });
  assertEquals(duration, "22 days, 6 h, 3 min, 15 sec, 0 ms (test)");
});
Deno.test("should return a string with a number of seconds, minutes, hours, and days. It should also add a prefix and a suffix.", () => {
  const duration = prettyDuration(new Date("2024-01-01T17:00:00"), {
    end: new Date("2024-01-23T23:03:15"),
    prefix: "Total duration: ",
    suffix: " (test)",
  });
  assertEquals(
    duration,
    "Total duration: 22 days, 6 h, 3 min, 15 sec, 0 ms (test)",
  );
});
