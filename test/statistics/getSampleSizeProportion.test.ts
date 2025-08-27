import getSampleSizeProportion from "../../src/statistics/getSampleSizeProportion.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert";

// Compared with https://www.surveymonkey.com/mp/sample-size-calculator/
// and scipy (python)

const populationSize = 1000;

Deno.test("Return the sample size for a proportion with 90% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 90, 5);
  assertEquals(sampleSize, 214);
});
Deno.test("Return the sample size for a proportion with 95% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 95, 5);
  assertEquals(sampleSize, 278);
});
Deno.test("Return the sample size for a proportion with 99% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 99, 5);
  assertEquals(sampleSize, 400);
});
Deno.test("Return the sample size for a proportion with 90% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 90, 3);
  assertEquals(sampleSize, 430);
});
Deno.test("Return the sample size for a proportion with 95% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 95, 3);
  assertEquals(sampleSize, 517);
});
Deno.test("Return the sample size for a proportion with 99% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(populationSize, 99, 3);
  assertEquals(sampleSize, 649);
});
Deno.test("Return the sample size for the doc example", () => {
  const sampleSize = getSampleSizeProportion(50000, 95, 4);
  assertEquals(sampleSize, 594);
});

Deno.test("Throw error for population size of 0", () => {
  assertThrows(
    () => getSampleSizeProportion(0, 95, 5),
    Error,
    "Population size must be greater than 0.",
  );
});

Deno.test("Throw error for negative population size", () => {
  assertThrows(
    () => getSampleSizeProportion(-10, 95, 5),
    Error,
    "Population size must be greater than 0.",
  );
});

Deno.test("Throw error for invalid confidence level", () => {
  assertThrows(
    () => getSampleSizeProportion(1000, 85 as any, 5),
    Error,
    "Invalid confidence level. Use 90, 95, or 99.",
  );
});

Deno.test("Throw error for invalid margin of error (too low)", () => {
  assertThrows(
    () => getSampleSizeProportion(1000, 95, 0.5),
    Error,
    "Invalid margin of error. Use a value between 1 and 100.",
  );
});

Deno.test("Throw error for invalid margin of error (too high)", () => {
  assertThrows(
    () => getSampleSizeProportion(1000, 95, 101),
    Error,
    "Invalid margin of error. Use a value between 1 and 100.",
  );
});
