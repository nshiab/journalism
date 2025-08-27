import { assertEquals, assertThrows } from "jsr:@std/assert";
import performChiSquaredGoodnessOfFitTest from "../../src/statistics/performChiSquaredGoodnessOfFitTest.ts";

// Tested with
// https://www.graphpad.com/quickcalcs/chisquared2/
// and scipy (python)

// Test data for goodness of fit test - crime distribution
const crimeData = [
  { crime_type: "theft", observed_count: 120, expected_count: 100 },
  { crime_type: "assault", observed_count: 80, expected_count: 90 },
  { crime_type: "fraud", observed_count: 45, expected_count: 50 },
  { crime_type: "vandalism", observed_count: 55, expected_count: 60 },
];

// Test data for dice rolls
const diceData = [
  { face: "1", observed: 5, expected: 20 },
  { face: "2", observed: 25, expected: 20 },
  { face: "3", observed: 19, expected: 20 },
  { face: "4", observed: 30, expected: 20 },
  { face: "5", observed: 22, expected: 20 },
  { face: "6", observed: 19, expected: 20 },
];

Deno.test("should perform the chi-squared goodness of fit with crimeData", () => {
  const result = performChiSquaredGoodnessOfFitTest(
    crimeData,
    "crime_type",
    "observed_count",
    "expected_count",
  );
  assertEquals(result, {
    chiSquared: 6.027777777777778,
    degreesOfFreedom: 3,
    pValue: 0.10854389506338813,
    warnings: [],
  });
});
Deno.test("should perform the chi-squared goodness of fit with diceData", () => {
  const result = performChiSquaredGoodnessOfFitTest(
    diceData,
    "face",
    "observed",
    "expected",
  );
  assertEquals(result, {
    chiSquared: 17.8,
    degreesOfFreedom: 5,
    pValue: 0.003361920530810747,
    warnings: [],
  });
});

Deno.test("should perform chi-squared goodness of fit test correctly", () => {
  const result = performChiSquaredGoodnessOfFitTest(
    crimeData,
    "crime_type",
    "observed_count",
    "expected_count",
  );

  // Check basic structure
  assertEquals(typeof result.chiSquared, "number");
  assertEquals(typeof result.degreesOfFreedom, "number");
  assertEquals(typeof result.pValue, "number");
  assertEquals(Array.isArray(result.warnings), true);
  assertEquals(result.degreesOfFreedom, 3); // 4 categories - 1

  assertEquals(Math.round(result.chiSquared * 100) / 100, 6.03);

  // P-value should be reasonable
  assertEquals(result.pValue >= 0 && result.pValue <= 1, true);
});

Deno.test("should handle dice roll goodness of fit test", () => {
  const result = performChiSquaredGoodnessOfFitTest(
    diceData,
    "face",
    "observed",
    "expected",
  );

  assertEquals(result.degreesOfFreedom, 5); // 6 faces - 1

  assertEquals(Math.round(result.chiSquared * 100) / 100, 17.8);
});

