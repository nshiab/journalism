/**
 * This module provides a collection of functions to be used in web applications.
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism/web";
 * ```
 *
 * @module
 */

import formatDate from "./format/formatDate.ts";
import formatNumber from "./format/formatNumber.ts";
import round from "./format/round.ts";
import prettyDuration from "./format/prettyDuration.ts";
import geoTo3D from "./geo/geoTo3D.ts";
import distance from "./geo/distance.ts";
import styledLayerDescriptor from "./geo/styledLayerDescriptor.ts";
import adjustToInflation from "./finance/adjustToInflation.ts";
import mortgagePayments from "./finance/mortgagePayments.ts";
import mortgageInsurancePremium from "./finance/mortgageInsurancePremium.ts";
import mortgageMaxAmount from "./finance/mortgageMaxAmount.ts";
import getClosest from "./geo/getClosest.ts";
import getHumidex from "./weather/getHumidex.ts";
import arraysToData from "./format/arraysToData.ts";
import dataToArrays from "./format/dataToArrays.ts";
import dataAsCsv from "./format/dataAsCsv.ts";
import capitalize from "./format/capitalize.ts";
import camelCase from "./format/camelCase.ts";
import getId from "./other/getId.ts";
import getSeason from "./weather/getSeason.ts";
import getCovarianceMatrix from "./statistics/getCovarianceMatrix.ts";
import invertMatrix from "./statistics/invertMatrix.ts";
import getMahalanobisDistance from "./statistics/getMahalanobisDistance.ts";
import addMahalanobisDistance from "./statistics/addMahalanobisDistance.ts";
import addClusters from "./statistics/addClusters.ts";
import addZScore from "./statistics/addZScore.ts";
import euclideanDistance from "./statistics/euclidianDistance.ts";
import rewind from "./geo/rewind.ts";
import sleep from "./other/sleep.ts";
import DurationTracker from "./other/DurationTracker.ts";
import downloadCSV from "./web/downloadCsv.ts";
import zipToUrls from "./web/zipToUrls.ts";
import getSampleSizeProportion from "./statistics/getSampleSizeProportion.ts";
import getSampleSizeMean from "./statistics/getSampleSizeMean.ts";
import performZTest from "./statistics/performZTest.ts";
import performTTest from "./statistics/performTTest.ts";
import performPairedTTest from "./statistics/performPairedTTest.ts";
import performTwoSampleTTest from "./statistics/performTwoSampleTTest.ts";
import performChiSquaredIndependenceTest from "./statistics/performChiSquaredIndependenceTest.ts";
import performChiSquaredGoodnessOfFitTest from "./statistics/performChiSquaredGoodnessOfFitTest.ts";

export {
  addClusters,
  addMahalanobisDistance,
  addZScore,
  adjustToInflation,
  arraysToData,
  camelCase,
  capitalize,
  dataAsCsv,
  dataToArrays,
  distance,
  downloadCSV,
  DurationTracker,
  euclideanDistance,
  formatDate,
  formatNumber,
  geoTo3D,
  getClosest,
  getCovarianceMatrix,
  getHumidex,
  getId,
  getMahalanobisDistance,
  getSampleSizeMean,
  getSampleSizeProportion,
  getSeason,
  invertMatrix,
  mortgageInsurancePremium,
  mortgageMaxAmount,
  mortgagePayments,
  performChiSquaredGoodnessOfFitTest,
  performChiSquaredIndependenceTest,
  performPairedTTest,
  performTTest,
  performTwoSampleTTest,
  performZTest,
  prettyDuration,
  rewind,
  round,
  sleep,
  styledLayerDescriptor,
  zipToUrls,
};
