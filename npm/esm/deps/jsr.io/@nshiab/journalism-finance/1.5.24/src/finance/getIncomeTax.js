// Cache the result of calculateBaseTax when capitalGains=0 (which is always the
// first call inside getIncomeTax). The inputs that affect the no-gains result are
// (employmentIncome, province, year, rrsp, ramq, livingAlone) — all fixed for a
// given simulation run, yielding an effective hit rate of ~100% after the first call.
const _baseTaxCache = new Map();
const FEDERAL_LIMITS = {
    2025: {
        maxBPA: 16129,
        minBPA: 14538,
        phaseOutStart: 177882,
        phaseOutEnd: 253414,
        maxCEA: 1471,
        quebecAbatementRate: 0.165,
        topUpCreditRate: 0.15,
        capitalGainsInclusionRate: 0.5,
    },
};
const PROVINCIAL_BPA = {
    2025: {
        "Yukon": FEDERAL_LIMITS[2025].maxBPA,
        "Manitoba": 15780,
        "Alberta": 22323,
        "Saskatchewan": 19491,
        "Nunavut": 19274,
        "Quebec": 18571,
        "Northwest Territories": 17842,
        "Prince Edward Island": 14650,
        "New Brunswick": 13396,
        "British Columbia": 12932,
        "Ontario": 12747,
        "Nova Scotia": 11744,
        "Newfoundland and Labrador": 11067,
    },
};
const PAYROLL_LIMITS = {
    2025: {
        ympe: 71300,
        yampe: 81200,
        basicExemption: 3500,
        eiMaxEarnings: 65700,
        qpipMaxEarnings: 98000,
        qppBaseRate: 0.054, // QPP Base
        qppEnhancedRate: 0.01, // QPP Tier 1 Enhanced
        cppBaseRate: 0.0495, // CPP Base
        cppEnhancedRate: 0.01, // CPP Tier 1 Enhanced
        cpp2Rate: 0.04, // CPP2 / QPP2 Tier 2
        eiRateQC: 0.0131,
        eiRate: 0.0164,
        qpipRate: 0.00494,
    },
};
const ONTARIO_LIMITS = {
    2025: {
        baseOTRAmount: 294,
        surtaxThreshold1: 5710,
        surtaxThreshold2: 7307,
        surtaxRate1: 0.20,
        surtaxRate2: 0.36,
        liftMax: 875,
        liftRate: 0.0505,
        liftPhaseOutStart: 32500,
        liftPhaseOutRate: 0.05,
        healthPremiumThreshold1: 20000,
        healthPremiumThreshold2: 36000,
        healthPremiumThreshold3: 48000,
        healthPremiumThreshold4: 72000,
        healthPremiumThreshold5: 200000,
        healthPremiumRate1: 0.06,
        healthPremiumRate2: 0.25,
        healthPremiumBase2: 300,
        healthPremiumBase3: 450,
        healthPremiumBase4: 600,
        healthPremiumBase5: 750,
        healthPremiumMax4: 750,
        healthPremiumMax5: 900,
    },
};
const QUEBEC_LIMITS = {
    2025: {
        deductionForWorkersRate: 0.06,
        maxDeductionForWorkers: 1420,
        nrtcRate: 0.14,
        ramqMaxPremium: 755,
        ramqExemptionThreshold: 19890,
        ramqTier1MaxIncome: 5000,
        ramqTier1Rate: 0.0784,
        ramqTier2Rate: 0.1176,
        personLivingAloneAmount: 2128,
        personLivingAloneThreshold: 42090,
        personLivingAloneReductionRate: 0.15,
    },
};
const BC_LIMITS = {
    2025: {
        baseAmount: 562,
        threshold: 25020,
        reductionFactor: 0.0356,
    },
};
const NB_LIMITS = {
    2025: {
        baseAmount: 802,
        threshold: 21920,
        reductionFactor: 0.03,
    },
};
const NL_LIMITS = {
    2025: {
        baseAmount: 997,
        threshold: 23928,
        reductionFactor: 0.16,
    },
};
const NS_LIMITS = {
    2025: {
        baseAmount: 300,
        threshold: 15100,
        reductionFactor: 0.05,
    },
};
const PEI_LIMITS = {
    2025: {
        baseAmount: 350,
        threshold: 22650,
        reductionFactor: 0.05,
    },
};
const MB_LIMITS = {
    2025: {
        phaseOutThreshold1: 200000,
        phaseOutThreshold2: 400000,
        familyTaxBenefitBase: 2065,
        familyTaxBenefitReductionRate: 0.09,
    },
};
const FEDERAL_BRACKETS = {
    2025: [
        { rate: 0.145, threshold: 0 },
        { rate: 0.205, threshold: 57375 },
        { rate: 0.26, threshold: 114750 },
        { rate: 0.29, threshold: 177882 },
        { rate: 0.33, threshold: 253414 },
    ],
};
const PROVINCIAL_BRACKETS = {
    2025: {
        "Ontario": [
            { rate: 0.0505, threshold: 0 },
            { rate: 0.0915, threshold: 52886 },
            { rate: 0.1116, threshold: 105775 },
            { rate: 0.1216, threshold: 150000 },
            { rate: 0.1316, threshold: 220000 },
        ],
        "Quebec": [
            { rate: 0.14, threshold: 0 },
            { rate: 0.19, threshold: 53255 },
            { rate: 0.24, threshold: 106495 },
            { rate: 0.2575, threshold: 129590 },
        ],
        "British Columbia": [
            { rate: 0.0506, threshold: 0 },
            { rate: 0.077, threshold: 49279 },
            { rate: 0.105, threshold: 98560 },
            { rate: 0.1229, threshold: 113158 },
            { rate: 0.147, threshold: 137407 },
            { rate: 0.168, threshold: 186306 },
            { rate: 0.205, threshold: 259829 },
        ],
        "Alberta": [
            { rate: 0.08, threshold: 0 },
            { rate: 0.10, threshold: 60000 },
            { rate: 0.12, threshold: 151234 },
            { rate: 0.13, threshold: 181481 },
            { rate: 0.14, threshold: 241974 },
            { rate: 0.15, threshold: 362961 },
        ],
        "Manitoba": [
            { rate: 0.108, threshold: 0 },
            { rate: 0.1275, threshold: 47000 },
            { rate: 0.174, threshold: 100000 },
        ],
        "Saskatchewan": [
            { rate: 0.105, threshold: 0 },
            { rate: 0.125, threshold: 53463 },
            { rate: 0.145, threshold: 152750 },
        ],
        "Nova Scotia": [
            { rate: 0.0879, threshold: 0 },
            { rate: 0.1495, threshold: 30507 },
            { rate: 0.1667, threshold: 61015 },
            { rate: 0.175, threshold: 95883 },
            { rate: 0.21, threshold: 154650 },
        ],
        "New Brunswick": [
            { rate: 0.094, threshold: 0 },
            { rate: 0.14, threshold: 51306 },
            { rate: 0.16, threshold: 102614 },
            { rate: 0.195, threshold: 190060 },
        ],
        "Newfoundland and Labrador": [
            { rate: 0.087, threshold: 0 },
            { rate: 0.145, threshold: 44192 },
            { rate: 0.158, threshold: 88382 },
            { rate: 0.178, threshold: 157792 },
            { rate: 0.198, threshold: 220910 },
            { rate: 0.208, threshold: 282214 },
            { rate: 0.213, threshold: 564429 },
            { rate: 0.218, threshold: 1128858 },
        ],
        "Prince Edward Island": [
            { rate: 0.095, threshold: 0 },
            { rate: 0.1347, threshold: 33328 },
            { rate: 0.166, threshold: 64656 },
            { rate: 0.1762, threshold: 105000 },
            { rate: 0.19, threshold: 140000 },
        ],
        "Yukon": [
            { rate: 0.064, threshold: 0 },
            { rate: 0.09, threshold: 57375 },
            { rate: 0.109, threshold: 114750 },
            { rate: 0.128, threshold: 177882 },
            { rate: 0.15, threshold: 500000 },
        ],
        "Northwest Territories": [
            { rate: 0.059, threshold: 0 },
            { rate: 0.086, threshold: 51964 },
            { rate: 0.122, threshold: 103930 },
            { rate: 0.1405, threshold: 168967 },
        ],
        "Nunavut": [
            { rate: 0.04, threshold: 0 },
            { rate: 0.07, threshold: 54707 },
            { rate: 0.09, threshold: 109413 },
            { rate: 0.115, threshold: 177881 },
        ],
    },
};
function calculateTax(income, brackets) {
    let tax = 0;
    let marginalRate = 0;
    for (let i = 0; i < brackets.length; i++) {
        const currentBracket = brackets[i];
        const nextBracket = brackets[i + 1];
        const threshold = currentBracket.threshold;
        const nextThreshold = nextBracket ? nextBracket.threshold : Infinity;
        if (income >= threshold) {
            marginalRate = currentBracket.rate;
            const taxableInThisBracket = Math.min(income, nextThreshold) - threshold;
            if (taxableInThisBracket > 0) {
                tax += taxableInThisBracket * currentBracket.rate;
            }
        }
        else {
            break;
        }
    }
    return { amount: tax, marginalRate };
}
function getPayrollDeductions(employmentIncome, province, year) {
    const limits = PAYROLL_LIMITS[year];
    let cppOrQppBase = 0;
    let cppOrQppEnhanced = 0;
    let cpp2OrQpp2 = 0;
    let ei = 0;
    let qpip = 0;
    if (province === "Quebec") {
        const qppPensionable = Math.max(0, Math.min(employmentIncome, limits.ympe) - limits.basicExemption);
        cppOrQppBase = qppPensionable * limits.qppBaseRate;
        cppOrQppEnhanced = qppPensionable * limits.qppEnhancedRate;
        const qpp2Pensionable = Math.max(0, Math.min(employmentIncome, limits.yampe) - limits.ympe);
        cpp2OrQpp2 = qpp2Pensionable * limits.cpp2Rate;
        ei = Math.min(employmentIncome, limits.eiMaxEarnings) * limits.eiRateQC;
        qpip = Math.min(employmentIncome, limits.qpipMaxEarnings) * limits.qpipRate;
    }
    else {
        const cppPensionable = Math.max(0, Math.min(employmentIncome, limits.ympe) - limits.basicExemption);
        cppOrQppBase = cppPensionable * limits.cppBaseRate;
        cppOrQppEnhanced = cppPensionable * limits.cppEnhancedRate;
        const cpp2Pensionable = Math.max(0, Math.min(employmentIncome, limits.yampe) - limits.ympe);
        cpp2OrQpp2 = cpp2Pensionable * limits.cpp2Rate;
        ei = Math.min(employmentIncome, limits.eiMaxEarnings) * limits.eiRate;
    }
    return { cppOrQppBase, cppOrQppEnhanced, cpp2OrQpp2, ei, qpip };
}
function getFederalBPA(income, year) {
    const limits = FEDERAL_LIMITS[year];
    if (income <= limits.phaseOutStart)
        return limits.maxBPA;
    if (income >= limits.phaseOutEnd)
        return limits.minBPA;
    const phaseOutRatio = (income - limits.phaseOutStart) /
        (limits.phaseOutEnd - limits.phaseOutStart);
    return limits.maxBPA - (phaseOutRatio * (limits.maxBPA - limits.minBPA));
}
function applyOntarioTaxReduction(basicTax, year) {
    const limits = ONTARIO_LIMITS[year];
    const potentialReduction = (limits.baseOTRAmount * 2) - basicTax;
    if (potentialReduction > 0) {
        const reducedTax = Math.max(0, basicTax - potentialReduction);
        return { reducedTax, reductionAmount: basicTax - reducedTax };
    }
    return { reducedTax: basicTax, reductionAmount: 0 };
}
function getOntarioSurtax(basicOntarioTax, year) {
    const limits = ONTARIO_LIMITS[year];
    let surtaxAmount = 0;
    let marginalMultiplier = 1;
    if (basicOntarioTax > limits.surtaxThreshold1) {
        surtaxAmount += limits.surtaxRate1 *
            (basicOntarioTax - limits.surtaxThreshold1);
        marginalMultiplier += limits.surtaxRate1;
    }
    if (basicOntarioTax > limits.surtaxThreshold2) {
        surtaxAmount += limits.surtaxRate2 *
            (basicOntarioTax - limits.surtaxThreshold2);
        marginalMultiplier += limits.surtaxRate2;
    }
    return { surtaxAmount, marginalMultiplier };
}
function getOntarioLIFTCredit(employmentIncome, netIncome, // In this basic scenario, taxableIncome works fine
basicOntarioTax, year) {
    if (basicOntarioTax <= 0)
        return 0;
    const limits = ONTARIO_LIMITS[year];
    const maxLift = Math.min(limits.liftMax, employmentIncome * limits.liftRate);
    const phaseOut = Math.max(0, (netIncome - limits.liftPhaseOutStart) * limits.liftPhaseOutRate);
    const liftCredit = Math.max(0, maxLift - phaseOut);
    return Math.min(basicOntarioTax, liftCredit);
}
function getOntarioHealthPremium(taxableIncome, year) {
    const limits = ONTARIO_LIMITS[year];
    if (taxableIncome <= limits.healthPremiumThreshold1)
        return 0;
    if (taxableIncome <= limits.healthPremiumThreshold2) {
        return Math.min(limits.healthPremiumBase2, (taxableIncome - limits.healthPremiumThreshold1) *
            limits.healthPremiumRate1);
    }
    if (taxableIncome <= limits.healthPremiumThreshold3) {
        return Math.min(limits.healthPremiumBase3, limits.healthPremiumBase2 +
            (taxableIncome - limits.healthPremiumThreshold2) *
                limits.healthPremiumRate1);
    }
    if (taxableIncome <= limits.healthPremiumThreshold4) {
        return Math.min(limits.healthPremiumBase4, limits.healthPremiumBase3 +
            (taxableIncome - limits.healthPremiumThreshold3) *
                limits.healthPremiumRate2);
    }
    if (taxableIncome <= limits.healthPremiumThreshold5) {
        return Math.min(limits.healthPremiumMax4, limits.healthPremiumBase4 +
            (taxableIncome - limits.healthPremiumThreshold4) *
                limits.healthPremiumRate2);
    }
    return Math.min(limits.healthPremiumMax5, limits.healthPremiumBase5 +
        (taxableIncome - limits.healthPremiumThreshold5) *
            limits.healthPremiumRate2);
}
function getQuebecRAMQ(netIncome, year) {
    const limits = QUEBEC_LIMITS[year];
    if (!limits)
        return 0;
    // No premium if income is below the exemption threshold
    if (netIncome <= limits.ramqExemptionThreshold) {
        return 0;
    }
    const excessIncome = netIncome - limits.ramqExemptionThreshold;
    let calculatedPremium = 0;
    // Tier 1: First $5,000 of excess income
    const tier1Income = Math.min(excessIncome, limits.ramqTier1MaxIncome);
    calculatedPremium += tier1Income * limits.ramqTier1Rate;
    // Tier 2: Any excess income over $5,000
    if (excessIncome > limits.ramqTier1MaxIncome) {
        const tier2Income = excessIncome - limits.ramqTier1MaxIncome;
        calculatedPremium += tier2Income * limits.ramqTier2Rate;
    }
    // Return the calculated premium, capped at the legal maximum
    return Math.round(Math.min(limits.ramqMaxPremium, calculatedPremium));
}
function getBCTaxReduction(netProvincialTax, taxableIncome, year) {
    const limits = BC_LIMITS[year];
    if (!limits)
        return 0;
    const reduction = limits.baseAmount -
        (taxableIncome - limits.threshold) * limits.reductionFactor;
    return Math.max(0, Math.min(netProvincialTax, reduction));
}
function getNBTaxReduction(netProvincialTax, taxableIncome, year) {
    const limits = NB_LIMITS[year];
    if (!limits)
        return 0;
    const excess = Math.max(0, taxableIncome - limits.threshold);
    const reduction = limits.baseAmount - (excess * limits.reductionFactor);
    return Math.max(0, Math.min(netProvincialTax, reduction));
}
function getNLTaxReduction(netProvincialTax, taxableIncome, year) {
    const limits = NL_LIMITS[year];
    if (!limits)
        return 0;
    const excess = Math.max(0, taxableIncome - limits.threshold);
    const reduction = limits.baseAmount - (excess * limits.reductionFactor);
    return Math.max(0, Math.min(netProvincialTax, reduction));
}
function getNSTaxReduction(netProvincialTax, taxableIncome, year) {
    const limits = NS_LIMITS[year];
    if (!limits)
        return 0;
    // The clawback applies to income over the threshold
    const excess = Math.max(0, taxableIncome - limits.threshold);
    const reduction = limits.baseAmount - (excess * limits.reductionFactor);
    return Math.max(0, Math.min(netProvincialTax, reduction));
}
function getPEITaxReduction(netProvincialTax, taxableIncome, year) {
    const limits = PEI_LIMITS[year];
    if (!limits)
        return 0;
    const excess = Math.max(0, taxableIncome - limits.threshold);
    const reduction = limits.baseAmount - (excess * limits.reductionFactor);
    return Math.max(0, Math.min(netProvincialTax, reduction));
}
function getTaxableCapitalGains(capitalGains, year) {
    return Math.max(0, capitalGains * FEDERAL_LIMITS[year].capitalGainsInclusionRate);
}
/**
 * Core engine for computing Canadian income taxes based on a unified income figure.
 * Does not isolate marginal tax differences (such as those needed for strictly computing capital gains rates).
 * Use `getIncomeTax` instead for the full breakdown with capital gains wrappers.
 */
