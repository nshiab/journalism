/**
 * @module
 *
 * The Journalism library
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npx jsr add @nshiab/journalism
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism";
 * ```
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
import getStatCanTable from "./web-scraping/getStatCanTable.ts";
import getHtmlTable from "./web-scraping/getHtmlTable.ts";
import arraysToData from "./format/arraysToData.ts";
import dataToArrays from "./format/dataToArrays.ts";
import updateDataDW from "./dataviz/updateDataDW.ts";
import updateAnnotationsDW from "./dataviz/updateAnnotationsDW.ts";
import updateNotesDW from "./dataviz/updateNotesDW.ts";
import publishChartDW from "./dataviz/publishChartDW.ts";
import dataAsCsv from "./format/dataAsCsv.ts";
import capitalize from "./format/capitalize.ts";
import camelCase from "./format/camelCase.ts";
import downloadFile from "./web-scraping/downloadFile.ts";
import unzip from "./other/unzip.ts";
import zip from "./other/zip.ts";
import addSheetRows from "./google/addSheetRows.ts";
import overwriteSheetData from "./google/overwriteSheetData.ts";
import getSheetData from "./google/getSheetData.ts";
import getGeoTiffDetails from "./geo/getGeoTiffDetails.ts";
import getGeoTiffValues from "./geo/getGeoTiffValues.ts";
import createDirectory from "./other/createDirectory.ts";
import removeDirectory from "./other/removeDirectory.ts";
import getId from "./other/getId.ts";
import getSeason from "./weather/getSeason.ts";
import getCovarianceMatrix from "./statistics/getCovarianceMatrix.ts";
import invertMatrix from "./statistics/invertMatrix.ts";
import getMahalanobisDistance from "./statistics/getMahalanobisDistance.ts";
import addMahalanobisDistance from "./statistics/addMahalanobisDistance.ts";
import addZScore from "./statistics/addZScore.ts";
import addClusters from "./statistics/addClusters.ts";
import euclidianDistance from "./statistics/euclidianDistance.ts";
import logBarChart from "./dataviz/logBarChart.ts";
import logLineChart from "./dataviz/logLineChart.ts";
import logDotChart from "./dataviz/logDotChart.ts";
import rewind from "./geo/rewind.ts";
import saveChart from "./dataviz/saveChart.ts";
import reencode from "./format/reencode.ts";
import getYahooFinanceData from "./finance/getYahooFinanceData.ts";
import sleep from "./other/sleep.ts";
import DurationTracker from "./other/DurationTracker.ts";
import askAI from "./ai/askAI.ts";
import getEmbedding from "./ai/getEmbedding.ts";
import toBucket from "./google/toBucket.ts";
import deleteFromBucket from "./google/deleteFromBucket.ts";
import inBucket from "./google/inBucket.ts";
import downloadFromBucket from "./google/downloadFromBucket.ts";
import filesInBucket from "./google/filesInBucket.ts";
import getEnvironmentCanadaRecords from "./weather/getEnvironmentCanadaRecords.ts";
import getSampleSizeProportion from "./statistics/getSampleSizeProportion.ts";
import getSampleSizeMean from "./statistics/getSampleSizeMean.ts";
import performZTest from "./statistics/performZTest.ts";

export {
  addClusters,
  addMahalanobisDistance,
  addSheetRows,
  addZScore,
  adjustToInflation,
  arraysToData,
  askAI,
  camelCase,
  capitalize,
  createDirectory,
  dataAsCsv,
  dataToArrays,
  deleteFromBucket,
  distance,
  downloadFile,
  downloadFromBucket,
  DurationTracker,
  euclidianDistance,
  filesInBucket,
  formatDate,
  formatNumber,
  geoTo3D,
  getClosest,
  getCovarianceMatrix,
  getEmbedding,
  getEnvironmentCanadaRecords,
  getGeoTiffDetails,
  getGeoTiffValues,
  getHtmlTable,
  getHumidex,
  getId,
  getMahalanobisDistance,
  getSampleSizeMean,
  getSampleSizeProportion,
  getSeason,
  getSheetData,
  getStatCanTable,
  getYahooFinanceData,
  inBucket,
  invertMatrix,
  logBarChart,
  logDotChart,
  logLineChart,
  mortgageInsurancePremium,
  mortgageMaxAmount,
  mortgagePayments,
  overwriteSheetData,
  performZTest,
  prettyDuration,
  publishChartDW,
  reencode,
  removeDirectory,
  rewind,
  round,
  saveChart,
  sleep,
  styledLayerDescriptor,
  toBucket,
  unzip,
  updateAnnotationsDW,
  updateDataDW,
  updateNotesDW,
  zip,
};
