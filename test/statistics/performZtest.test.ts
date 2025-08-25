import { assertEquals } from "jsr:@std/assert";
import performZTest from "../../src/statistics/performZTest.ts";

// Tested with
// https://www.socscistatistics.com/tests/ztest_sample_mean/default2.aspx
// http://vassarstats.net/tabs_z.html
// https://www.omnicalculator.com/statistics/z-test

// Test data sets for different scenarios
const populationData = [
  { id: 1, value: 100 },
  { id: 2, value: 105 },
  { id: 3, value: 95 },
  { id: 4, value: 110 },
  { id: 5, value: 85 },
  { id: 6, value: 120 },
  { id: 7, value: 90 },
  { id: 8, value: 115 },
  { id: 9, value: 80 },
  { id: 10, value: 125 },
];

const sampleDataSame = [
  { id: 11, value: 102 },
  { id: 12, value: 98 },
  { id: 13, value: 108 },
  { id: 14, value: 92 },
  { id: 15, value: 118 },
];

const sampleDataDifferent = [
  { id: 16, value: 150 },
  { id: 17, value: 155 },
  { id: 18, value: 145 },
  { id: 19, value: 160 },
  { id: 20, value: 140 },
];

const campaignData = [
  { candidate: "A", party: "Democratic", donation: 4500 },
  { candidate: "B", party: "Republican", donation: 3200 },
  { candidate: "C", party: "Independent", donation: 1800 },
  { candidate: "D", party: "Democratic", donation: 5800 },
  { candidate: "E", party: "Republican", donation: 3500 },
  { candidate: "F", party: "Democratic", donation: 4200 },
  { candidate: "G", party: "Independent", donation: 1500 },
  { candidate: "H", party: "Republican", donation: 4000 },
];

const democraticCandidates = [
  { candidate: "A", party: "Democratic", donation: 4500 },
  { candidate: "D", party: "Democratic", donation: 5800 },
  { candidate: "F", party: "Democratic", donation: 4200 },
];

Deno.test("should perform Z-test with dataset 1 (two-tailed, default)", () => {
  const result = performZTest(populationData, sampleDataSame, "value");
  assertEquals(result, {
    populationSize: 10,
    sampleSize: 5,
    populationMean: 102.5,
    sampleMean: 103.6,
    populationStdDev: 14.361406616345072,
    populationVariance: 206.25,
    fpcApplied: true,
    zScore: 0.22978250586152,
    pValue: 0.8182608687291939,
  });
});
Deno.test("should perform Z-test with dataset 1 (right-tailed)", () => {
  const result = performZTest(populationData, sampleDataSame, "value", {
    tail: "right-tailed",
  });
  assertEquals(result, {
    populationSize: 10,
    sampleSize: 5,
    populationMean: 102.5,
    sampleMean: 103.6,
    populationStdDev: 14.361406616345072,
    populationVariance: 206.25,
    fpcApplied: true,
    zScore: 0.22978250586152,
    pValue: 0.40913043436459695,
  });
});
Deno.test("should perform Z-test with dataset 1 (left-tailed)", () => {
  const result = performZTest(populationData, sampleDataSame, "value", {
    tail: "left-tailed",
  });
  assertEquals(result, {
    populationSize: 10,
    sampleSize: 5,
    populationMean: 102.5,
    sampleMean: 103.6,
    populationStdDev: 14.361406616345072,
    populationVariance: 206.25,
    fpcApplied: true,
    zScore: 0.22978250586152,
    pValue: 0.590869565635403,
  });
});
Deno.test("should perform Z-test with dataset 2", () => {
  const result = performZTest(campaignData, democraticCandidates, "donation");
  assertEquals(result, {
    populationSize: 8,
    sampleSize: 3,
    populationMean: 3562.5,
    sampleMean: 4833.333333333333,
    populationStdDev: 1321.871306141411,
    populationVariance: 1747343.75,
    fpcApplied: true,
    zScore: 1.970262390583112,
    pValue: 0.04880816798161458,
  });
});
Deno.test("should perform Z-test with dataset 2", () => {
  const result = performZTest(campaignData, democraticCandidates, "donation", {
    tail: "right-tailed",
  });
  assertEquals(result, {
    populationSize: 8,
    sampleSize: 3,
    populationMean: 3562.5,
    sampleMean: 4833.333333333333,
    populationStdDev: 1321.871306141411,
    populationVariance: 1747343.75,
    fpcApplied: true,
    zScore: 1.970262390583112,
    pValue: 0.02440408399080729,
  });
});
Deno.test("should perform Z-test with dataset 2", () => {
  const result = performZTest(campaignData, democraticCandidates, "donation", {
    tail: "left-tailed",
  });
  assertEquals(result, {
    populationSize: 8,
    sampleSize: 3,
    populationMean: 3562.5,
    sampleMean: 4833.333333333333,
    populationStdDev: 1321.871306141411,
    populationVariance: 1747343.75,
    fpcApplied: true,
    zScore: 1.970262390583112,
    pValue: 0.9755959160091927,
  });
});
