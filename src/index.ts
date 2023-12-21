import formatDate from "./format/formatDate.js"
import formatDateLocal from "./format/formatDateLocal.js"
import formatNumber from "./format/formatNumber.js"
import round from "./format/round.js"
import geoTo3D from "./geo/geoTo3D.js"
import distance from "./geo/distance.js"
import adjustToInflation from "./finance/adjustToInflation.js"
import mortgagePayments from "./finance/mortgagePayments.js"
import mortgageInsurancePremium from "./finance/mortgageInsurancePremium.js"
import mortgageMaxAmount from "./finance/mortgageMaxAmount.js"
import getClosest from "./geo/getClosest.js"
import getHumidex from "./weather/getHumidex.js"
import getStatCanTable from "./web-scraping/getStatCanTable.js"

export {
    formatDate,
    formatDateLocal,
    formatNumber,
    round,
    geoTo3D,
    distance,
    adjustToInflation,
    mortgagePayments,
    mortgageInsurancePremium,
    mortgageMaxAmount,
    getClosest,
    getHumidex,
    // NODE ONLY
    getStatCanTable,
}
