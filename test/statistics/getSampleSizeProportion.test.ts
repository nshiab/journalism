import getSampleSizeProportion from "../../src/statistics/getSampleSizeProportion.ts";
import { assertEquals } from "jsr:@std/assert";

// Compared with https://www.surveymonkey.com/mp/sample-size-calculator/

const data = new Array(1000).fill(0);

Deno.test("Return the sample size for a proportion with 90% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 90, 5);
  assertEquals(sampleSize, 214);
});
Deno.test("Return the sample size for a proportion with 95% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 95, 5);
  assertEquals(sampleSize, 278);
});
Deno.test("Return the sample size for a proportion with 99% confidence and 5% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 99, 5);
  assertEquals(sampleSize, 400);
});
Deno.test("Return the sample size for a proportion with 90% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 90, 3);
  assertEquals(sampleSize, 430);
});
Deno.test("Return the sample size for a proportion with 95% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 95, 3);
  assertEquals(sampleSize, 517);
});
Deno.test("Return the sample size for a proportion with 99% confidence and 3% margin of error", () => {
  const sampleSize = getSampleSizeProportion(data, 99, 3);
  assertEquals(sampleSize, 649);
});
Deno.test("Return the sample size for the doc example", () => {
  const sampleSize = getSampleSizeProportion(new Array(50000).fill(0), 95, 4);
  assertEquals(sampleSize, 594);
});
