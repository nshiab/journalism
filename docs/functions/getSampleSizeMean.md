[**Journalism v4.0.2**](../index.md)

***

[Journalism](../globals.md) / getSampleSizeMean

# Function: getSampleSizeMean()

> **getSampleSizeMean**\<`T`\>(`data`, `key`, `confidenceLevel`, `marginOfError`, `options?`): `number`

Defined in: [journalism-statistics/src/statistics/getSampleSizeMean.ts:74](https://github.com/nshiab/journalism-statistics/blob/v1.5.9/src/statistics/getSampleSizeMean.ts#L74)

Calculates the required sample size for estimating a population mean with a specified confidence level and margin of error.

The function uses the finite population correction formula. It calculates the sample standard deviation from the provided data to estimate the population standard deviation, which is then used in the sample size calculation.

**When to use this function:**
- Use when you want to estimate the average (mean) value of a numeric variable in a population
- When your outcome is continuous/numeric data (income, age, test scores, measurements, etc.)
- When you need to answer questions like "What's the average household income?" or "What's the mean temperature?"
- When you have existing data to calculate the standard deviation from

**Use `getSampleSizeProportion` instead when:**
- You want to estimate what percentage/proportion of a population has a certain characteristic
- Your outcome is categorical (yes/no, present/absent, pass/fail, etc.)
- You need to answer questions like "What percentage of people support this policy?" or "What proportion of records are accurate?"

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

## Parameters

### data

`T`[]

An array of objects used to calculate the sample standard deviation. Each object must contain the specified key with numeric values.

### key

keyof `T`

The key in each data object that contains the numeric values to analyze for calculating the sample size.

### confidenceLevel

`90` \| `95` \| `99`

The desired confidence level for the sample. Must be 90, 95, or 99. The higher the confidence level, the larger the returned sample size.

### marginOfError

`number`

The acceptable margin of error in the same units as the data values. The smaller the margin of error, the larger the returned sample size.

### options?

Optional configuration object.

#### populationSize?

`number`

The total size of the population. If not provided, the function assumes the provided data represents the entire population and uses data.length as the population size.

## Returns

`number`

The minimum required sample size, rounded up to the nearest whole number.

## Examples

```ts
// A journalist analyzing income data wants to know how many records to sample
// to estimate the average income with confidence
const incomeData = [
  { household_id: 1, annual_income: 45000 },
  { household_id: 2, annual_income: 52000 },
  { household_id: 3, annual_income: 38000 },
  // ... thousands more records
];
const sampleSize = getSampleSizeMean(incomeData, "annual_income", 95, 2000);
console.log(`You need to analyze ${sampleSize} income records to estimate the average income within $2,000 with 95% confidence`);
```

```ts
// Example with known population size - using a small sample to estimate standard deviation
// but knowing the true population size for accurate sample size calculation
const pilotData = [
  { student_id: 1, score: 85 },
  { student_id: 2, score: 92 },
  { student_id: 3, score: 78 },
  // Only 50 pilot records to estimate variability
];
const requiredSample = getSampleSizeMean(
  pilotData,
  "score",
  99,
  5,
  { populationSize: 10000 } // Total student population is 10,000
);
console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores from the 10,000 students.`);
```

```ts
// Example for analyzing test scores
const testScores = [
  { student_id: 1, score: 85 },
  { student_id: 2, score: 92 },
  { student_id: 3, score: 78 },
  // ... more test data
];
const requiredSample = getSampleSizeMean(testScores, "score", 99, 5);
console.log(`For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores.`);
```
