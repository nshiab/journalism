"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepGbm = exports.stepCir = exports.performZTest = exports.performTwoSampleTTest = exports.performTTest = exports.performPairedTTest = exports.performChiSquaredIndependenceTest = exports.performChiSquaredGoodnessOfFitTest = exports.invertMatrix = exports.getSampleSizeProportion = exports.getSampleSizeMean = exports.getMahalanobisDistance = exports.getGbmParameters = exports.getCovarianceMatrix = exports.getCorrelationMatrix = exports.getCorrelatedShocks = exports.getCirParameters = exports.getCholeskyMatrix = exports.generateGbmPath = exports.generateCirPath = exports.euclidianDistance = exports.addZScore = exports.addMahalanobisDistance = exports.addClusters = void 0;
const getCovarianceMatrix_js_1 = __importDefault(require("./statistics/getCovarianceMatrix.js"));
exports.getCovarianceMatrix = getCovarianceMatrix_js_1.default;
const getCorrelationMatrix_js_1 = __importDefault(require("./statistics/getCorrelationMatrix.js"));
exports.getCorrelationMatrix = getCorrelationMatrix_js_1.default;
const invertMatrix_js_1 = __importDefault(require("./statistics/invertMatrix.js"));
exports.invertMatrix = invertMatrix_js_1.default;
const getMahalanobisDistance_js_1 = __importDefault(require("./statistics/getMahalanobisDistance.js"));
exports.getMahalanobisDistance = getMahalanobisDistance_js_1.default;
const addMahalanobisDistance_js_1 = __importDefault(require("./statistics/addMahalanobisDistance.js"));
exports.addMahalanobisDistance = addMahalanobisDistance_js_1.default;
const addZScore_js_1 = __importDefault(require("./statistics/addZScore.js"));
exports.addZScore = addZScore_js_1.default;
const addClusters_js_1 = __importDefault(require("./statistics/addClusters.js"));
exports.addClusters = addClusters_js_1.default;
const euclidianDistance_js_1 = __importDefault(require("./statistics/euclidianDistance.js"));
exports.euclidianDistance = euclidianDistance_js_1.default;
const getSampleSizeProportion_js_1 = __importDefault(require("./statistics/getSampleSizeProportion.js"));
exports.getSampleSizeProportion = getSampleSizeProportion_js_1.default;
const getSampleSizeMean_js_1 = __importDefault(require("./statistics/getSampleSizeMean.js"));
exports.getSampleSizeMean = getSampleSizeMean_js_1.default;
const performZTest_js_1 = __importDefault(require("./statistics/performZTest.js"));
exports.performZTest = performZTest_js_1.default;
const performTTest_js_1 = __importDefault(require("./statistics/performTTest.js"));
exports.performTTest = performTTest_js_1.default;
const performPairedTTest_js_1 = __importDefault(require("./statistics/performPairedTTest.js"));
exports.performPairedTTest = performPairedTTest_js_1.default;
const performTwoSampleTTest_js_1 = __importDefault(require("./statistics/performTwoSampleTTest.js"));
exports.performTwoSampleTTest = performTwoSampleTTest_js_1.default;
const performChiSquaredIndependenceTest_js_1 = __importDefault(require("./statistics/performChiSquaredIndependenceTest.js"));
exports.performChiSquaredIndependenceTest = performChiSquaredIndependenceTest_js_1.default;
const performChiSquaredGoodnessOfFitTest_js_1 = __importDefault(require("./statistics/performChiSquaredGoodnessOfFitTest.js"));
exports.performChiSquaredGoodnessOfFitTest = performChiSquaredGoodnessOfFitTest_js_1.default;
const getCirParameters_js_1 = __importDefault(require("./statistics/getCirParameters.js"));
exports.getCirParameters = getCirParameters_js_1.default;
const generateCirPath_js_1 = __importDefault(require("./statistics/generateCirPath.js"));
exports.generateCirPath = generateCirPath_js_1.default;
const getGbmParameters_js_1 = __importDefault(require("./statistics/getGbmParameters.js"));
exports.getGbmParameters = getGbmParameters_js_1.default;
const generateGbmPath_js_1 = __importDefault(require("./statistics/generateGbmPath.js"));
exports.generateGbmPath = generateGbmPath_js_1.default;
const getCholeskyMatrix_js_1 = __importDefault(require("./statistics/getCholeskyMatrix.js"));
exports.getCholeskyMatrix = getCholeskyMatrix_js_1.default;
const getCorrelatedShocks_js_1 = __importDefault(require("./statistics/getCorrelatedShocks.js"));
exports.getCorrelatedShocks = getCorrelatedShocks_js_1.default;
const stepGbm_js_1 = __importDefault(require("./statistics/stepGbm.js"));
exports.stepGbm = stepGbm_js_1.default;
const stepCir_js_1 = __importDefault(require("./statistics/stepCir.js"));
exports.stepCir = stepCir_js_1.default;
