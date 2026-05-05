"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addMahalanobisDistance;
const getCovarianceMatrix_js_1 = __importDefault(require("./getCovarianceMatrix.js"));
const getMahalanobisDistance_js_1 = __importDefault(require("./getMahalanobisDistance.js"));
// Implementation
function addMahalanobisDistance(origin, data, options = {}) {
    const variables = Object.keys(origin);
    const originArray = variables.map((v) => origin[v]);
    const dataArray = data.map((d) => variables.map((v) => d[v]));
    const invertedCovarianceMatrix = Array.isArray(options.matrix)
        ? options.matrix
        : (0, getCovarianceMatrix_js_1.default)(dataArray, // getCovarianceMatrix will check the types
        {
            invert: true,
        });
    data.forEach((d) => (d.mahaDist = (0, getMahalanobisDistance_js_1.default)(originArray, variables.map((v) => d[v]), // types checked in getCovarianceMatrix
    invertedCovarianceMatrix)));
    if (options.similarity) {
        const maxDist = Math.max(...data.map((d) => d.mahaDist));
        data.forEach((d) => (d.similarity = 1 -
            d.mahaDist / maxDist));
    }
    return data;
}
