import { assertEquals } from "jsr:@std/assert";
import getCovarianceMatrix from "../../src/statistics/getCovarianceMatrix.ts";
import wineQuality from "../data/wine-quality.json" with { type: "json" };
import arraysToData from "../../src/format/arraysToData.ts";

const data = arraysToData(wineQuality) as Record<string, number>[];

Deno.test("should return a 2x2 covariance matrix", () => {
  const twoVariables = data.map((d) => [d["fixed acidity"], d.alcohol]);
  const matrix = getCovarianceMatrix(twoVariables);
  assertEquals(matrix, [
    [0.7119681970550005, -0.12550719251309772],
    [-0.12550719251309772, 1.514117788841716],
  ]);
});
Deno.test("should return a 2x2 inverted covariance matrix", () => {
  const twoVariables = data.map((d) => [d["fixed acidity"], d.alcohol]);
  const matrix = getCovarianceMatrix(twoVariables, { invert: true });
  assertEquals(matrix, [
    [1.4253851985430073, 0.1181520327131952],
    [0.11815203271319519, 0.6702443742450724],
  ]);
});
Deno.test("should return a 3x3 covariance matrix", () => {
  const threeVariables = data.map((d) => [
    d["fixed acidity"],
    d["residual sugar"],
    d.alcohol,
  ]);
  const matrix = getCovarianceMatrix(threeVariables);
  assertEquals(matrix, [
    [0.7119681970550005, 0.3809440223475775, -0.12550719251309772],
    [0.3809440223475775, 25.72051786341322, -2.8121660685891356],
    [-0.12550719251309772, -2.8121660685891356, 1.514117788841716],
  ]);
});
Deno.test("should return a 3x3 inverted covariance matrix", () => {
  const threeVariables = data.map((d) => [
    d["fixed acidity"],
    d["residual sugar"],
    d.alcohol,
  ]);
  const matrix = getCovarianceMatrix(threeVariables, { invert: true });
  assertEquals(matrix, [
    [1.4275549391155293, -0.01029636303437083, 0.09920848359253127],
    [-0.010296363034370827, 0.048860722373056165, 0.08989538259823723],
    [0.09920848359253126, 0.08989538259823725, 0.835636521966158],
  ]);
});
Deno.test("should return a 4x4 covariance matrix", () => {
  const fourVariables = data.map((d) => [
    d["fixed acidity"],
    d["residual sugar"],
    d.density,
    d.alcohol,
  ]);
  const matrix = getCovarianceMatrix(fourVariables);
  assertEquals(matrix, [
    [
      0.7119681970550005,
      0.3809440223475775,
      0.0006695405312093783,
      -0.12550719251309772,
    ],
    [
      0.3809440223475775,
      25.72051786341322,
      0.012724566900994994,
      -2.8121660685891356,
    ],
    [
      0.0006695405312093783,
      0.012724566900994994,
      0.000008943697841212739,
      -0.00287084411696803,
    ],
    [
      -0.12550719251309772,
      -2.8121660685891356,
      -0.00287084411696803,
      1.514117788841716,
    ],
  ]);
});
Deno.test("should return a 4x4 inverted covariance matrix", () => {
  const fourVariables = data.map((d) => [
    d["fixed acidity"],
    d["residual sugar"],
    d.density,
    d.alcohol,
  ]);
  const matrix = getCovarianceMatrix(fourVariables, { invert: true });
  assertEquals(matrix, [
    [
      1.890366500801349,
      0.29548258210193046,
      -857.0948891407204,
      -0.9196015969508056,
    ],
    [
      0.29548258210193046,
      0.2508884395460819,
      -566.2813827046937,
      -0.583230998661561,
    ],
    [
      -857.0948891407204,
      -566.2813827046937,
      1587280.2449344082,
      1886.7655549874191,
    ],
    [
      -0.9196015969508056,
      -0.583230998661561,
      1886.7655549874191,
      3.078393760864504,
    ],
  ]);
});