Deno.test("should handle single category", () => {
  const singleData = [
    { category: "A", observed: 45, expected: 45 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    singleData,
    "category",
    "observed",
    "expected",
  );

  assertEquals(result.degreesOfFreedom, 0); // 1 category - 1

  // Chi-squared = (45-45)²/45 = 0/45 = 0
  assertEquals(result.chiSquared, 0);
});

Deno.test("should handle multiple entries for same category", () => {
  const duplicateData = [
    { category: "A", observed: 30, expected: 25 },
    { category: "A", observed: 20, expected: 25 }, // Same category, should be summed
    { category: "B", observed: 50, expected: 50 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    duplicateData,
    "category",
    "observed",
    "expected",
  );

  // Verify the calculation was done correctly by checking chi-squared value
  // Expected: A: observed=50, expected=50, B: observed=50, expected=50
  // Chi-squared = (50-50)²/50 + (50-50)²/50 = 0 + 0 = 0
  assertEquals(result.chiSquared, 0);
  assertEquals(result.degreesOfFreedom, 1); // 2 categories - 1
});

Deno.test("should throw error for empty data", () => {
  assertThrows(
    () => {
      performChiSquaredGoodnessOfFitTest(
        [],
        "category",
        "observed",
        "expected",
      );
    },
    Error,
    "Data must be a non-empty array",
  );
});

Deno.test("should throw error for invalid observed values", () => {
  const invalidData = [
    { category: "A", observed: -5, expected: 10 },
    { category: "B", observed: 15, expected: 10 },
  ];

  assertThrows(
    () => {
      performChiSquaredGoodnessOfFitTest(
        invalidData,
        "category",
        "observed",
        "expected",
      );
    },
    Error,
    "Expected a non-negative finite number",
  );
});

Deno.test("should throw error for zero expected frequency", () => {
  const zeroExpectedData = [
    { category: "A", observed: 10, expected: 0 },
    { category: "B", observed: 20, expected: 15 },
  ];

  assertThrows(
    () => {
      performChiSquaredGoodnessOfFitTest(
        zeroExpectedData,
        "category",
        "observed",
        "expected",
      );
    },
    Error,
    "Expected frequency must be greater than 0",
  );
});

Deno.test("should throw error when observed and expected totals don't match", () => {
  const mismatchedTotalsData = [
    { category: "A", observed: 50, expected: 40 },
    { category: "B", observed: 30, expected: 25 },
  ];

  assertThrows(
    () => {
      performChiSquaredGoodnessOfFitTest(
        mismatchedTotalsData,
        "category",
        "observed",
        "expected",
      );
    },
    Error,
    "Total observed frequencies (80) must approximately equal total expected frequencies (65)",
  );
});

Deno.test("should handle string and number category values", () => {
  const mixedData = [
    { category: 1, observed: 25, expected: 25 },
    { category: "2", observed: 30, expected: 30 },
    { category: 3, observed: 15, expected: 15 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    mixedData,
    "category",
    "observed",
    "expected",
  );

  // Verify the test processed all 3 categories correctly
  assertEquals(result.degreesOfFreedom, 2); // 3 categories - 1

  // Calculate expected chi-squared
  // (25-25)²/25 + (30-30)²/30 + (15-15)²/15 = 0 + 0 + 0 = 0
  assertEquals(result.chiSquared, 0);
});

Deno.test("should generate warnings for low expected frequencies", () => {
  const lowExpectedData = [
    { category: "A", observed: 2, expected: 2 },
    { category: "B", observed: 3, expected: 3 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    lowExpectedData,
    "category",
    "observed",
    "expected",
  );

  // Should have warnings for low expected frequencies
  assertEquals(result.warnings.length > 0, true);

  // Check for specific warnings
  const hasLowFrequencyWarning = result.warnings.some(
    (warning) => warning.includes("80%") && warning.includes("≥ 5"),
  );
  assertEquals(hasLowFrequencyWarning, true);

  // Check for df=1 specific warning
  const hasDfOneWarning = result.warnings.some(
    (warning) => warning.includes("1 degree of freedom"),
  );
  assertEquals(hasDfOneWarning, true);
});

Deno.test("should generate warning for very small expected frequencies", () => {
  const verySmallData = [
    { category: "A", observed: 0.3, expected: 0.3 },
    { category: "B", observed: 2.0, expected: 2.0 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    verySmallData,
    "category",
    "observed",
    "expected",
  );

  // Should have warnings
  assertEquals(result.warnings.length > 0, true);

  // Check for very small frequency warning
  const hasVerySmallWarning = result.warnings.some(
    (warning) => warning.includes("very small") && warning.includes("< 0.5"),
  );
  assertEquals(hasVerySmallWarning, true);

  // Check for frequencies below 1 warning
  const hasBelowOneWarning = result.warnings.some(
    (warning) => warning.includes("less than 1"),
  );
  assertEquals(hasBelowOneWarning, true);
});

Deno.test("should not generate warnings for adequate expected frequencies", () => {
  const goodData = [
    { category: "A", observed: 25, expected: 20 },
    { category: "B", observed: 35, expected: 30 },
    { category: "C", observed: 40, expected: 50 },
  ];

  const result = performChiSquaredGoodnessOfFitTest(
    goodData,
    "category",
    "observed",
    "expected",
  );

  // Should have no warnings
  assertEquals(result.warnings.length, 0);
});
