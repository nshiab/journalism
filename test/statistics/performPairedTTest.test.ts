import { assertEquals } from "jsr:@std/assert";
import performPairedTTest from "../../src/statistics/performPairedTTest.ts";

// Tested against
// https://www.graphpad.com/quickcalcs/ttest2/
// and scipy (python)

// Test data based on the parking fines example from the documentation
const parkingFineData = [
  { district_id: 1, fines_before: 125, fines_after: 142 },
  { district_id: 2, fines_before: 98, fines_after: 108 },
  { district_id: 3, fines_before: 156, fines_after: 175 },
  { district_id: 4, fines_before: 87, fines_after: 95 },
  { district_id: 5, fines_before: 203, fines_after: 228 },
  { district_id: 6, fines_before: 134, fines_after: 149 },
];

Deno.test("should perform paired t-test with parking fines data (two-tailed, default)", () => {
  const result = performPairedTTest(
    parkingFineData,
    "fines_before",
    "fines_after",
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 133.83333333333334,
    secondMean: 149.5,
    meanDifference: -15.666666666666666,
    differenceStdDev: 6.186005711819757,
    differenceVariance: 38.26666666666665,
    degreesOfFreedom: 5,
    tStatistic: -6.203573208844343,
    pValue: 0.0015892640323764695,
  });
});

Deno.test("should perform paired t-test with parking fines data (right-tailed)", () => {
  const result = performPairedTTest(
    parkingFineData,
    "fines_before",
    "fines_after",
    {
      tail: "right-tailed",
    },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 133.83333333333334,
    secondMean: 149.5,
    meanDifference: -15.666666666666666,
    differenceStdDev: 6.186005711819757,
    differenceVariance: 38.26666666666665,
    degreesOfFreedom: 5,
    tStatistic: -6.203573208844343,
    pValue: 0.9992053679838118,
  });
});

Deno.test("should perform paired t-test with parking fines data (left-tailed)", () => {
  const result = performPairedTTest(
    parkingFineData,
    "fines_before",
    "fines_after",
    {
      tail: "left-tailed",
    },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 133.83333333333334,
    secondMean: 149.5,
    meanDifference: -15.666666666666666,
    differenceStdDev: 6.186005711819757,
    differenceVariance: 38.26666666666665,
    degreesOfFreedom: 5,
    tStatistic: -6.203573208844343,
    pValue: 0.0007946320161881899,
  });
});

// Test data based on the campaign spending example from the documentation
const campaignData = [
  { district_id: 1, before_ads: 32.5, after_ads: 38.2 },
  { district_id: 2, before_ads: 28.9, after_ads: 34.1 },
  { district_id: 3, before_ads: 41.3, after_ads: 43.7 },
  { district_id: 4, before_ads: 25.6, after_ads: 31.9 },
  { district_id: 5, before_ads: 36.8, after_ads: 40.3 },
];

Deno.test("should perform paired t-test with campaign data (two-tailed)", () => {
  const result = performPairedTTest(campaignData, "before_ads", "after_ads");

  assertEquals(result, {
    sampleSize: 5,
    firstMean: 33.019999999999996,
    secondMean: 37.64,
    meanDifference: -4.620000000000002,
    differenceStdDev: 1.62080227048212,
    differenceVariance: 2.6269999999999953,
    degreesOfFreedom: 4,
    tStatistic: -6.3737781246913645,
    pValue: 0.0031078158169572934,
  });
});

Deno.test("should perform paired t-test with campaign data (right-tailed)", () => {
  const result = performPairedTTest(campaignData, "before_ads", "after_ads", {
    tail: "right-tailed",
  });

  assertEquals(result, {
    sampleSize: 5,
    firstMean: 33.019999999999996,
    secondMean: 37.64,
    meanDifference: -4.620000000000002,
    differenceStdDev: 1.62080227048212,
    differenceVariance: 2.6269999999999953,
    degreesOfFreedom: 4,
    tStatistic: -6.3737781246913645,
    pValue: 0.9984460920915214,
  });
});

// Test with positive differences (first measurement > second measurement)
const weightLossData = [
  { participant: 1, weight_before: 180, weight_after: 175 },
  { participant: 2, weight_before: 165, weight_after: 162 },
  { participant: 3, weight_before: 195, weight_after: 188 },
  { participant: 4, weight_before: 170, weight_after: 168 },
  { participant: 5, weight_before: 185, weight_after: 181 },
];

Deno.test("should perform paired t-test with weight loss data (positive differences)", () => {
  const result = performPairedTTest(
    weightLossData,
    "weight_before",
    "weight_after",
  );

  assertEquals(result, {
    sampleSize: 5,
    firstMean: 179,
    secondMean: 174.8,
    meanDifference: 4.2,
    differenceStdDev: 1.9235384061671343,
    differenceVariance: 3.6999999999999993,
    degreesOfFreedom: 4,
    tStatistic: 4.882400827240411,
    pValue: 0.008146502916276832,
  });
});

