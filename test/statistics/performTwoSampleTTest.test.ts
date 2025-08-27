import { assertEquals, assertThrows } from "jsr:@std/assert";
import performTwoSampleTTest from "../../src/statistics/performTwoSampleTTest.ts";

// Tested with
// https://www.graphpad.com/quickcalcs/ttest2/

Deno.test("performTwoSampleTTest - basic two-tailed test", () => {
  const group1 = [
    { id: 1, value: 10 },
    { id: 2, value: 12 },
    { id: 3, value: 14 },
    { id: 4, value: 16 },
    { id: 5, value: 18 },
  ];

  const group2 = [
    { id: 1, value: 20 },
    { id: 2, value: 22 },
    { id: 3, value: 24 },
    { id: 4, value: 26 },
    { id: 5, value: 28 },
  ];

  const result = performTwoSampleTTest(group1, group2, "value");

  assertEquals(result, {
    group1SampleSize: 5,
    group2SampleSize: 5,
    group1Mean: 14,
    group2Mean: 24,
    group1StdDev: 3.1622776601683795,
    group2StdDev: 3.1622776601683795,
    group1Variance: 10,
    group2Variance: 10,
    meanDifference: -10,
    degreesOfFreedom: 8,
    tStatistic: -5,
    pValue: 0.0010528257934054874,
  });
});

Deno.test("performTwoSampleTTest - right-tailed test", () => {
  const group1 = [
    { score: 85 },
    { score: 90 },
    { score: 95 },
    { score: 88 },
    { score: 92 },
  ];

  const group2 = [
    { score: 78 },
    { score: 82 },
    { score: 80 },
    { score: 85 },
    { score: 79 },
  ];

  const result = performTwoSampleTTest(
    group1,
    group2,
    "score",
    { tail: "right-tailed" },
  );

  assertEquals(result, {
    group1SampleSize: 5,
    group2SampleSize: 5,
    group1Mean: 90,
    group2Mean: 80.8,
    group1StdDev: 3.8078865529319543,
    group2StdDev: 2.7748873851023212,
    group1Variance: 14.5,
    group2Variance: 7.699999999999999,
    meanDifference: 9.200000000000003,
    degreesOfFreedom: 7.313793871039548,
    tStatistic: 4.366126780461497,
    pValue: 0.001481704382465976,
  });
});

Deno.test("performTwoSampleTTest - left-tailed test", () => {
  const group1 = [
    { value: 15 },
    { value: 18 },
    { value: 20 },
    { value: 17 },
  ];

  const group2 = [
    { value: 25 },
    { value: 28 },
    { value: 30 },
    { value: 27 },
    { value: 26 },
  ];

  const result = performTwoSampleTTest(
    group1,
    group2,
    "value",
    { tail: "left-tailed" },
  );

  assertEquals(result, {
    group1SampleSize: 4,
    group2SampleSize: 5,
    group1Mean: 17.5,
    group2Mean: 27.2,
    group1StdDev: 2.0816659994661326,
    group2StdDev: 1.9235384061671346,
    group1Variance: 4.333333333333333,
    group2Variance: 3.7,
    meanDifference: -9.7,
    degreesOfFreedom: 6.295249249586221,
    tStatistic: -7.183543044794596,
    pValue: 0.00014783740286633591,
  });
});

Deno.test("performTwoSampleTTest - Welch's test (unequal variances)", () => {
  const group1 = [
    { measure: 100 },
    { measure: 102 },
    { measure: 101 },
    { measure: 99 },
    { measure: 103 },
  ];

  const group2 = [
    { measure: 110 },
    { measure: 120 },
    { measure: 105 },
    { measure: 115 },
    { measure: 125 },
    { measure: 108 },
  ];

  const result = performTwoSampleTTest(
    group1,
    group2,
    "measure",
  );

  assertEquals(result, {
    group1SampleSize: 5,
    group2SampleSize: 6,
    group1Mean: 101,
    group2Mean: 113.83333333333333,
    group1StdDev: 1.5811388300841898,
    group2StdDev: 7.626707459098367,
    group1Variance: 2.5,
    group2Variance: 58.166666666666664,
    meanDifference: -12.833333333333329,
    degreesOfFreedom: 5.510735970410618,
    tStatistic: -4.019367282483479,
    pValue: 0.008297784874405911,
  });
});

Deno.test("performTwoSampleTTest - similar groups (no significant difference)", () => {
  const group1 = [
    { score: 5 },
    { score: 7 },
    { score: 6 },
    { score: 8 },
  ];

  const group2 = [
    { score: 6 },
    { score: 8 },
    { score: 7 },
    { score: 9 },
  ];

  const result = performTwoSampleTTest(
    group1,
    group2,
    "score",
  );

  assertEquals(result.group1SampleSize, 4);
  assertEquals(result.group2SampleSize, 4);

  // Small difference, should not be significant
  assertEquals(result.pValue > 0.05, true);
});

