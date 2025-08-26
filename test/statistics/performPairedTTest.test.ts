import { assertEquals } from "jsr:@std/assert";
import performPairedTTest from "../../src/statistics/performPairedTTest.ts";

// Tested with
// https://www.socscistatistics.com/tests/tpairedsamples/default2.aspx
// https://www.graphpad.com/quickcalcs/ttest1.cfm

// Test data based on the education program example from the documentation
const studentScores = [
  { student_id: 1, name: "Alice", before_score: 75, after_score: 82 },
  { student_id: 2, name: "Bob", before_score: 68, after_score: 71 },
  { student_id: 3, name: "Carol", before_score: 85, after_score: 89 },
  { student_id: 4, name: "David", before_score: 72, after_score: 78 },
  { student_id: 5, name: "Eve", before_score: 79, after_score: 84 },
  { student_id: 6, name: "Frank", before_score: 81, after_score: 83 },
];

// Athletic performance data (where lower times are better)
const athletePerformance = [
  { athlete_id: 1, baseline_time: 12.5, trained_time: 11.8 },
  { athlete_id: 2, baseline_time: 13.2, trained_time: 12.9 },
  { athlete_id: 3, baseline_time: 11.9, trained_time: 11.3 },
  { athlete_id: 4, baseline_time: 14.1, trained_time: 13.6 },
  { athlete_id: 5, baseline_time: 12.8, trained_time: 12.2 },
];

Deno.test("should perform paired t-test with student scores (two-tailed, default)", () => {
  const result = performPairedTTest(
    studentScores,
    "before_score",
    "after_score",
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    differenceStdDev: 1.8708286933869707,
    differenceVariance: 3.5,
    degreesOfFreedom: 5,
    tStatistic: -5.891883036371794,
    pValue: 0.002057811488358041,
  });
});

Deno.test("should perform paired t-test with student scores (left-tailed)", () => {
  const result = performPairedTTest(
    studentScores,
    "before_score",
    "after_score",
    {
      tail: "left-tailed",
    },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    differenceStdDev: 1.8708286933869707,
    differenceVariance: 3.5,
    degreesOfFreedom: 5,
    tStatistic: -5.891883036371794,
    pValue: 0.0010289057441790583,
  });
});

Deno.test("should perform paired t-test with student scores (right-tailed)", () => {
  const result = performPairedTTest(
    studentScores,
    "before_score",
    "after_score",
    {
      tail: "right-tailed",
    },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: 0,
    differenceStdDev: 1.8708286933869707,
    differenceVariance: 3.5,
    degreesOfFreedom: 5,
    tStatistic: -5.891883036371794,
    pValue: 0.998971094255821,
  });
});

Deno.test("should perform paired t-test with athlete performance (right-tailed)", () => {
  // Testing if baseline_time - trained_time > 0 (improvement, lower time is better)
  const result = performPairedTTest(
    athletePerformance,
    "baseline_time",
    "trained_time",
    {
      tail: "right-tailed",
    },
  );

  assertEquals(result, {
    sampleSize: 5,
    firstMean: 12.9,
    secondMean: 12.36,
    meanDifference: 0.5399999999999998,
    hypothesizedDifference: 0,
    differenceStdDev: 0.15165750888103133,
    differenceVariance: 0.0230000000000001,
    degreesOfFreedom: 4,
    tStatistic: 7.961865632364426,
    pValue: 0.0008459081313451078,
  });
});

Deno.test("should perform paired t-test with custom hypothesized difference", () => {
  const result = performPairedTTest(
    studentScores,
    "before_score",
    "after_score",
    {
      hypothesizedDifference: -5, // Testing if the difference is significantly different from -5
    },
  );

  assertEquals(result, {
    sampleSize: 6,
    firstMean: 76.66666666666667,
    secondMean: 81.16666666666667,
    meanDifference: -4.5,
    hypothesizedDifference: -5,
    differenceStdDev: 1.8708286933869707,
    differenceVariance: 3.5,
    degreesOfFreedom: 5,
    tStatistic: 0.6546536707079771,
    pValue: 0.0797511578071668,
  });
});

Deno.test("should throw error for insufficient data", () => {
  const insufficientData = [
    { id: 1, before: 10, after: 12 },
  ];

  try {
    performPairedTTest(insufficientData, "before", "after");
    throw new Error("Should have thrown an error");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      "Paired data must contain at least 2 pairs.",
    );
  }
});

Deno.test("should throw error for invalid numeric data", () => {
  const invalidData = [
    { id: 1, before: 10, after: "invalid" },
    { id: 2, before: 12, after: 14 },
  ];

  try {
    performPairedTTest(invalidData, "before", "after");
    throw new Error("Should have thrown an error");
  } catch (error) {
    assertEquals(
      (error as Error).message,
      'Invalid data at index 0. Expected a finite number for key "after", but received: "invalid".',
    );
  }
});