function calculateBaseTax(employmentIncome, province, year, options = {}) {
    const deductions = getPayrollDeductions(employmentIncome, province, year);
    const taxableCapitalGains = getTaxableCapitalGains(options.capitalGains || 0, year);
    const rrspDeduction = options.rrsp || 0;
    // CRITICAL STEP: Enhanced Tier 1 (CPP/QPP), Tier 2 (CPP2/QPP2), and RRSP contributions are direct deductions from taxable income.
    const taxableIncome = Math.max(0, employmentIncome + taxableCapitalGains - deductions.cppOrQppEnhanced -
        deductions.cpp2OrQpp2 - rrspDeduction);
    const federalBrackets = FEDERAL_BRACKETS[year];
    const federalResult = calculateTax(taxableIncome, federalBrackets);
    const federalGrossTax = federalResult.amount;
    const federalLimits = FEDERAL_LIMITS[year];
    const federalBpaAmount = getFederalBPA(taxableIncome, year);
    const canadaEmploymentAmount = Math.min(employmentIncome, federalLimits.maxCEA);
    // NRTC base only uses the BASE CPP/QPP contribution.
    const federalNRTCBase = federalBpaAmount + deductions.cppOrQppBase +
        deductions.ei + deductions.qpip + canadaEmploymentAmount;
    // The rate for non-refundable tax credits is reduced to 14.5% in 2025.
    // However, the Top-Up Tax Credit maintains the 15% rate for credits claimed
    // on amounts in excess of the first bracket threshold ($57,375).
    const firstBracketThreshold = federalBrackets[1].threshold;
    const baseNRTCRate = federalBrackets[0].rate;
    let federalCreditTotal = 0;
    if (taxableIncome > firstBracketThreshold &&
        federalNRTCBase > firstBracketThreshold) {
        // If NRTC base and taxable income exceed threshold,
        // the portion of NRTC base above threshold gets 15%
        const amountAtFirstRate = firstBracketThreshold;
        const amountAtTopUpRate = federalNRTCBase - firstBracketThreshold;
        federalCreditTotal = (amountAtFirstRate * baseNRTCRate) +
            (amountAtTopUpRate * federalLimits.topUpCreditRate);
    }
    else {
        // Otherwise, the standard reduced rate applies to the whole base
        federalCreditTotal = federalNRTCBase * baseNRTCRate;
    }
    const appliedFederalCredits = Math.min(federalGrossTax, federalCreditTotal);
    let netFederalTax = federalGrossTax - appliedFederalCredits;
    let quebecAbatement = 0;
    if (province === "Quebec") {
        quebecAbatement = netFederalTax * federalLimits.quebecAbatementRate;
        netFederalTax = Math.max(0, netFederalTax - quebecAbatement);
    }
    let provincialTaxableIncome = taxableIncome;
    if (province === "Quebec") {
        const qcLimits = QUEBEC_LIMITS[year];
        const deductionForWorkers = Math.min(qcLimits.maxDeductionForWorkers, employmentIncome * qcLimits.deductionForWorkersRate);
        provincialTaxableIncome = Math.max(0, taxableIncome - deductionForWorkers);
    }
    const provincialBrackets = PROVINCIAL_BRACKETS[year][province];
    const provincialResult = calculateTax(provincialTaxableIncome, provincialBrackets);
    const provincialGrossTax = provincialResult.amount;
    let provincialBpaAmount = PROVINCIAL_BPA[year][province];
    // Yukon's BPA dynamically mirrors the federal phase-out
    if (province === "Yukon") {
        provincialBpaAmount = getFederalBPA(taxableIncome, year);
    }
    if (province === "Manitoba") {
        const mbLimits = MB_LIMITS[year];
        if (taxableIncome > mbLimits.phaseOutThreshold1) {
            const phaseOutRatio = (taxableIncome - mbLimits.phaseOutThreshold1) /
                (mbLimits.phaseOutThreshold2 - mbLimits.phaseOutThreshold1);
            provincialBpaAmount = taxableIncome >= mbLimits.phaseOutThreshold2
                ? 0
                : provincialBpaAmount - (provincialBpaAmount * phaseOutRatio);
        }
    }
    let provincialNRTCBase = provincialBpaAmount + deductions.cppOrQppBase +
        deductions.ei;
    if (province === "Yukon") {
        provincialNRTCBase += canadaEmploymentAmount;
    }
    if (province === "Quebec") {
        provincialNRTCBase += deductions.qpip;
        const applyLivingAlone = options.quebec?.livingAlone !== false;
        if (applyLivingAlone) {
            // Apply the Quebec Amount for a Person Living Alone
            const qcLimits = QUEBEC_LIMITS[year];
            // Quebec calculates the phase-out against Net Income.
            // provincialTaxableIncome is our closest accurate proxy here.
            const excessIncome = Math.max(0, provincialTaxableIncome - qcLimits.personLivingAloneThreshold);
            const livingAloneClawback = excessIncome *
                qcLimits.personLivingAloneReductionRate;
            const netLivingAloneAmount = Math.max(0, qcLimits.personLivingAloneAmount - livingAloneClawback);
            provincialNRTCBase += netLivingAloneAmount;
        }
    }
    // Manitoba Family Tax Benefit
    if (province === "Manitoba") {
        const mbLimits = MB_LIMITS[year];
        const mbFamilyTaxBenefit = Math.max(0, mbLimits.familyTaxBenefitBase -
            (taxableIncome * mbLimits.familyTaxBenefitReductionRate));
        provincialNRTCBase += mbFamilyTaxBenefit;
    }
    // Decoupled Quebec's specific 15% NRTC rate from its 14% lowest tax bracket
    const provincialNRTCRate = province === "Quebec"
        ? QUEBEC_LIMITS[year].nrtcRate
        : provincialBrackets[0].rate;
    const provincialCreditTotal = provincialNRTCBase * provincialNRTCRate;
    const appliedProvincialCredits = Math.min(provincialGrossTax, provincialCreditTotal);
    let netProvincialTax = provincialGrossTax - appliedProvincialCredits;
    let provincialMarginalRate = provincialResult.marginalRate;
    let ontarioTaxReduction = 0;
    let bcTaxReduction = 0;
    let nbTaxReduction = 0;
    let nlTaxReduction = 0;
    let nsTaxReduction = 0;
    let peiTaxReduction = 0;
    let ontarioSurtaxAmount = 0;
    let healthPremium = 0;
    if (province === "Ontario") {
        const { surtaxAmount, marginalMultiplier } = getOntarioSurtax(netProvincialTax, year);
        ontarioSurtaxAmount = surtaxAmount;
        const otrResult = applyOntarioTaxReduction(netProvincialTax + ontarioSurtaxAmount, year);
        netProvincialTax = otrResult.reducedTax;
        ontarioTaxReduction = otrResult.reductionAmount;
        const liftCredit = getOntarioLIFTCredit(employmentIncome, taxableIncome, netProvincialTax, year);
        netProvincialTax -= liftCredit;
        ontarioTaxReduction += liftCredit; // Bundle it with the OTR output for summation
        if (netProvincialTax > 0) {
            provincialMarginalRate *= marginalMultiplier;
        }
        // Health premium is calculated against Taxable Income, not Gross Income
        healthPremium = getOntarioHealthPremium(taxableIncome, year);
    }
    if (province === "Quebec") {
        const computeRamq = options.quebec?.ramq !== false;
        if (computeRamq) {
            healthPremium = getQuebecRAMQ(taxableIncome, year);
        }
    }
    if (province === "British Columbia") {
        bcTaxReduction = getBCTaxReduction(netProvincialTax, taxableIncome, year);
        netProvincialTax -= bcTaxReduction;
    }
    if (province === "New Brunswick") {
        nbTaxReduction = getNBTaxReduction(netProvincialTax, taxableIncome, year);
        netProvincialTax -= nbTaxReduction;
    }
    if (province === "Newfoundland and Labrador") {
        nlTaxReduction = getNLTaxReduction(netProvincialTax, taxableIncome, year);
        netProvincialTax -= nlTaxReduction;
    }
    if (province === "Nova Scotia") {
        nsTaxReduction = getNSTaxReduction(netProvincialTax, taxableIncome, year);
        netProvincialTax -= nsTaxReduction;
    }
    if (province === "Prince Edward Island") {
        peiTaxReduction = getPEITaxReduction(netProvincialTax, taxableIncome, year);
        netProvincialTax -= peiTaxReduction;
    }
    const roundedFedGross = Math.round(federalGrossTax);
    const roundedFedCredits = -Math.round(appliedFederalCredits);
    const roundedQcAbatment = -Math.round(quebecAbatement);
    const roundedProvGross = Math.round(provincialGrossTax);
    const roundedProvCredits = -Math.round(appliedProvincialCredits);
    const totalProvincialTaxReduction = -Math.round(ontarioTaxReduction + bcTaxReduction + nbTaxReduction + nlTaxReduction +
        nsTaxReduction + peiTaxReduction);
    const roundedOntarioSurtax = Math.round(ontarioSurtaxAmount);
    const roundedHealthPrem = Math.round(healthPremium);
    const roundedCppBase = Math.round(deductions.cppOrQppBase);
    const roundedCppEnhanced = Math.round(deductions.cppOrQppEnhanced);
    const roundedCpp2 = Math.round(deductions.cpp2OrQpp2);
    const roundedEi = Math.round(deductions.ei);
    const roundedQpip = Math.round(deductions.qpip);
    const totalSum = roundedFedGross +
        roundedFedCredits +
        roundedQcAbatment +
        roundedProvGross +
        roundedProvCredits +
        totalProvincialTaxReduction +
        roundedOntarioSurtax +
        roundedHealthPrem +
        roundedCppBase +
        roundedCppEnhanced +
        roundedCpp2 +
        roundedEi +
        roundedQpip;
    return {
        federalRate: federalResult.marginalRate,
        provincialRate: provincialMarginalRate,
        grossFederalTax: roundedFedGross,
        appliedFederalCredits: roundedFedCredits,
        federalAbatement: roundedQcAbatment,
        grossProvincialTax: roundedProvGross,
        appliedProvincialCredits: roundedProvCredits,
        provincialTaxReduction: totalProvincialTaxReduction,
        provincialSurtax: roundedOntarioSurtax,
        healthPremium: roundedHealthPrem,
        cppOrQppBase: roundedCppBase,
        cppOrQppEnhanced: roundedCppEnhanced,
        cpp2OrQpp2Premium: roundedCpp2,
        eiPremium: roundedEi,
        qpipPremium: roundedQpip,
        totalTaxAndPremiums: totalSum,
    };
}
/**
 * Calculates a comprehensive breakdown of Canadian federal and provincial income taxes, including capital gains.
 *
 * Calculation Engine Methodology:
 *
 * **1. Mandatory Payroll Deductions:**
 * - Calculates Tier 1 CPP/QPP base contribution (claimed as a Non-Refundable Tax Credit (NRTC)).
 * - Calculates Tier 1 CPP/QPP enhanced contribution (claimed as a tax deduction).
 * - Calculates Tier 2 CPP2/QPP2 based on the Yearly Additional Maximum Pensionable Earnings (YAMPE) (claimed as a tax deduction).
 * - Calculates EI (and QPIP for Quebec residents) up to their respective annual maximum insurable earnings.
 *
 * **2. Federal Tax & Non-Refundable Tax Credits (NRTCs):**
 * - Calculates gross federal tax using progressive federal tax brackets.
 * - Determines the Federal Basic Personal Amount (BPA), applying a linear phase-out for high earners.
 * - Calculates the Canada Employment Amount (CEA) against employment income up to the annual maximum.
 * - Aggregates the federal NRTC base (BPA + Base CPP/QPP + EI + QPIP + CEA) and converts it to a credit amount, accounting for the 15% top-up credit rate for amounts above the first bracket threshold.
 * - Applies the Federal Abatement exclusively for Quebec residents.
 *
 * **3. Provincial Tax & NRTCs:**
 * - Calculates gross provincial tax using the specific province's progressive tax brackets.
 * - **Quebec-Specific:** Applies the Deduction for Workers as an income reduction before tax calculation. Applies the Person Living Alone amount to the NRTC base (if applicable). Uses a decoupled NRTC rate.
 * - Retrieves the provincial BPA, executing a specific linear phase-out for Manitoba residents, and dynamically mirroring the federal BPA phase-out for Yukon residents.
 * - Aggregates the provincial NRTC base (Provincial BPA + Base CPP/QPP + EI + QPIP if in Quebec + CEA if in Yukon + Family Tax Benefit if in Manitoba).
 *
 * **4. Provincial-Specific Modifiers (If Applicable):**
 * - **B.C. Tax Reduction:** A non-refundable credit for B.C. residents with low-to-moderate taxable income (subject to phase-out).
 * - **New Brunswick Tax Reduction:** A non-refundable credit for N.B. residents with low-to-moderate taxable income (subject to phase-out).
 * - **Newfoundland and Labrador Tax Reduction:** A non-refundable credit for N.L. residents with low-to-moderate taxable income (subject to phase-out).
 * - **Nova Scotia Tax Reduction:** A non-refundable credit for N.S. residents with low-to-moderate taxable income (subject to phase-out).
 * - **Prince Edward Island Tax Reduction:** A non-refundable credit for P.E.I. residents with low-to-moderate taxable income (subject to phase-out).
 * - **Ontario Tax Reduction (OTR) & LIFT:** Reduces or eliminates basic Ontario tax for low-income earners, and applies the Low-income Individuals and Families Tax (LIFT) Credit.
 * - **Ontario Surtax:** Applies a two-tier cascading surtax on net provincial tax in Ontario.
 * - **Provincial Health Premiums:** Calculates the Ontario Health Premium based on strict taxable income bands, and the Quebec RAMQ premium based on income thresholds.
 *
 * **5. Capital Gains:**
 * - Applies a 50% inclusion rate to any provided capital gains.
 * - Isolates the exact tax burden associated with those capital gains by computing the marginal difference between a "with gains" and "without gains" tax profile.
 *
 * @param employmentIncome - The individual's total gross annual taxable employment income (assumes T4 income).
 * @param province - The Canadian province or territory of residence.
 * @param year - The specific tax year.
 * @param options - Additional options for specific tax scenarios. Includes `quebec.ramq`, `quebec.livingAlone`, `capitalGains`, and `rrsp`.
 *
 * @example
 * // Basic scenario: $100k employment income in Ontario
 * getIncomeTax(100000, "Ontario", 2025);
 *
 * @example
 * // With options: $80k employment income in Quebec, with $10k RRSP contribution and $5k Capital Gains, excluding RAMQ
 * getIncomeTax(80000, "Quebec", 2025, {
 *   rrsp: 10000,
 *   capitalGains: 5000,
 *   quebec: { ramq: false }
 * });
 *
 * @returns A fully itemized object containing marginal rates, gross taxes, applied negative-valued credits, mandatory premiums, and the verified total deduction sum.
 * NOTE: The property `capitalGainsTax` is informational only and explicitly shows the isolated tax burden generated by `options.capitalGains`. The base properties (`grossFederalTax`, `grossProvincialTax`, etc.) already have the capital gains tax baked into them. Summing all itemized deductions plus `capitalGainsTax` will result in double-counting!
 */