Deno.test("performTwoSampleTTest - very similar values", () => {
  const group1 = [
    { val: 10.1 },
    { val: 10.2 },
    { val: 9.9 },
    { val: 10.0 },
    { val: 10.1 },
  ];

  const group2 = [
    { val: 10.0 },
    { val: 10.1 },
    { val: 9.9 },
    { val: 10.2 },
    { val: 10.0 },
  ];

  const result = performTwoSampleTTest(group1, group2, "val");

  // The values are very close, should not be significantly different
  assertEquals(result.pValue > 0.1, true);
});

Deno.test("performTwoSampleTTest - zero variance edge cases", () => {
  // Test case 1: Both groups have identical values AND same mean
  const identicalGroup1 = [
    { x: 10 },
    { x: 10 },
    { x: 10 },
  ];

  const identicalGroup2 = [
    { x: 10 },
    { x: 10 },
    { x: 10 },
  ];

  const resultIdentical = performTwoSampleTTest(
    identicalGroup1,
    identicalGroup2,
    "x",
  );

  assertEquals(resultIdentical.group1Variance, 0);
  assertEquals(resultIdentical.group2Variance, 0);
  assertEquals(resultIdentical.group1Mean, 10);
  assertEquals(resultIdentical.group2Mean, 10);
  assertEquals(resultIdentical.meanDifference, 0);
  assertEquals(resultIdentical.tStatistic, 0);
  assertEquals(resultIdentical.pValue, 1);

  // Test case 2: Both groups have zero variance but different means
  const zeroVarGroup1 = [
    { y: 5 },
    { y: 5 },
    { y: 5 },
  ];

  const zeroVarGroup2 = [
    { y: 8 },
    { y: 8 },
    { y: 8 },
  ];

  assertThrows(
    () => {
      performTwoSampleTTest(zeroVarGroup1, zeroVarGroup2, "y");
    },
    Error,
    "Cannot perform t-test: both groups have zero variance",
  );
});

Deno.test("performTwoSampleTTest - error handling", () => {
  // Test with insufficient data in group 1
  assertThrows(
    () => {
      performTwoSampleTTest([{ x: 1 }], [{ x: 1 }, { x: 2 }], "x");
    },
    Error,
    "Group 1 must contain at least 2 observations",
  );

  // Test with insufficient data in group 2
  assertThrows(
    () => {
      performTwoSampleTTest([{ x: 1 }, { x: 2 }], [{ x: 1 }], "x");
    },
    Error,
    "Group 2 must contain at least 2 observations",
  );

  // Test with invalid data in group 1
  assertThrows(
    () => {
      performTwoSampleTTest(
        [{ x: 1 }, { x: "invalid" }],
        [{ x: 1 }, { x: 2 }],
        "x",
      );
    },
    Error,
    "Invalid data in group1",
  );

  // Test with invalid data in group 2
  assertThrows(
    () => {
      performTwoSampleTTest(
        [{ x: 1 }, { x: 2 }],
        [{ x: 1 }, { x: null }],
        "x",
      );
    },
    Error,
    "Invalid data in group2",
  );

  // Test with invalid tail option
  assertThrows(
    () => {
      performTwoSampleTTest(
        [{ x: 1 }, { x: 2 }],
        [{ x: 3 }, { x: 4 }],
        "x",
        { tail: "invalid" as any },
      );
    },
    Error,
    "Invalid tail option",
  );
});

Deno.test("performTwoSampleTTest - single key for both groups", () => {
  const teachers = [
    { teacher_id: 1, salary: 45000 },
    { teacher_id: 2, salary: 48000 },
    { teacher_id: 3, salary: 46000 },
  ];

  const principals = [
    { principal_id: 1, salary: 65000 },
    { principal_id: 2, salary: 68000 },
    { principal_id: 3, salary: 67000 },
  ];

  const result = performTwoSampleTTest(
    teachers,
    principals,
    "salary",
  );

  assertEquals(result.group1Mean, 46333.333333333336);
  assertEquals(result.group2Mean, 66666.66666666667);
  assertEquals(result.meanDifference < 0, true);
  assertEquals(result.pValue < 0.05, true); // Should be significant difference
});

Deno.test("performTwoSampleTTest - statistical properties", () => {
  const group1 = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  const group2 = [
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];

  const result = performTwoSampleTTest(group1, group2, "value");

  // Check that all statistical properties are computed
  assertEquals(typeof result.group1Mean, "number");
  assertEquals(typeof result.group2Mean, "number");
  assertEquals(typeof result.group1StdDev, "number");
  assertEquals(typeof result.group2StdDev, "number");
  assertEquals(typeof result.group1Variance, "number");
  assertEquals(typeof result.group2Variance, "number");
  assertEquals(typeof result.degreesOfFreedom, "number");
  assertEquals(typeof result.tStatistic, "number");
  assertEquals(typeof result.pValue, "number");

  // Standard deviations should be positive
  assertEquals(result.group1StdDev > 0, true);
  assertEquals(result.group2StdDev > 0, true);

  // P-value should be between 0 and 1
  assertEquals(result.pValue >= 0, true);
  assertEquals(result.pValue <= 1, true);

  // Degrees of freedom should be positive
  assertEquals(result.degreesOfFreedom > 0, true);
});
