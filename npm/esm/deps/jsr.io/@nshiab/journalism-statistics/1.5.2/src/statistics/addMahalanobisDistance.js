import getCovarianceMatrix from "./getCovarianceMatrix.js";
import getMahalanobisDistance from "./getMahalanobisDistance.js";
// Implementation
export default function addMahalanobisDistance(origin, data, options = {}) {
    const variables = Object.keys(origin);
    const originArray = variables.map((v) => origin[v]);
    const dataArray = data.map((d) => variables.map((v) => d[v]));
    const invertedCovarianceMatrix = Array.isArray(options.matrix)
        ? options.matrix
        : getCovarianceMatrix(dataArray, // getCovarianceMatrix will check the types
        {
            invert: true,
        });
    data.forEach((d) => (d.mahaDist = getMahalanobisDistance(originArray, variables.map((v) => d[v]), // types checked in getCovarianceMatrix
    invertedCovarianceMatrix)));
    if (options.similarity) {
        const maxDist = Math.max(...data.map((d) => d.mahaDist));
        data.forEach((d) => (d.similarity = 1 -
            d.mahaDist / maxDist));
    }
    return data;
}