// Test edge case: zero differences (identical measurements)
Deno.test("should handle zero differences when measurements are identical", () => {
  const identicalData = [
    { id: 1, before: 10, after: 10 },
    { id: 2, before: 15, after: 15 },
    { id: 3, before: 20, after: 20 },
    { id: 4, before: 12, after: 12 },
  ];

  const result = performPairedTTest(identicalData, "before", "after");

  assertEquals(result, {
    sampleSize: 4,
    firstMean: 14.25,
    secondMean: 14.25,
    meanDifference: 0,
    differenceStdDev: 0,
    differenceVariance: 0,
    degreesOfFreedom: 3,
    tStatistic: 0,
    pValue: 1.0,
  });
});

// Test edge case: constant positive difference (perfect effect)
Deno.test("should handle constant positive difference", () => {
  const constantDifferenceData = [
    { id: 1, before: 10, after: 15 },
    { id: 2, before: 20, after: 25 },
    { id: 3, before: 30, after: 35 },
    { id: 4, before: 40, after: 45 },
  ];

  const result = performPairedTTest(constantDifferenceData, "before", "after");

  assertEquals(result, {
    sampleSize: 4,
    firstMean: 25,
    secondMean: 30,
    meanDifference: -5,
    differenceStdDev: 0,
    differenceVariance: 0,
    degreesOfFreedom: 3,
    tStatistic: -Infinity,
    pValue: 0.0,
  });
});

// Test edge case: constant negative difference (perfect negative effect)
Deno.test("should handle constant negative difference", () => {
  const constantNegativeDifferenceData = [
    { id: 1, before: 15, after: 10 },
    { id: 2, before: 25, after: 20 },
    { id: 3, before: 35, after: 30 },
    { id: 4, before: 45, after: 40 },
  ];

  const result = performPairedTTest(
    constantNegativeDifferenceData,
    "before",
    "after",
  );

  assertEquals(result, {
    sampleSize: 4,
    firstMean: 30,
    secondMean: 25,
    meanDifference: 5,
    differenceStdDev: 0,
    differenceVariance: 0,
    degreesOfFreedom: 3,
    tStatistic: Infinity,
    pValue: 0.0,
  });
});

// Test with small sample size (minimum = 2)
Deno.test("should handle minimum sample size of 2", () => {
  const minimalData = [
    { id: 1, x: 10, y: 12 },
    { id: 2, x: 8, y: 11 },
  ];

  const result = performPairedTTest(minimalData, "x", "y");

  assertEquals(result, {
    sampleSize: 2,
    firstMean: 9,
    secondMean: 11.5,
    meanDifference: -2.5,
    differenceStdDev: 0.7071067811865476,
    differenceVariance: 0.5,
    degreesOfFreedom: 1,
    tStatistic: -5,
    pValue: 0.12566591637137225,
  });
});

// Test error handling: insufficient sample size
Deno.test("should throw error for insufficient sample size", () => {
  const insufficientData = [{ id: 1, x: 10, y: 12 }];

  try {
    performPairedTTest(insufficientData, "x", "y");
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      "Paired data must contain at least 2 pairs.",
    );
  }
});

// Test error handling: invalid first variable data
Deno.test("should throw error for invalid first variable data", () => {
  const invalidData = [
    { id: 1, x: "invalid", y: 12 },
    { id: 2, x: 8, y: 11 },
  ];

  try {
    performPairedTTest(invalidData, "x", "y");
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid data at index 0. Expected a finite number for key "x", but received: "invalid".',
    );
  }
});

// Test error handling: invalid second variable data
Deno.test("should throw error for invalid second variable data", () => {
  const invalidData = [
    { id: 1, x: 10, y: null },
    { id: 2, x: 8, y: 11 },
  ];

  try {
    performPairedTTest(invalidData, "x", "y");
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid data at index 0. Expected a finite number for key "y", but received: null.',
    );
  }
});

// Test error handling: infinite values
Deno.test("should throw error for infinite values", () => {
  const infiniteData = [
    { id: 1, x: 10, y: Infinity },
    { id: 2, x: 8, y: 11 },
  ];

  try {
    performPairedTTest(infiniteData, "x", "y");
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid data at index 0. Expected a finite number for key "y", but received: null.',
    );
  }
});

// Test error handling: invalid tail option
Deno.test("should throw error for invalid tail option", () => {
  const validData = [
    { id: 1, x: 10, y: 12 },
    { id: 2, x: 8, y: 11 },
  ];

  try {
    performPairedTTest(validData, "x", "y", { tail: "invalid" as any });
    throw new Error("Expected error was not thrown");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid tail option: invalid. Use "two-tailed", "left-tailed", or "right-tailed".',
    );
  }
});
