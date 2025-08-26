import { assertEquals } from "jsr:@std/assert";
import performPairedZTest from "../../src/statistics/performPairedZTest.ts";

// Tested with
// https://www.socscistatistics.com/tests/ztest_paired/default2.aspx
// https://www.graphpad.com/quickcalcs/ttest1.cfm

// Test data based on the fitness program example from the documentation
const fitnessScores = [
  { participant_id: 1, name: "Alice", before_score: 75, after_score: 82 },
  { participant_id: 2, name: "Bob", before_score: 68, after_score: 71 },
  { participant_id: 3, name: "Carol", before_score: 85, after_score: 89 },
  { participant_id: 4, name: "David", before_score: 72, after_score: 78 },
  { participant_id: 5, name: "Eve", before_score: 79, after_score: 84 },
  { participant_id: 6, name: "Frank", before_score: 81, after_score: 83 },
];

// Blood pressure data
const bloodPressureData = [
  { patient_id: 1, before_bp: 140, after_bp: 132 },
  { patient_id: 2, before_bp: 155, after_bp: 148 },
  { patient_id: 3, before_bp: 138, after_bp: 135 },
  { patient_id: 4, before_bp: 162, after_bp: 151 },
  { patient_id: 5, before_bp: 145, after_bp: 139 },
];

Deno.test("should perform paired z-test with fitness scores (two-tailed, default)", () => {
  const knownPopulationStdDev = 5.2;
  const result = performPairedZTest(
    fitnessScores,
    "before_score",
    "after_score",
    knownPopulationStdDev,
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    populationStdDev: 5.2,
    zStatistic: -2.1197507389469807,
    pValue: 0.03402695126756017,
  });
});

Deno.test("should perform paired z-test with fitness scores (left-tailed)", () => {
  const knownPopulationStdDev = 5.2;
  const result = performPairedZTest(
    fitnessScores,
    "before_score",
    "after_score",
    knownPopulationStdDev,
    { tail: "left-tailed" },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    populationStdDev: 5.2,
    zStatistic: -2.1197507389469807,
    pValue: 0.01701347563378003,
  });
});

Deno.test("should perform paired z-test with fitness scores (right-tailed)", () => {
  const knownPopulationStdDev = 5.2;
  const result = performPairedZTest(
    fitnessScores,
    "before_score",
    "after_score",
    knownPopulationStdDev,
    { tail: "right-tailed" },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    populationStdDev: 5.2,
    zStatistic: -2.1197507389469807,
    pValue: 0.9829865243662199,
  });
});

Deno.test("should perform paired z-test with blood pressure data (right-tailed)", () => {
  const knownStdDev = 8.5;
  // Testing if before_bp - after_bp > 0 (reduction in BP)
  const result = performPairedZTest(
    bloodPressureData,
    "before_bp",
    "after_bp",
    knownStdDev,
    { tail: "right-tailed" },
  );

  assertEquals(result, {
    sampleSize: 5,
    firstMean: 148,
    secondMean: 141,
    meanDifference: 7,
    hypothesizedDifference: 0,
    populationStdDev: 8.5,
    zStatistic: 1.8414677461762976,
    pValue: 0.03277646229889675,
  });
});

Deno.test("should perform paired z-test with custom hypothesized difference", () => {
  const knownPopulationStdDev = 5.2;
  const result = performPairedZTest(
    fitnessScores,
    "before_score",
    "after_score",
    knownPopulationStdDev,
    { hypothesizedDifference: -5 }, // Testing if the difference is significantly different from -5
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: -5,
    populationStdDev: 5.2,
    zStatistic: 0.23552785988299785,
    pValue: 0.8137991537154332,
  });
});

Deno.test("should throw error for insufficient data", () => {
  const insufficientData = [
    { id: 1, before: 10, after: 12 },
  ];

  try {
    performPairedZTest(insufficientData, "before", "after", 2.5);
    throw new Error("Should have thrown an error");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      "Paired data must contain at least 2 pairs.",
    );
  }
});

Deno.test("should throw error for invalid population standard deviation", () => {
  const validData = [
    { id: 1, before: 10, after: 12 },
    { id: 2, before: 12, after: 14 },
  ];

  try {
    performPairedZTest(validData, "before", "after", -1.5); // Negative std dev
    throw new Error("Should have thrown an error");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      "Invalid population standard deviation. Expected a positive finite number, but received: -1.5.",
    );
  }
});

Deno.test("should throw error for invalid numeric data", () => {
  const invalidData = [
    { id: 1, before: 10, after: "invalid" },
    { id: 2, before: 12, after: 14 },
  ];

  try {
    performPairedZTest(invalidData, "before", "after", 2.5);
    throw new Error("Should have thrown an error");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid data at index 0. Expected a finite number for key "after", but received: "invalid".',
    );
  }
});
