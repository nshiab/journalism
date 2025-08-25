import { assertEquals } from "jsr:@std/assert";
import performTTest from "../../src/statistics/performTTest.ts";

// Tested with
// https://www.socscistatistics.com/tests/tsinglesample/default2.aspx

// Test data based on the basketball example from the documentation
const basketballPlayers = [
  { player_id: 1, name: "John", points_per_game: 15 },
  { player_id: 2, name: "Sarah", points_per_game: 12 },
  { player_id: 3, name: "Mike", points_per_game: 18 },
  { player_id: 4, name: "Lisa", points_per_game: 14 },
  { player_id: 5, name: "Tom", points_per_game: 16 },
  { player_id: 6, name: "Anna", points_per_game: 13 },
];

Deno.test("should perform one-sample t-test with basketball data (two-tailed, default)", () => {
  const result = performTTest(basketballPlayers, "points_per_game", 10);

  assertEquals(result, {
    sampleSize: 6,
    sampleMean: 14.666666666666666,
    sampleStdDev: 2.1602468994692865,
    sampleVariance: 4.666666666666666,
    hypothesizedMean: 10,
    degreesOfFreedom: 5,
    tStatistic: 5.2915026221291805,
    pValue: 0.0032074554244336806,
  });
});
Deno.test("should perform one-sample t-test with basketball data (left-tailed)", () => {
  const result = performTTest(basketballPlayers, "points_per_game", 10, {
    tail: "right-tailed",
  });

  assertEquals(result, {
    sampleSize: 6,
    sampleMean: 14.666666666666666,
    sampleStdDev: 2.1602468994692865,
    sampleVariance: 4.666666666666666,
    hypothesizedMean: 10,
    degreesOfFreedom: 5,
    tStatistic: 5.2915026221291805,
    pValue: 0.0016037277122168403,
  });
});
Deno.test("should perform one-sample t-test with basketball data (left-tailed)", () => {
  const result = performTTest(basketballPlayers, "points_per_game", 10, {
    tail: "left-tailed",
  });

  assertEquals(result, {
    sampleSize: 6,
    sampleMean: 14.666666666666666,
    sampleStdDev: 2.1602468994692865,
    sampleVariance: 4.666666666666666,
    hypothesizedMean: 10,
    degreesOfFreedom: 5,
    tStatistic: 5.2915026221291805,
    pValue: 0.9983962722877832,
  });
});