export default function getIncomeTax(employmentIncome, province, year, options = {}) {
    const rawCapitalGains = options.capitalGains || 0;
    const _cacheKey = `${employmentIncome}|${province}|${year}|${options.rrsp ?? 0}|${options.quebec?.ramq ?? false}|${options.quebec?.livingAlone ?? false}`;
    let taxWithoutGains = _baseTaxCache.get(_cacheKey);
    if (!taxWithoutGains) {
        taxWithoutGains = calculateBaseTax(employmentIncome, province, year, {
            ...options,
            capitalGains: 0,
        });
        _baseTaxCache.set(_cacheKey, taxWithoutGains);
    }
    if (rawCapitalGains <= 0) {
        return {
            ...taxWithoutGains,
            taxableCapitalGains: 0,
            capitalGainsTax: 0,
            capitalGainsRate: 0,
        };
    }
    const taxWithGains = calculateBaseTax(employmentIncome, province, year, options);
    const taxableCapitalGains = getTaxableCapitalGains(rawCapitalGains, year);
    const capitalGainsTax = Math.max(0, taxWithGains.totalTaxAndPremiums - taxWithoutGains.totalTaxAndPremiums);
    const capitalGainsRate = capitalGainsTax / rawCapitalGains;
    return {
        ...taxWithGains,
        taxableCapitalGains,
        capitalGainsTax,
        capitalGainsRate,
    };
}
