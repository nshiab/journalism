import getSampleSizeMean from "../../src/statistics/getSampleSizeMean.ts";
import { assertEquals } from "jsr:@std/assert";

// Compared with https://select-statistics.co.uk/calculators/sample-size-calculator-population-mean/

// List of 100 random student grades (0-100)
const grades = [
  { grade: 87 },
  { grade: 92 },
  { grade: 78 },
  { grade: 95 },
  { grade: 83 },
  { grade: 71 },
  { grade: 89 },
  { grade: 76 },
  { grade: 94 },
  { grade: 82 },
  { grade: 88 },
  { grade: 73 },
  { grade: 91 },
  { grade: 85 },
  { grade: 79 },
  { grade: 96 },
  { grade: 84 },
  { grade: 77 },
  { grade: 90 },
  { grade: 86 },
  { grade: 72 },
  { grade: 93 },
  { grade: 81 },
  { grade: 75 },
  { grade: 97 },
  { grade: 80 },
  { grade: 74 },
  { grade: 92 },
  { grade: 86 },
  { grade: 78 },
  { grade: 89 },
  { grade: 84 },
  { grade: 77 },
  { grade: 95 },
  { grade: 82 },
  { grade: 88 },
  { grade: 73 },
  { grade: 91 },
  { grade: 85 },
  { grade: 79 },
  { grade: 96 },
  { grade: 83 },
  { grade: 76 },
  { grade: 90 },
  { grade: 87 },
  { grade: 81 },
  { grade: 74 },
  { grade: 92 },
  { grade: 85 },
  { grade: 78 },
  { grade: 94 },
  { grade: 80 },
  { grade: 86 },
  { grade: 72 },
  { grade: 89 },
  { grade: 83 },
  { grade: 77 },
  { grade: 95 },
  { grade: 84 },
  { grade: 76 },
  { grade: 91 },
  { grade: 88 },
  { grade: 75 },
  { grade: 93 },
  { grade: 82 },
  { grade: 79 },
  { grade: 96 },
  { grade: 85 },
  { grade: 73 },
  { grade: 90 },
  { grade: 87 },
  { grade: 81 },
  { grade: 74 },
  { grade: 92 },
  { grade: 86 },
  { grade: 78 },
  { grade: 89 },
  { grade: 84 },
  { grade: 77 },
  { grade: 95 },
  { grade: 83 },
  { grade: 76 },
  { grade: 91 },
  { grade: 88 },
  { grade: 72 },
  { grade: 94 },
  { grade: 85 },
  { grade: 79 },
  { grade: 96 },
  { grade: 82 },
  { grade: 75 },
  { grade: 90 },
  { grade: 87 },
  { grade: 81 },
  { grade: 74 },
  { grade: 93 },
  { grade: 86 },
  { grade: 78 },
  { grade: 89 },
  { grade: 95 },
];

Deno.test("should calculate the sample size for a mean with 90% confidence and error of margin of 3", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 90, 3);
  assertEquals(sampleSize, 14);
});
Deno.test("should calculate the sample size for a mean with 95% confidence and error of margin of 3", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 95, 3);
  assertEquals(sampleSize, 19);
});
Deno.test("should calculate the sample size for a mean with 99% confidence and error of margin of 3", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 99, 3);
  assertEquals(sampleSize, 28);
});
Deno.test("should calculate the sample size for a mean with 90% confidence and error of margin of 2", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 90, 2);
  assertEquals(sampleSize, 27);
});
Deno.test("should calculate the sample size for a mean with 95% confidence and error of margin of 2", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 95, 2);
  assertEquals(sampleSize, 34);
});
Deno.test("should calculate the sample size for a mean with 99% confidence and error of margin of 2", () => {
  const sampleSize = getSampleSizeMean(grades, "grade", 99, 2);
  assertEquals(sampleSize, 47);
});
