/**
 * @module
 *
 * The Journalism library
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-statistics
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism-statistics
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-statistics";
 * ```
 */
import getCovarianceMatrix from "./statistics/getCovarianceMatrix.js";
import getCorrelationMatrix from "./statistics/getCorrelationMatrix.js";
import invertMatrix from "./statistics/invertMatrix.js";
import getMahalanobisDistance from "./statistics/getMahalanobisDistance.js";
import addMahalanobisDistance from "./statistics/addMahalanobisDistance.js";
import addZScore from "./statistics/addZScore.js";
import addClusters from "./statistics/addClusters.js";
import euclidianDistance from "./statistics/euclidianDistance.js";
import getSampleSizeProportion from "./statistics/getSampleSizeProportion.js";
import getSampleSizeMean from "./statistics/getSampleSizeMean.js";
import performZTest from "./statistics/performZTest.js";
import performTTest from "./statistics/performTTest.js";
import performPairedTTest from "./statistics/performPairedTTest.js";
import performTwoSampleTTest from "./statistics/performTwoSampleTTest.js";
import performChiSquaredIndependenceTest from "./statistics/performChiSquaredIndependenceTest.js";
import performChiSquaredGoodnessOfFitTest from "./statistics/performChiSquaredGoodnessOfFitTest.js";
import getCirParameters from "./statistics/getCirParameters.js";
import generateCirPath from "./statistics/generateCirPath.js";
import getGbmParameters from "./statistics/getGbmParameters.js";
import generateGbmPath from "./statistics/generateGbmPath.js";
import getCholeskyMatrix from "./statistics/getCholeskyMatrix.js";
import getCorrelatedShocks from "./statistics/getCorrelatedShocks.js";
import stepGbm from "./statistics/stepGbm.js";
import stepCir from "./statistics/stepCir.js";
export { addClusters, addMahalanobisDistance, addZScore, euclidianDistance, generateCirPath, generateGbmPath, getCholeskyMatrix, getCirParameters, getCorrelatedShocks, getCorrelationMatrix, getCovarianceMatrix, getGbmParameters, getMahalanobisDistance, getSampleSizeMean, getSampleSizeProportion, invertMatrix, performChiSquaredGoodnessOfFitTest, performChiSquaredIndependenceTest, performPairedTTest, performTTest, performTwoSampleTTest, performZTest, stepCir, stepGbm, };
//# sourceMappingURL=index.d.ts.map