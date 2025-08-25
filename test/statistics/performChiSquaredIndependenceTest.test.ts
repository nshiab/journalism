import { assertEquals, assertThrows } from "jsr:@std/assert";
import performChiSquaredIndependenceTest from "../../src/statistics/performChiSquaredIndependenceTest.ts";

// Test data for independence test - voting preference by age group
const votingData = [
  { age_group: "18-30", candidate: "A", count: 45 },
  { age_group: "18-30", candidate: "B", count: 55 },
  { age_group: "31-50", candidate: "A", count: 60 },
  { age_group: "31-50", candidate: "B", count: 40 },
  { age_group: "51+", candidate: "A", count: 70 },
  { age_group: "51+", candidate: "B", count: 30 },
];

Deno.test("should perform chi-squared independence test correctly", () => {
  const result = performChiSquaredIndependenceTest(
    votingData,
    "age_group",
    "candidate",
    "count",
  );

  // Check basic structure
  assertEquals(typeof result.chiSquared, "number");
  assertEquals(typeof result.degreesOfFreedom, "number");
  assertEquals(typeof result.pValue, "number");
  assertEquals(result.degreesOfFreedom, 2); // (3-1) * (2-1) = 2

  // Verify the chi-squared value (calculated manually)
  // Expected frequencies calculated from marginal totals
  // Row totals: [100, 100, 100], Col totals: [175, 125], Grand total: 300
  // Chi-squared = 13.029 (rounded to 3 decimal places)
  assertEquals(Math.round(result.chiSquared * 1000) / 1000, 13.029);

  // P-value should be reasonable for this test
  assertEquals(result.pValue >= 0 && result.pValue <= 1, true);
  // For chi-squared = 13.03 with df = 2, p-value should be very small (< 0.05)
  assertEquals(result.pValue < 0.05, true); // Significant at 5% level

  // Check contingency table structure
  assertEquals(result.contingencyTable.rows.length, 3);
  assertEquals(result.contingencyTable.columns.length, 2);
  assertEquals(result.contingencyTable.grandTotal, 300);
});

Deno.test("should handle simple 2x2 contingency table", () => {
  const simpleData = [
    { gender: "male", preference: "yes", count: 20 },
    { gender: "male", preference: "no", count: 30 },
    { gender: "female", preference: "yes", count: 25 },
    { gender: "female", preference: "no", count: 25 },
  ];

  const result = performChiSquaredIndependenceTest(
    simpleData,
    "gender",
    "preference",
    "count",
  );

  assertEquals(result.degreesOfFreedom, 1); // (2-1) * (2-1) = 1
  assertEquals(result.contingencyTable.grandTotal, 100);
  assertEquals(result.pValue > 0 && result.pValue < 1, true);
});

Deno.test("should handle string and number category values", () => {
  const mixedData = [
    { category: 1, candidate: "A", count: 25 },
    { category: 1, candidate: "B", count: 35 },
    { category: "2", candidate: "A", count: 40 },
    { category: "2", candidate: "B", count: 30 },
  ];

  const result = performChiSquaredIndependenceTest(
    mixedData,
    "category",
    "candidate",
    "count",
  );

  assertEquals(result.contingencyTable.rows.length, 2);
  assertEquals(result.contingencyTable.columns.length, 2);
  assertEquals(result.degreesOfFreedom, 1);
});

Deno.test("should throw error for empty data", () => {
  assertThrows(
    () => {
      performChiSquaredIndependenceTest(
        [],
        "category",
        "preference",
        "count",
      );
    },
    Error,
    "Data must be a non-empty array",
  );
});

Deno.test("should throw error for invalid count values", () => {
  const invalidData = [
    { category: "A", preference: "yes", count: -5 },
    { category: "B", preference: "no", count: 15 },
  ];

  assertThrows(
    () => {
      performChiSquaredIndependenceTest(
        invalidData,
        "category",
        "preference",
        "count",
      );
    },
    Error,
    "Expected a non-negative finite number",
  );
});

Deno.test("should handle large contingency table", () => {
  const largeData = [
    { education: "high_school", income: "low", count: 150 },
    { education: "high_school", income: "medium", count: 100 },
    { education: "high_school", income: "high", count: 50 },
    { education: "college", income: "low", count: 80 },
    { education: "college", income: "medium", count: 120 },
    { education: "college", income: "high", count: 100 },
    { education: "graduate", income: "low", count: 30 },
    { education: "graduate", income: "medium", count: 70 },
    { education: "graduate", income: "high", count: 150 },
  ];

  const result = performChiSquaredIndependenceTest(
    largeData,
    "education",
    "income",
    "count",
  );

  assertEquals(result.contingencyTable.rows.length, 3);
  assertEquals(result.contingencyTable.columns.length, 3);
  assertEquals(result.degreesOfFreedom, 4); // (3-1) * (3-1) = 4
  assertEquals(result.contingencyTable.grandTotal, 850);
});

Deno.test("should calculate expected frequencies correctly", () => {
  const result = performChiSquaredIndependenceTest(
    votingData,
    "age_group",
    "candidate",
    "count",
  );

  // Check that expected frequencies are calculated correctly
  // For age_group "18-30" and candidate "A": (100 * 175) / 300 = 58.33
  const expected1830A = result.expectedFrequencies["18-30"]["A"];
  assertEquals(Math.round(expected1830A * 100) / 100, 58.33);

  // For age_group "18-30" and candidate "B": (100 * 125) / 300 = 41.67
  const expected1830B = result.expectedFrequencies["18-30"]["B"];
  assertEquals(Math.round(expected1830B * 100) / 100, 41.67);
});

Deno.test("should generate warnings for low expected frequencies", () => {
  // Test data with low expected frequencies
  const lowFrequencyData = [
    { group: "A", outcome: "X", count: 2 },
    { group: "A", outcome: "Y", count: 3 },
    { group: "B", outcome: "X", count: 1 },
    { group: "B", outcome: "Y", count: 4 },
  ];

  const result = performChiSquaredIndependenceTest(
    lowFrequencyData,
    "group",
    "outcome",
    "count",
  );

  // Should have warnings about low frequencies
  assertEquals(result.warnings.length > 0, true);

  // Should warn about frequencies below 5 for 2x2 table
  const hasBelow5Warning = result.warnings.some((warning) =>
    warning.includes(
      "For 2×2 contingency tables, all expected frequencies should be ≥ 5",
    )
  );
  assertEquals(hasBelow5Warning, true);
});

Deno.test("should not generate warnings for adequate expected frequencies", () => {
  // Test data with adequate expected frequencies
  const goodFrequencyData = [
    { group: "A", outcome: "X", count: 25 },
    { group: "A", outcome: "Y", count: 25 },
    { group: "B", outcome: "X", count: 25 },
    { group: "B", outcome: "Y", count: 25 },
  ];

  const result = performChiSquaredIndependenceTest(
    goodFrequencyData,
    "group",
    "outcome",
    "count",
  );

  // Should have no warnings
  assertEquals(result.warnings.length, 0);
});
