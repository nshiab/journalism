# The Journalism library

To install the library with Deno, use:

```bash
deno add jsr:@nshiab/journalism
```

To install the library with Node.js, use:

```bash
npx jsr add @nshiab/journalism
```

To import a function, use:

```ts
import { functionName } from "@nshiab/journalism";
```

## addClusters

Groups data points into clusters using the DBSCAN (Density-Based Spatial
Clustering of Applications with Noise) algorithm. This method is particularly
effective at identifying clusters of arbitrary shapes and handling noise in the
data.

The function operates based on two key parameters: `minDistance` (also known as
epsilon or ε) and `minNeighbours`. It classifies each data point into one of
three categories:

- **Core point**: A point that has at least `minNeighbours` other points
  (including itself) within a `minDistance` radius. These points are the
  foundation of a cluster.
- **Border point**: A point that is within the `minDistance` of a core point but
  does not have enough neighbors to be a core point itself. Border points are on
  the edge of a cluster.
- **Noise point**: A point that is neither a core point nor a border point.
  These are outliers that do not belong to any cluster.

The function modifies the input `data` array by adding two properties to each
point:

- `clusterId`: A unique identifier for the cluster the point belongs to (e.g.,
  'cluster1'). For noise points, this will be `null`.
- `clusterType`: The classification of the point, which can be 'core', 'border',
  or 'noise'.

### Signature

```typescript
function addClusters<T extends Record<string, unknown>>(
  data: T[],
  minDistance: number,
  minNeighbours: number,
  distance: (a: T, b: T) => number,
  options?: { reset?: boolean },
): asserts data is (T & {
  clusterId: string | null;
  clusterType: "core" | "border" | "noise";
})[];
```

### Parameters

- **`data`**: An array of data points. Each point is an object with any number
  of properties.
- **`minDistance`**: The maximum distance between two points for them to be
  considered neighbors. This is a crucial parameter that defines the density of
  the clusters.
- **`minNeighbours`**: The minimum number of points required to form a dense
  region (a core point). A larger value will result in more points being
  classified as noise.
- **`distance`**: A function that takes two points as input and returns the
  distance between them. This allows for flexible distance metrics (e.g.,
  Euclidean, Manhattan).
- **`options`**: Optional settings for the clustering process.
- **`options.reset`**: If `true`, the `clusterId` and `clusterType` properties
  of all points will be cleared before the clustering process begins. This is
  useful for re-running the clustering with different parameters.

### Examples

```ts
// Basic usage with Euclidean distance
const data = [
  { id: "a", x: 1, y: 2 },
  { id: "b", x: 2, y: 3 },
  { id: "c", x: 10, y: 10 },
  { id: "d", x: 11, y: 11 },
  { id: "e", x: 50, y: 50 },
];

// Use the journalism library's euclideanDistance function to calculate the distance
const distance = (a, b) => euclideanDistance(a.x, a.y, b.x, b.y);

addClusters(data, 5, 2, distance);

console.log(data);
// Expected output:
// [
//   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'c', x: 10, y: 10, clusterId: 'cluster2', clusterType: 'core' },
//   { id: 'd', x: 11, y: 11, clusterId: 'cluster2', clusterType: 'core' },
//   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
// ]
```

```ts
// Re-running clustering with different parameters
addClusters(data, 10, 2, distance, { reset: true });

console.log(data);
// Expected output with a larger minDistance:
// [
//   { id: 'a', x: 1, y: 2, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'b', x: 2, y: 3, clusterId: 'cluster1', clusterType: 'border' },
//   { id: 'c', x: 10, y: 10, clusterId: 'cluster1', clusterType: 'core' },
//   { id: 'd', x: 11, y: 11, clusterId: 'cluster1', clusterType: 'border' },
//   { id: 'e', x: 50, y: 50, clusterId: null, clusterType: 'noise' }
// ]
```

## addMahalanobisDistance

Calculates the Mahalanobis distance for each object in an array relative to a
specified origin point.

The function enriches the input `data` array by adding a `mahaDist` property to
each object, representing its Mahalanobis distance from the `origin`. The
dimensions for the calculation are determined by the keys in the `origin`
object.

Optionally, you can also compute a `similarity` score, which is a normalized
value between 0 and 1, where 1 indicates that the point is identical to the
origin. To improve performance on large datasets, you can provide a pre-computed
inverted covariance matrix.

### Signature

```typescript
function addMahalanobisDistance<T extends Record<string, unknown>>(
  origin: Record<string, number>,
  data: T[],
  options: { similarity: true; matrix?: number[][] },
): (T & { mahaDist: number; similarity: number })[];
```

### Parameters

- **`origin`**: - An object defining the reference point for the distance
  calculation. The keys of this object represent the variables (dimensions) to
  be used, and the values are their corresponding coordinates.
- **`data`**: - An array of objects to be analyzed. Each object should contain
  the same keys as the `origin` object, and their values for these keys should
  be numbers.
- **`options`**: - Optional parameters to customize the function's behavior.
- **`options.similarity`**: - If `true`, a `similarity` property will be added
  to each object in the `data` array. The similarity is calculated as
  `1 - (mahaDist / maxMahaDist)`, providing an intuitive measure of closeness to
  the origin.
- **`options.matrix`**: - A pre-computed inverted covariance matrix. Providing
  this can significantly speed up calculations, as it avoids re-computing the
  matrix for each call. This matrix should be obtained from
  `getCovarianceMatrix` with `invert: true`.

### Returns

The input `data` array, with `mahaDist` (and optionally `similarity`) properties
added to each object.

### Throws

- **`Error`**: If the dimensions of the data points or the provided matrix do
  not match, or if `getCovarianceMatrix` throws an error (e.g., due to
  non-numeric data).

### Examples

```ts
// Basic usage with a dataset of wines
const wines = [
  { "fixed acidity": 6.5, "alcohol": 11.0 },
  { "fixed acidity": 7.1, "alcohol": 12.2 },
  { "fixed acidity": 6.3, "alcohol": 10.5 },
  { "fixed acidity": 7.2, "alcohol": 11.3 },
];

// Define the ideal wine profile (our origin)
const idealWine = { "fixed acidity": 7.2, "alcohol": 11.3 };

// Calculate the Mahalanobis distance for each wine
addMahalanobisDistance(idealWine, wines);

// Sort the wines by their distance to the ideal profile
wines.sort((a, b) => a.mahaDist - b.mahaDist);

console.log(wines);
// Expected output:
// [
//   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0 },
//   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939 },
//   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263 },
//   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079 }
// ]
```

```ts
// Usage with the similarity option
addMahalanobisDistance(idealWine, wines, { similarity: true });

console.log(wines);
// Expected output with similarity scores:
// [
//   { 'fixed acidity': 7.2, 'alcohol': 11.3, mahaDist: 0, similarity: 1 },
//   { 'fixed acidity': 7.1, 'alcohol': 12.2, mahaDist: 0.939, similarity: 0.548 },
//   { 'fixed acidity': 6.5, 'alcohol': 11.0, mahaDist: 1.263, similarity: 0.392 },
//   { 'fixed acidity': 6.3, 'alcohol': 10.5, mahaDist: 2.079, similarity: 0 }
// ]
```

## addMahalanobisDistance

Calculates the Mahalanobis distance for each object in an array relative to a
specified origin point (without similarity scores).

### Signature

```typescript
function addMahalanobisDistance<T extends Record<string, unknown>>(
  origin: Record<string, number>,
  data: T[],
  options?: { similarity?: false; matrix?: number[][] },
): (T & { mahaDist: number })[];
```

### Parameters

- **`origin`**: - An object defining the reference point for the distance
  calculation.
- **`data`**: - An array of objects to be analyzed.
- **`options`**: - Optional parameters (similarity defaults to false).

### Returns

The input data array with mahaDist properties added to each object.

## addSheetRows

Appends new rows of data to an existing Google Sheet. This function is useful
for continuously adding new records to a spreadsheet without overwriting
existing data, such as logging events, collecting form submissions, or appending
new data points to a time series.

The function expects the data to be an array of objects, where the keys of these
objects correspond to the column headers in your Google Sheet.

By default, authentication is handled via environment variables
(`GOOGLE_PRIVATE_KEY` and `GOOGLE_SERVICE_ACCOUNT_EMAIL`). Alternatively, you
can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON
file. For detailed setup instructions, refer to the `node-google-spreadsheet`
authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Signature

```typescript
async function addSheetRows(
  data: Record<string, string | number | boolean | Date | null>[],
  sheetUrl: string,
  options?: {
    headerIndex?: number;
    raw?: boolean;
    apiEmail?: string;
    apiKey?: string;
  },
): Promise<void>;
```

### Parameters

- **`data`**: - An array of objects, where each object represents a row to be
  appended to the sheet. The keys of the objects should match the existing
  column headers in the sheet.
- **`sheetUrl`**: - The URL of the Google Sheet to which rows will be appended.
  This URL should point to a specific sheet (e.g., ending with `#gid=0`).
- **`options`**: - An optional object with configuration options:
- **`options.headerIndex`**: - The 0-based index of the row that contains the
  headers in your sheet. By default, the first row (index 0) is considered the
  header. Use this if your headers are in a different row.
- **`options.raw`**: - If `true`, data will be written as raw values, preventing
  Google Sheets from automatically guessing data types or applying formatting.
  This can be useful for preserving exact string representations. Defaults to
  `false`.
- **`options.apiEmail`**: - Optional. Your Google Service Account email. If
  provided, this will override the `process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL`
  environment variable.
- **`options.apiKey`**: - Optional. Your Google Service Account private key. If
  provided, this will override the `process.env.GOOGLE_PRIVATE_KEY` environment
  variable.

### Returns

A Promise that resolves when the rows have been successfully appended to the
sheet.

### Examples

```ts
// The data needs to be an array of objects. The keys of the objects must match the sheet's columns.
const data = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
];

// Fake URL used as an example.
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Appending the new rows to the sheet.
await addSheetRows(data, sheetUrl);
console.log("Rows added successfully.");
```

```ts
// Append data as raw values to prevent Google Sheets from interpreting them.
const rawData = [
  { product_id: "001", quantity: "05" }, // '05' might be interpreted as 5 without raw: true
  { product_id: "002", quantity: "10" },
];
await addSheetRows(rawData, sheetUrl, { raw: true });
console.log("Raw rows added successfully.");
```

```ts
// If your sheet's headers are on the second row (index 1).
const dataWithHeaderIndex = [
  { Name: "John Doe", Age: 30 },
];
await addSheetRows(dataWithHeaderIndex, sheetUrl, { headerIndex: 1 });
console.log("Rows added with custom header index.");
```

```ts
// Use explicitly provided API credentials instead of environment variables.
await addSheetRows(data, sheetUrl, {
  apiEmail: "your-service-account@project-id.iam.gserviceaccount.com",
  apiKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
});
console.log("Rows added using custom API credentials.");
```

## addZScore

Calculates the Z-score for a specific numeric variable within an array of
objects and adds it as a new property to each object. The Z-score is a
statistical measure that indicates how many standard deviations a data point is
from the mean of the dataset.

The function modifies the input `data` array by adding a new key to each object,
which by default is `zScore`. You can customize the name of this new key by
using the `newKey` option.

### Signature

```typescript
function addZScore<T extends Record<string, unknown>, K extends string>(
  data: T[],
  variable: string,
  options: { newKey: K },
): (T & { [P in K]: number })[];
```

### Parameters

- **`data`**: - An array of objects. Each object should contain the variable for
  which the Z-score is to be calculated.
- **`variable`**: - The key (as a string) of the numeric variable for which the
  Z-score will be computed.
- **`options`**: - Optional settings for the Z-score calculation.
- **`options.newKey`**: - The name of the new key to be added to each object,
  representing the Z-score. If not provided, it defaults to `'zScore'`.

### Returns

The input `data` array, with the Z-score added to each object under the
specified key.

### Throws

- **`Error`**: If the specified `variable` is not found in an object or its
  value is not a number.

### Examples

```ts
// Basic usage with a list of student grades
const studentData = [
  { student: "Alice", grade: 85 },
  { student: "Bob", grade: 92 },
  { student: "Charlie", grade: 78 },
  { student: "David", grade: 95 },
  { student: "Eve", grade: 62 },
];

// Calculate the Z-score for the 'grade' variable
addZScore(studentData, "grade");

console.log(studentData);
// Expected output:
// [
//   { student: 'Alice', grade: 85, zScore: 0.25 },
//   { student: 'Bob', grade: 92, zScore: 0.83 },
//   { student: 'Charlie', grade: 78, zScore: -0.33 },
//   { student: 'David', grade: 95, zScore: 1.08 },
//   { student: 'Eve', grade: 62, zScore: -1.83 }
// ]
```

```ts
// Using a custom key for the Z-score
addZScore(studentData, "grade", { newKey: "gradeZScore" });

console.log(studentData);
// Expected output with a custom key:
// [
//   { student: 'Alice', grade: 85, gradeZScore: 0.25 },
//   { student: 'Bob', grade: 92, gradeZScore: 0.83 },
//   { student: 'Charlie', grade: 78, gradeZScore: -0.33 },
//   { student: 'David', grade: 95, gradeZScore: 1.08 },
//   { student: 'Eve', grade: 62, gradeZScore: -1.83 }
// ]
```

## addZScore

Calculates the Z-score for a specific numeric variable within an array of
objects using the default 'zScore' key name.

### Signature

```typescript
function addZScore<T extends Record<string, unknown>>(
  data: T[],
  variable: string,
  options?: { newKey?: undefined },
): (T & { zScore: number })[];
```

### Parameters

- **`data`**: - An array of objects. Each object should contain the variable for
  which the Z-score is to be calculated.
- **`variable`**: - The key (as a string) of the numeric variable for which the
  Z-score will be computed.
- **`options`**: - Optional settings (newKey defaults to undefined, using
  'zScore').

### Returns

The input data array with zScore properties added to each object.

## adjustToInflation

Adjusts a monetary amount for inflation using the Consumer Price Index (CPI).

### Signature

```typescript
function adjustToInflation(
  amount: number,
  amountCPI: number,
  targetCPI: number,
  options?: { decimals?: number },
): number;
```

### Parameters

- **`amount`**: The initial amount of money to be adjusted.
- **`amountCPI`**: The Consumer Price Index (CPI) corresponding to the period of
  the `amount`.
- **`targetCPI`**: The Consumer Price Index (CPI) for the period to which the
  amount is being adjusted.
- **`options`**: Optional settings for the calculation.
- **`options.decimals`**: The number of decimal places to which the resulting
  adjusted amount should be rounded. If not specified, the result will not be
  rounded.

### Examples

```ts
// Basic usage: Adjusting $100 from a time when the CPI was 120 to a time when the CPI is 150.
const adjustedValue = adjustToInflation(100, 120, 150);
console.log(adjustedValue); // Expected output: 125
```

```ts
// With rounding to two decimal places
const adjustedValueRounded = adjustToInflation(100, 120, 150.5, {
  decimals: 2,
});
console.log(adjustedValueRounded); // Expected output: 125.42
```

```ts
// Calculating the value of a 1990 salary in 2023 terms
const salary1990 = 45000;
const cpi1990 = 60.5; // Hypothetical CPI for 1990
const cpi2023 = 135.2; // Hypothetical CPI for 2023
const adjustedSalary = adjustToInflation(salary1990, cpi1990, cpi2023, {
  decimals: 0,
});
console.log(
  `A $45,000 salary in 1990 is equivalent to approximately ${adjustedSalary} in 2023.`,
);
// Expected output: "A $45,000 salary in 1990 is equivalent to approximately $100149 in 2023."
```

## arraysToData

Transforms an object of arrays into an array of objects. This function is useful
for converting data from a columnar format to a row-based format, which is
common in data processing and visualization.

It is assumed that all arrays in the input object have the same length.

### Signature

```typescript
function arraysToData<T extends Record<string, unknown[]>>(
  data: T,
): Array<{ [K in keyof T]: T[K][number] }>;
```

### Parameters

- **`data`**: An object where each key is a string and its corresponding value
  is an array of any type. All arrays are expected to have the same length.

### Returns

An array of objects, where each object is a "row" of data created by combining
values from the input arrays at the same index.

### Examples

```ts
// Basic usage with mixed data types
const columnarData = {
  name: ["Alice", "Bob", "Charlie"],
  age: [30, 25, 35],
  city: ["New York", "London", "Paris"],
};

const rowData = arraysToData(columnarData);

console.log(rowData);
// Expected output:
// [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'London' },
//   { name: 'Charlie', age: 35, city: 'Paris' }
// ]
```

```ts
// Usage with numerical data for charting
const chartData = {
  x: [1, 2, 3, 4, 5],
  y: [10, 20, 15, 25, 30],
};

const plotPoints = arraysToData(chartData);

console.log(plotPoints);
// Expected output:
// [
//   { x: 1, y: 10 },
//   { x: 2, y: 20 },
//   { x: 3, y: 15 },
//   { x: 4, y: 25 },
//   { x: 5, y: 30 }
// ]
```

## askAI

Interacts with a Large Language Model (LLM) to perform a wide range of tasks,
from answering questions to analyzing multimedia content. This function serves
as a versatile interface to various AI models, including Google's Gemini and
local models via Ollama.

The function is designed to be highly configurable, allowing you to specify the
AI model, credentials, and various input types such as text, images, audio,
video, and even web pages. It also includes features for caching responses to
improve performance and reduce costs, as well as for testing and cleaning the
AI's output.

**Authentication**: The function can be authenticated using environment
variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or by passing
credentials directly in the `options` object. Options will always take
precedence over environment variables.

**Local Models**: To use a local model with Ollama, set the `OLLAMA` environment
variable to `true` and ensure that Ollama is running on your machine. You will
also need to specify the model name using the `AI_MODEL` environment variable or
the `model` option. If you want your Ollama instance to be used, you can pass an
instance of the `Ollama` class as the `ollama` option.

**Caching**: Caching is a powerful feature that saves the AI's response to a
local directory (`.journalism-cache`). When the same request is made again, the
cached response is returned instantly, saving time and API costs. To enable
caching, set the `cache` option to `true`.

**File Handling**: The function can process both local files and files stored in
Google Cloud Storage (GCS). Simply provide the file path or the `gs://` URL.
Note that Ollama only supports local files.

### Signature

```typescript
async function askAI(
  prompt: string,
  options: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    ollama?: boolean | Ollama;
    HTMLFrom?: string | string[];
    screenshotFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    text?: string | string[];
    returnJson?: boolean;
    parseJson?: boolean;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
    clean?: (response: unknown) => unknown;
    contextWindow?: number;
    thinkingBudget?: number;
    includeThoughts?: boolean;
    detailedResponse: true;
    geminiParameters?: Partial<GenerateContentParameters>;
    ollamaParameters?: Partial<ChatRequest>;
    metrics?: {
      totalCost: number;
      totalInputTokens: number;
      totalOutputTokens: number;
      totalRequests: number;
    };
  },
): Promise<
  {
    response: unknown;
    rawResponse: unknown;
    fromCache: boolean;
    prompt: string;
    promptTokenCount: number;
    outputTokenCount: number;
    totalTokens: number;
    tokensPerSecond: number;
    estimatedCost?: number;
    durationMs: number;
    model: string;
    thoughts: string;
    thoughtsTokenCount: number;
  }
>;
```

### Parameters

- **`prompt`**: - The primary text input for the AI model.
- **`options`**: - A comprehensive set of options.
- **`options.model`**: - The specific AI model to use (e.g.,
  'gemini-1.5-flash'). Defaults to the `AI_MODEL` environment variable.
- **`options.apiKey`**: - Your API key for the AI service. Defaults to the
  `AI_KEY` environment variable.
- **`options.vertex`**: - Set to `true` to use Vertex AI for authentication.
  Auto-enables if `AI_PROJECT` and `AI_LOCATION` are set.
- **`options.project`**: - Your Google Cloud project ID. Defaults to the
  `AI_PROJECT` environment variable.
- **`options.location`**: - The Google Cloud location for your project. Defaults
  to the `AI_LOCATION` environment variable.
- **`options.ollama`**: - Set to `true` to use a local Ollama model. Defaults to
  the `OLLAMA` environment variable. If you want your Ollama instance to be
  used, you can pass it here too.
- **`options.HTMLFrom`**: - A URL or an array of URLs to scrape HTML content
  from. The content is appended to the prompt.
- **`options.screenshotFrom`**: - A URL or an array of URLs to take a screenshot
  from for analysis.
- **`options.image`**: - A path or GCS URL (or an array of them) to an image
  file.
- **`options.video`**: - A path or GCS URL (or an array of them) to a video
  file.
- **`options.audio`**: - A path or GCS URL (or an array of them) to an audio
  file.
- **`options.pdf`**: - A path or GCS URL (or an array of them) to a PDF file.
- **`options.text`**: - A path or GCS URL (or an array of them) to a text file.
- **`options.returnJson`**: - If `true`, instructs the AI to return a JSON
  object. Defaults to `false`.
- **`options.parseJson`**: - If `true`, automatically parses the AI's response
  as JSON. Defaults to `true` if `returnJson` is `true`, otherwise `false`.
- **`options.cache`**: - If `true`, caches the response locally in a
  `.journalism-cache` directory. Defaults to `false`.
- **`options.verbose`**: - If `true`, enables detailed logging, including token
  usage and estimated costs. Defaults to `false`.
- **`options.clean`**: - A function to process and clean the AI's response
  before it is returned or tested. This function is called after JSON parsing
  (if `parseJson` is `true`). The response parameter will be the parsed JSON
  object if `parseJson` is true, or a string otherwise.
- **`options.test`**: - A function or an array of functions to validate the AI's
  response before it's returned.
- **`options.contextWindow`**: - An option to specify the context window size
  for Ollama models. By default, Ollama sets this depending on the model, which
  can be lower than the actual maximum context window size of the model.
- **`options.thinkingBudget`**: - Sets the reasoning token budget: 0 to disable
  (default, though some models may reason regardless), -1 for a dynamic budget,
  or > 0 for a fixed budget. For Ollama models, any non-zero value simply
  enables reasoning, ignoring the specific budget amount.
- **`options.includeThoughts`**: - If `true`, includes the AI's reasoning
  thoughts in the output when using a thinking budget. Defaults to `false`.
- **`options.detailedResponse`**: - If `true`, returns an object containing both
  the response and metadata (tokens, cost, duration, etc.). Defaults to `false`.
- **`options.geminiParameters`**: - Additional parameters to pass to the Gemini
  `generateContentStream` method. These will be merged with the default
  parameters, allowing you to override or extend the configuration (e.g., custom
  safety settings, generation config, system instructions).
- **`options.ollamaParameters`**: - Additional parameters to pass to the Ollama
  `chat` method. These will be merged with the default parameters, allowing you
  to override or extend the configuration (e.g., custom options, keep_alive
  settings).
- **`options.metrics`**: - An object to track cumulative metrics across multiple
  AI requests. Pass an object with `totalCost`, `totalInputTokens`,
  `totalOutputTokens`, and `totalRequests` properties (all initialized to 0).
  The function will update these values after each request. Note: `totalCost` is
  only calculated for Google GenAI models, not for Ollama.

### Returns

A Promise that resolves to the AI's response.

### Examples

```ts
// Basic usage: Get a simple text response from the AI.
// Assumes credentials are set in environment variables.
const capital = await askAI("What is the capital of France?");
console.log(capital); // "Paris"
```

```ts
// Enable caching to save the response and avoid repeated API calls.
// A .journalism-cache directory will be created.
const cachedCapital = await askAI("What is the capital of France?", {
  cache: true,
});
```

```ts
// Pass API credentials directly as options.
const response = await askAI("What is the capital of France?", {
  apiKey: "your_api_key",
  model: "gemini-1.5-flash",
});

// Use Vertex AI for authentication.
const vertexResponse = await askAI("What is the capital of France?", {
  vertex: true,
  project: "your_project_id",
  location: "us-central1",
});
```

```ts
// Scrape and analyze HTML content from a URL.
const orders = await askAI(
  `From the following HTML, extract the executive order titles, their dates (in yyyy-mm-dd format), and their URLs. Return the data as a JSON array of objects.`,
  {
    HTMLFrom:
      "https://www.whitehouse.gov/presidential-actions/executive-orders/",
    returnJson: true,
  },
);
console.table(orders);

// Analyze a screenshot of a webpage.
const specials = await askAI(
  `Based on this screenshot of a grocery store flyer, list the products that are on special.`,
  {
    screenshotFrom: "https://www.metro.ca/circulaire",
    returnJson: true,
  },
);
console.table(specials);
```

```ts
// Analyze a local image file.
const personInfo = await askAI(
  `Analyze the provided image and return a JSON object with the following details:
  - name: The name of the person if they are a recognizable public figure.
  - description: A brief description of the image.
  - isPolitician: A boolean indicating if the person is a politician.`,
  {
    image: "./path/to/your_image.jpg",
    returnJson: true,
  },
);
console.log(personInfo);

// Analyze an image from Google Cloud Storage.
const gcsImageInfo = await askAI(
  `Describe the scene in this image.`,
  {
    image: "gs://your-bucket/your_image.jpg",
  },
);
console.log(gcsImageInfo);

// Transcribe an audio file.
const speechDetails = await askAI(
  `Transcribe the speech in this audio file. If possible, identify the speaker and the approximate date of the speech.`,
  {
    audio: "./path/to/speech.mp3",
    returnJson: true,
  },
);
console.log(speechDetails);

// Analyze a video file.
const videoAnalysis = await askAI(
  `Create a timeline of events from this video. For each event, provide a timestamp, a short description, and identify the main people involved.`,
  {
    video: "./path/to/your_video.mp4",
    returnJson: true,
  },
);
console.table(videoAnalysis);
```

```ts
// Extract structured data from a PDF document.
const caseSummary = await askAI(
  `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
  {
    pdf: "./path/to/decision.pdf",
    returnJson: true,
  },
);
console.table(caseSummary);

// Summarize a local text file.
const summary = await askAI(
  `Analyze the content of this CSV file and provide a summary of its key findings.`,
  {
    text: "./path/to/data.csv",
  },
);
console.log(summary);
```

```ts
// Process multiple files of different types in a single call.
const multiFileSummary = await askAI(
  `Provide a brief summary for each file I've provided.`,
  {
    HTMLFrom: "https://www.un.org/en/global-issues",
    audio: "path/to/speech.mp3",
    image: "path/to/protest.jpg",
    video: "path/to/event.mp4",
    pdf: "path/to/report.pdf",
    text: "path/to/notes.txt",
    returnJson: true,
  },
);
console.log(multiFileSummary);

// Use a clean and test function to process and validate the AI's output.
const europeanCountries = await askAI(
  `Give me a list of three countries in Northern Europe.`,
  {
    returnJson: true,
    clean: (response: unknown) => {
      // Example: Trim whitespace from each country name in the array
      if (Array.isArray(response)) {
        return response.map((item) =>
          typeof item === "string" ? item.trim() : item
        );
      }
      return response;
    },
    test: (response) => {
      if (!Array.isArray(response)) {
        throw new Error("Response is not an array.");
      }
      if (response.length !== 3) {
        throw new Error("Response does not contain exactly three items.");
      }
      console.log(
        "Test passed: The response is a valid list of three countries.",
      );
    },
  },
);
console.log(europeanCountries);
```

```ts
// Track cumulative metrics across multiple AI requests.
const metrics = {
  totalCost: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalRequests: 0,
};

await askAI("What is the capital of France?", { metrics });
await askAI("What is the population of Paris?", { metrics });

console.log("Total cost:", metrics.totalCost);
console.log("Total input tokens:", metrics.totalInputTokens);
console.log("Total output tokens:", metrics.totalOutputTokens);
console.log("Total requests:", metrics.totalRequests);
```

```ts
// Get detailed metadata including tokens, cost, and duration.
const result = await askAI("What is the capital of France?", {
  detailedResponse: true,
});

console.log("Response:", result.response);
console.log("Model:", result.model);
// Result includes: response, prompt, promptTokenCount, outputTokenCount, totalTokens,
// tokensPerSecond, estimatedCost (for Google models), durationMs, model, thoughts, and more

// Access specific fields
console.log(`Used ${result.totalTokens} tokens in ${result.durationMs}ms`);
if (result.estimatedCost) {
  console.log(`Estimated cost: $${result.estimatedCost}`);
}
```

## askAI

Interacts with a Large Language Model (LLM) to perform a wide range of tasks,
from answering questions to analyzing multimedia content. This function serves
as a versatile interface to various AI models, including Google's Gemini and
local models via Ollama.

The function is designed to be highly configurable, allowing you to specify the
AI model, credentials, and various input types such as text, images, audio,
video, and even web pages. It also includes features for caching responses to
improve performance and reduce costs, as well as for testing and cleaning the
AI's output.

**Authentication**: The function can be authenticated using environment
variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or by passing
credentials directly in the `options` object. Options will always take
precedence over environment variables.

**Local Models**: To use a local model with Ollama, set the `OLLAMA` environment
variable to `true` and ensure that Ollama is running on your machine. You will
also need to specify the model name using the `AI_MODEL` environment variable or
the `model` option. If you want your Ollama instance to be used, you can pass an
instance of the `Ollama` class as the `ollama` option.

**Caching**: Caching is a powerful feature that saves the AI's response to a
local directory (`.journalism-cache`). When the same request is made again, the
cached response is returned instantly, saving time and API costs. To enable
caching, set the `cache` option to `true`.

**File Handling**: The function can process both local files and files stored in
Google Cloud Storage (GCS). Simply provide the file path or the `gs://` URL.
Note that Ollama only supports local files.

### Signature

```typescript
async function askAI(
  prompt: string,
  options?: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    ollama?: boolean | Ollama;
    HTMLFrom?: string | string[];
    screenshotFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    text?: string | string[];
    returnJson?: boolean;
    parseJson?: boolean;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
    clean?: (response: unknown) => unknown;
    contextWindow?: number;
    thinkingBudget?: number;
    includeThoughts?: boolean;
    detailedResponse?: false;
    geminiParameters?: Partial<GenerateContentParameters>;
    ollamaParameters?: Partial<ChatRequest>;
    metrics?: {
      totalCost: number;
      totalInputTokens: number;
      totalOutputTokens: number;
      totalRequests: number;
    };
  },
): Promise<unknown>;
```

### Parameters

- **`prompt`**: - The primary text input for the AI model.
- **`options`**: - A comprehensive set of options.
- **`options.model`**: - The specific AI model to use (e.g.,
  'gemini-1.5-flash'). Defaults to the `AI_MODEL` environment variable.
- **`options.apiKey`**: - Your API key for the AI service. Defaults to the
  `AI_KEY` environment variable.
- **`options.vertex`**: - Set to `true` to use Vertex AI for authentication.
  Auto-enables if `AI_PROJECT` and `AI_LOCATION` are set.
- **`options.project`**: - Your Google Cloud project ID. Defaults to the
  `AI_PROJECT` environment variable.
- **`options.location`**: - The Google Cloud location for your project. Defaults
  to the `AI_LOCATION` environment variable.
- **`options.ollama`**: - Set to `true` to use a local Ollama model. Defaults to
  the `OLLAMA` environment variable. If you want your Ollama instance to be
  used, you can pass it here too.
- **`options.HTMLFrom`**: - A URL or an array of URLs to scrape HTML content
  from. The content is appended to the prompt.
- **`options.screenshotFrom`**: - A URL or an array of URLs to take a screenshot
  from for analysis.
- **`options.image`**: - A path or GCS URL (or an array of them) to an image
  file.
- **`options.video`**: - A path or GCS URL (or an array of them) to a video
  file.
- **`options.audio`**: - A path or GCS URL (or an array of them) to an audio
  file.
- **`options.pdf`**: - A path or GCS URL (or an array of them) to a PDF file.
- **`options.text`**: - A path or GCS URL (or an array of them) to a text file.
- **`options.returnJson`**: - If `true`, instructs the AI to return a JSON
  object. Defaults to `false`.
- **`options.parseJson`**: - If `true`, automatically parses the AI's response
  as JSON. Defaults to `true` if `returnJson` is `true`, otherwise `false`.
- **`options.cache`**: - If `true`, caches the response locally in a
  `.journalism-cache` directory. Defaults to `false`.
- **`options.verbose`**: - If `true`, enables detailed logging, including token
  usage and estimated costs. Defaults to `false`.
- **`options.clean`**: - A function to process and clean the AI's response
  before it is returned or tested. This function is called after JSON parsing
  (if `parseJson` is `true`). The response parameter will be the parsed JSON
  object if `parseJson` is true, or a string otherwise.
- **`options.test`**: - A function or an array of functions to validate the AI's
  response before it's returned.
- **`options.contextWindow`**: - An option to specify the context window size
  for Ollama models. By default, Ollama sets this depending on the model, which
  can be lower than the actual maximum context window size of the model.
- **`options.thinkingBudget`**: - Sets the reasoning token budget: 0 to disable
  (default, though some models may reason regardless), -1 for a dynamic budget,
  or > 0 for a fixed budget. For Ollama models, any non-zero value simply
  enables reasoning, ignoring the specific budget amount.
- **`options.includeThoughts`**: - If `true`, includes the AI's reasoning
  thoughts in the output when using a thinking budget. Defaults to `false`.
- **`options.detailedResponse`**: - If `true`, returns an object containing both
  the response and metadata (tokens, cost, duration, etc.). Defaults to `false`.
- **`options.geminiParameters`**: - Additional parameters to pass to the Gemini
  `generateContentStream` method. These will be merged with the default
  parameters, allowing you to override or extend the configuration (e.g., custom
  safety settings, generation config, system instructions).
- **`options.ollamaParameters`**: - Additional parameters to pass to the Ollama
  `chat` method. These will be merged with the default parameters, allowing you
  to override or extend the configuration (e.g., custom options, keep_alive
  settings).
- **`options.metrics`**: - An object to track cumulative metrics across multiple
  AI requests. Pass an object with `totalCost`, `totalInputTokens`,
  `totalOutputTokens`, and `totalRequests` properties (all initialized to 0).
  The function will update these values after each request. Note: `totalCost` is
  only calculated for Google GenAI models, not for Ollama.

### Returns

A Promise that resolves to the AI's response.

### Examples

```ts
// Basic usage: Get a simple text response from the AI.
// Assumes credentials are set in environment variables.
const capital = await askAI("What is the capital of France?");
console.log(capital); // "Paris"
```

```ts
// Enable caching to save the response and avoid repeated API calls.
// A .journalism-cache directory will be created.
const cachedCapital = await askAI("What is the capital of France?", {
  cache: true,
});
```

```ts
// Pass API credentials directly as options.
const response = await askAI("What is the capital of France?", {
  apiKey: "your_api_key",
  model: "gemini-1.5-flash",
});

// Use Vertex AI for authentication.
const vertexResponse = await askAI("What is the capital of France?", {
  vertex: true,
  project: "your_project_id",
  location: "us-central1",
});
```

```ts
// Scrape and analyze HTML content from a URL.
const orders = await askAI(
  `From the following HTML, extract the executive order titles, their dates (in yyyy-mm-dd format), and their URLs. Return the data as a JSON array of objects.`,
  {
    HTMLFrom:
      "https://www.whitehouse.gov/presidential-actions/executive-orders/",
    returnJson: true,
  },
);
console.table(orders);

// Analyze a screenshot of a webpage.
const specials = await askAI(
  `Based on this screenshot of a grocery store flyer, list the products that are on special.`,
  {
    screenshotFrom: "https://www.metro.ca/circulaire",
    returnJson: true,
  },
);
console.table(specials);
```

```ts
// Analyze a local image file.
const personInfo = await askAI(
  `Analyze the provided image and return a JSON object with the following details:
  - name: The name of the person if they are a recognizable public figure.
  - description: A brief description of the image.
  - isPolitician: A boolean indicating if the person is a politician.`,
  {
    image: "./path/to/your_image.jpg",
    returnJson: true,
  },
);
console.log(personInfo);

// Analyze an image from Google Cloud Storage.
const gcsImageInfo = await askAI(
  `Describe the scene in this image.`,
  {
    image: "gs://your-bucket/your_image.jpg",
  },
);
console.log(gcsImageInfo);

// Transcribe an audio file.
const speechDetails = await askAI(
  `Transcribe the speech in this audio file. If possible, identify the speaker and the approximate date of the speech.`,
  {
    audio: "./path/to/speech.mp3",
    returnJson: true,
  },
);
console.log(speechDetails);

// Analyze a video file.
const videoAnalysis = await askAI(
  `Create a timeline of events from this video. For each event, provide a timestamp, a short description, and identify the main people involved.`,
  {
    video: "./path/to/your_video.mp4",
    returnJson: true,
  },
);
console.table(videoAnalysis);
```

```ts
// Extract structured data from a PDF document.
const caseSummary = await askAI(
  `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
  {
    pdf: "./path/to/decision.pdf",
    returnJson: true,
  },
);
console.table(caseSummary);

// Summarize a local text file.
const summary = await askAI(
  `Analyze the content of this CSV file and provide a summary of its key findings.`,
  {
    text: "./path/to/data.csv",
  },
);
console.log(summary);
```

```ts
// Process multiple files of different types in a single call.
const multiFileSummary = await askAI(
  `Provide a brief summary for each file I've provided.`,
  {
    HTMLFrom: "https://www.un.org/en/global-issues",
    audio: "path/to/speech.mp3",
    image: "path/to/protest.jpg",
    video: "path/to/event.mp4",
    pdf: "path/to/report.pdf",
    text: "path/to/notes.txt",
    returnJson: true,
  },
);
console.log(multiFileSummary);

// Use a clean and test function to process and validate the AI's output.
const europeanCountries = await askAI(
  `Give me a list of three countries in Northern Europe.`,
  {
    returnJson: true,
    clean: (response: unknown) => {
      // Example: Trim whitespace from each country name in the array
      if (Array.isArray(response)) {
        return response.map((item) =>
          typeof item === "string" ? item.trim() : item
        );
      }
      return response;
    },
    test: (response) => {
      if (!Array.isArray(response)) {
        throw new Error("Response is not an array.");
      }
      if (response.length !== 3) {
        throw new Error("Response does not contain exactly three items.");
      }
      console.log(
        "Test passed: The response is a valid list of three countries.",
      );
    },
  },
);
console.log(europeanCountries);
```

```ts
// Track cumulative metrics across multiple AI requests.
const metrics = {
  totalCost: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalRequests: 0,
};

await askAI("What is the capital of France?", { metrics });
await askAI("What is the population of Paris?", { metrics });

console.log("Total cost:", metrics.totalCost);
console.log("Total input tokens:", metrics.totalInputTokens);
console.log("Total output tokens:", metrics.totalOutputTokens);
console.log("Total requests:", metrics.totalRequests);
```

```ts
// Get detailed metadata including tokens, cost, and duration.
const result = await askAI("What is the capital of France?", {
  detailedResponse: true,
});

console.log("Response:", result.response);
console.log("Model:", result.model);
// Result includes: response, prompt, promptTokenCount, outputTokenCount, totalTokens,
// tokensPerSecond, estimatedCost (for Google models), durationMs, model, thoughts, and more

// Access specific fields
console.log(`Used ${result.totalTokens} tokens in ${result.durationMs}ms`);
if (result.estimatedCost) {
  console.log(`Estimated cost: $${result.estimatedCost}`);
}
```

## askAIPool

Processes multiple AI requests concurrently using a pool of workers. This
function wraps {@link askAI} and manages parallel execution, retries, progress
logging, and error handling for batch operations.

Each request in the array is processed by a worker from the pool. The pool size
controls how many requests run simultaneously. Results and errors are returned
separately, sorted by their original index, making it easy to match outputs back
to inputs.

### Signature

```typescript
async function askAIPool(
  requests: {
    id?: string;
    prompt: string;
    options?: {
      model?: string;
      apiKey?: string;
      vertex?: boolean;
      project?: string;
      location?: string;
      ollama?: boolean | Ollama;
      HTMLFrom?: string | string[];
      screenshotFrom?: string | string[];
      image?: string | string[];
      video?: string | string[];
      audio?: string | string[];
      pdf?: string | string[];
      text?: string | string[];
      returnJson?: boolean;
      parseJson?: boolean;
      verbose?: boolean;
      cache?: boolean;
      test?: ((response: unknown) => void) | ((response: unknown) => void)[];
      clean?: (response: unknown) => unknown;
      contextWindow?: number;
      thinkingBudget?: number;
      includeThoughts?: boolean;
      geminiParameters?: Partial<GenerateContentParameters>;
      ollamaParameters?: Partial<ChatRequest>;
    };
  }[],
  poolOptions: {
    poolSize: number;
    logProgress?: boolean;
    retry?: number;
    retryCheck?: (error: unknown) => Promise<boolean> | boolean;
    minRequestDurationMs?: number;
    metrics?: {
      totalCost: number;
      totalInputTokens: number;
      totalOutputTokens: number;
      totalRequests: number;
    };
  },
): Promise<
  {
    results: {
      index: number;
      request: {
        id?: string;
        prompt: string;
        options?: {
          model?: string;
          apiKey?: string;
          vertex?: boolean;
          project?: string;
          location?: string;
          ollama?: boolean | Ollama;
          HTMLFrom?: string | string[];
          screenshotFrom?: string | string[];
          image?: string | string[];
          video?: string | string[];
          audio?: string | string[];
          pdf?: string | string[];
          text?: string | string[];
          returnJson?: boolean;
          parseJson?: boolean;
          verbose?: boolean;
          cache?: boolean;
          test?:
            | ((response: unknown) => void)
            | ((response: unknown) => void)[];
          clean?: (response: unknown) => unknown;
          contextWindow?: number;
          thinkingBudget?: number;
          includeThoughts?: boolean;
          geminiParameters?: Partial<GenerateContentParameters>;
          ollamaParameters?: Partial<ChatRequest>;
        };
      };
      result: unknown;
    }[];
    errors: Array<
      {
        index: number;
        request: {
          id?: string;
          prompt: string;
          options?: {
            model?: string;
            apiKey?: string;
            vertex?: boolean;
            project?: string;
            location?: string;
            ollama?: boolean | Ollama;
            HTMLFrom?: string | string[];
            screenshotFrom?: string | string[];
            image?: string | string[];
            video?: string | string[];
            audio?: string | string[];
            pdf?: string | string[];
            text?: string | string[];
            returnJson?: boolean;
            parseJson?: boolean;
            verbose?: boolean;
            cache?: boolean;
            test?:
              | ((response: unknown) => void)
              | ((response: unknown) => void)[];
            clean?: (response: unknown) => unknown;
            contextWindow?: number;
            thinkingBudget?: number;
            includeThoughts?: boolean;
            geminiParameters?: Partial<GenerateContentParameters>;
            ollamaParameters?: Partial<ChatRequest>;
          };
        };
        error: unknown;
      }
    >;
  }
>;
```

### Parameters

- **`requests`**: - An array of request objects to process.
- **`requests[].id`**: - An optional identifier for the request, useful for
  matching results back to inputs.
- **`requests[].prompt`**: - The primary text input for the AI model.
- **`requests[].options`**: - Options passed to {@link askAI} for each
  individual request. See {@link askAI} for the full list of available options.
- **`poolOptions`**: - Configuration for the pool execution.
- **`poolOptions.poolSize`**: - The number of concurrent workers processing
  requests.
- **`poolOptions.logProgress`**: - If `true`, logs progress to the console after
  each completed or failed request. Defaults to `false`.
- **`poolOptions.retry`**: - The maximum number of retry attempts for a failed
  request. Defaults to `0` (no retries).
- **`poolOptions.retryCheck`**: - A function that receives the error and returns
  whether the request should be retried. If not provided, all failed requests
  are retried up to the `retry` limit.
- **`poolOptions.minRequestDurationMs`**: - A minimum duration in milliseconds
  for each request. If a request completes faster, the worker will wait before
  picking up the next one. Useful for rate limiting.
- **`poolOptions.metrics`**: - An object to track cumulative metrics across all
  requests in the pool. Pass an object with `totalCost`, `totalInputTokens`,
  `totalOutputTokens`, and `totalRequests` properties (all initialized to 0).

### Returns

A Promise that resolves to an object with `results` (successful responses with
their index and request) and `errors` (failed requests with their index,
request, and error), both sorted by original index.

### Examples

```ts
// Basic usage: Process a batch of prompts with a pool of 5 concurrent workers.
const { results, errors } = await askAIPool(
  [
    { prompt: "What is the capital of France?" },
    { prompt: "What is the capital of Germany?" },
    { prompt: "What is the capital of Italy?" },
  ],
  { poolSize: 5 },
);
for (const r of results) {
  console.log(r.result);
}
```

```ts
// Use an id to easily identify each request in the results.
const { results, errors } = await askAIPool(
  [
    { id: "france", prompt: "What is the capital of France?" },
    { id: "germany", prompt: "What is the capital of Germany?" },
  ],
  { poolSize: 2 },
);
for (const r of results) {
  console.log(r.request.id, r.result);
}
```

```ts
// Enable progress logging and retries.
const { results, errors } = await askAIPool(
  [
    {
      prompt: "Summarize this article.",
      options: { text: "./article1.txt", returnJson: true },
    },
    {
      prompt: "Summarize this article.",
      options: { text: "./article2.txt", returnJson: true },
    },
  ],
  {
    poolSize: 3,
    logProgress: true,
    retry: 2,
  },
);
console.log(`${results.length} succeeded, ${errors.length} failed`);
```

```ts
// Track cumulative metrics and enforce a minimum request duration to respect rate limits.
const metrics = {
  totalCost: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalRequests: 0,
};
const { results } = await askAIPool(
  [
    { prompt: "What is 2+2?" },
    { prompt: "What is 3+3?" },
  ],
  {
    poolSize: 2,
    minRequestDurationMs: 1000,
    metrics,
  },
);
console.log("Total cost:", metrics.totalCost);
console.log("Total requests:", metrics.totalRequests);
```

```ts
// Use retryCheck to only retry on specific errors.
const { results, errors } = await askAIPool(
  [
    {
      prompt: "Analyze this image.",
      options: { image: "./photo.jpg", returnJson: true },
    },
  ],
  {
    poolSize: 1,
    retry: 3,
    retryCheck: (error) => {
      // Only retry on rate limit errors
      return error instanceof Error && error.message.includes("429");
    },
  },
);
```

## camelCase

Converts a string into camelCase. This is useful for creating variable names or
object keys from human-readable text.

### Signature

```typescript
function camelCase(input: string): string;
```

### Parameters

- **`input`**: The string to convert to camelCase. It can contain spaces,
  punctuation, and mixed casing.

### Returns

The camelCased version of the input string.

### Examples

```ts
// Basic conversion
const result1 = camelCase("hello world");
console.log(result1); // "helloWorld"
```

```ts
// With punctuation and mixed case
const result2 = camelCase("  --Some@Thing is- happening--  ");
console.log(result2); // "someThingsHappening"
```

```ts
// With a single word
const result3 = camelCase("Journalism");
console.log(result3); // "journalism"
```

## capitalize

Capitalizes the first letter of a given string.

### Signature

```typescript
function capitalize(string: string): string;
```

### Parameters

- **`input`**: The string to be capitalized.

### Returns

A new string with the first letter in uppercase.

### Examples

```ts
// Basic usage
const capitalized = capitalize("hello world");
console.log(capitalized); // "Hello world"
```

```ts
// With an already capitalized string
const alreadyCapitalized = capitalize("Journalism");
console.log(alreadyCapitalized); // "Journalism"
```

```ts
// With a single character
const singleChar = capitalize("a");
console.log(singleChar); // "A"
```

## createDirectory

Recursively creates a directory structure. This function is useful for ensuring
that a path exists before writing a file to it.

The function will not throw an error if the directory already exists. It can
also accept a full file path, in which case it will create all the parent
directories, ignoring the filename portion.

### Signature

```typescript
function createDirectory(path: string): void;
```

### Parameters

- **`path`**: The path of the directory to create. This can be a path to a
  directory or a full path to a file.

### Examples

```ts
// Create a simple directory
createDirectory("./output/data");
// This will create the 'output' and 'data' folders if they don't exist.
```

````ts
// Create a directory from a file path
createDirectory("./output/data/my-file.json");
// This will create the './output/data' directory structure. The 'my-file.json' part is ignored.
``` @category Other



## dataAsCsv

Converts an array of objects into a CSV (Comma-Separated Values) string.

The function takes an array of objects and returns a string in CSV format. The first line of the string will be the headers, which are derived from the keys of the first object in the array. Each subsequent line will represent an object, with the values in the same order as the headers.

### Signature
```typescript
function dataAsCsv(arrayOfObjects: Record<string, unknown>[]): string;
````

### Parameters

- **`data`**: An array of objects to be converted. All objects in the array
  should have the same keys.

### Returns

A string representing the data in CSV format.

### Examples

```ts
// Basic usage with a simple dataset
const dataset = [
  { make: "Toyota", model: "Camry", year: 2021 },
  { make: "Honda", model: "Accord", year: 2022 },
  { make: "Ford", model: "Mustang", year: 2020 },
];

const csvString = dataAsCsv(dataset);

console.log(csvString);
// Expected output:
// "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
```

## dataToArrays

Transforms an array of objects into an object of arrays. This function is the
inverse of `arraysToData` and is useful for converting data from a row-based
format to a columnar format.

### Signature

```typescript
function dataToArrays<T extends Record<string, unknown>>(
  data: T[],
): { [K in keyof T]: T[K][] };
```

### Parameters

- **`data`**: An array of objects. Each object is expected to have the same set
  of keys.

### Returns

An object where each key maps to an array of values, effectively representing
the data in a columnar format.

### Examples

```ts
// Basic usage with a simple dataset
const rowData = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "London" },
  { name: "Charlie", age: 35, city: "Paris" },
];

const columnarData = dataToArrays(rowData);

console.log(columnarData);
// Expected output:
// {
//   name: ['Alice', 'Bob', 'Charlie'],
//   age: [30, 25, 35],
//   city: ['New York', 'London', 'Paris']
// }
```

```ts
// Preparing data for statistical analysis
const measurements = [
  { id: 1, temp: 20, humidity: 60 },
  { id: 2, temp: 22, humidity: 65 },
  { id: 3, temp: 18, humidity: 55 },
];

const separatedVariables = dataToArrays(measurements);

console.log(separatedVariables);
// Expected output:
// {
//   id: [1, 2, 3],
//   temp: [20, 22, 18],
//   humidity: [60, 65, 55]
// }
```

## deleteFromBucket

Deletes a specified file from a Google Cloud Storage (GCS) bucket.

The function requires the Google Cloud project ID and the target bucket name.
These can be provided either through environment variables (`BUCKET_PROJECT` and
`BUCKET_NAME`) or directly as parameters in the `options` object. Parameters
passed in `options` will take precedence over environment variables.

By default, if the specified file does not exist in the bucket, the function
will throw an error. However, you can suppress this behavior by setting the
`try` option to `true`, which will cause the function to complete silently if
the file is not found.

### Signature

```typescript
async function deleteFromBucket(
  destination: string,
  options?: { project?: string; bucket?: string; try?: boolean },
): Promise<void>;
```

### Parameters

- **`destination`**: The full path to the file within the bucket (e.g.,
  'my-folder/my-file.txt').
- **`options`**: Optional configuration for the deletion operation.
- **`options.project`**: The Google Cloud project ID. If not provided, it
  defaults to the `BUCKET_PROJECT` environment variable.
- **`options.bucket`**: The name of the Google Cloud Storage bucket. If not
  provided, it defaults to the `BUCKET_NAME` environment variable.
- **`options.try`**: If `true`, the function will not throw an error if the file
  to be deleted does not exist. Defaults to `false`.

### Examples

```ts
// Basic usage: Delete a file from the bucket.
await deleteFromBucket("path/to/your/file.txt");
```

```ts
// Delete a file, suppressing errors if it doesn't exist.
await deleteFromBucket("path/to/non-existent-file.txt", { try: true });
```

```ts
// Explicitly specify project ID and bucket name.
await deleteFromBucket("reports/2023-summary.pdf", {
  project: "my-gcp-project-id",
  bucket: "my-data-bucket",
});
```

## distance

Calculates the Haversine distance between two geographical points (longitude and
latitude) in kilometers. The Haversine formula is used to determine the
great-circle distance between two points on a sphere given their longitudes and
latitudes.

This function is useful for geospatial applications where accurate distance
measurements over the Earth's surface are required,.

### Signature

```typescript
function distance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
  options?: { decimals?: number },
): number;
```

### Parameters

- **`lon1`**: The longitude of the first point.
- **`lat1`**: The latitude of the first point.
- **`lon2`**: The longitude of the second point.
- **`lat2`**: The latitude of the second point.
- **`options`**: Optional settings for the distance calculation.
- **`options.decimals`**: The number of decimal places to round the result to.
  If not specified, the result will not be rounded.

### Returns

The distance between the two points in kilometers.

### Examples

```ts
// Basic usage: Calculate the distance between two cities.
// Montreal (-73.5673, 45.5017) and Toronto (-79.3832, 43.6532)
const dist = distance(-73.5673, 45.5017, -79.3832, 43.6532);
console.log(dist); // Approximately 504.5 km
```

```ts
// Rounding the result to a whole number.
const roundedDist = distance(-73.5673, 45.5017, -79.3832, 43.6532, {
  decimals: 0,
});
console.log(roundedDist); // 505 km
```

## downloadFile

Downloads a file from a given URL and saves it to a specified local path. This
function is useful for programmatically fetching resources from the web, such as
datasets, images, or documents.

The function uses streams for efficient handling of potentially large files,
ensuring that the entire file does not need to be loaded into memory at once.

### Signature

```typescript
async function downloadFile(url: string, filePath: string): Promise<void>;
```

### Parameters

- **`url`**: The URL of the file to download. This should be a complete and
  valid URL (e.g., 'https://example.com/data.zip').
- **`filePath`**: The absolute or relative local path where the downloaded file
  should be saved (e.g., './downloads/report.pdf').

### Examples

```ts
// Basic usage: Download a CSV file.
await downloadFile(
  "https://example.com/data.csv",
  "./data/downloaded_data.csv",
);
console.log("CSV file downloaded successfully!");
```

```ts
// Download an image file.
await downloadFile(
  "https://www.example.com/image.jpg",
  "./images/downloaded_image.jpg",
);
console.log("Image downloaded successfully!");
```

## downloadFromBucket

Downloads a file from a Google Cloud Storage (GCS) bucket to a specified local
path. This function provides robust handling for existing local files, allowing
you to skip downloads or overwrite files as needed.

The function requires the Google Cloud project ID and the target bucket name.
These can be provided either through environment variables (`BUCKET_PROJECT` and
`BUCKET_NAME`) or directly as parameters in the `options` object. Parameters
passed in `options` will take precedence over environment variables.

By default, if a local file with the same name already exists at the
`destination` path, the function will throw an error to prevent accidental
overwrites. You can modify this behavior using the `skip` or `overwrite`
options.

### Signature

```typescript
async function downloadFromBucket(
  source: string,
  destination: string,
  options?: {
    project?: string;
    bucket?: string;
    overwrite?: boolean;
    skip?: boolean;
  },
): Promise<void>;
```

### Parameters

- **`source`**: The path to the file within the GCS bucket (e.g.,
  'my-folder/document.pdf').
- **`destination`**: The local file path where the downloaded file will be saved
  (e.g., './downloads/document.pdf').
- **`options`**: Optional configuration for the download operation.
- **`options.project`**: The Google Cloud project ID. If not provided, it
  defaults to the `BUCKET_PROJECT` environment variable.
- **`options.bucket`**: The name of the Google Cloud Storage bucket. If not
  provided, it defaults to the `BUCKET_NAME` environment variable.
- **`options.overwrite`**: If `true`, an existing local file at the
  `destination` path will be overwritten. Cannot be used with `skip`. Defaults
  to `false`.
- **`options.skip`**: If `true`, the download will be skipped if a local file
  already exists at the `destination` path. Cannot be used with `overwrite`.
  Defaults to `false`.

### Examples

```ts
// Basic usage: Download a file.
await downloadFromBucket(
  "reports/annual-report.pdf",
  "./local-reports/annual-report.pdf",
);
console.log("File downloaded successfully!");
```

```ts
// Skip download if the file already exists locally.
await downloadFromBucket("images/profile.jpg", "./local-images/profile.jpg", {
  skip: true,
});
console.log("Download skipped if file exists, or downloaded otherwise.");
```

```ts
// Overwrite an existing local file.
await downloadFromBucket(
  "data/latest-data.csv",
  "./local-data/latest-data.csv",
  { overwrite: true },
);
console.log("File downloaded and overwritten if it existed.");
```

```ts
// Specify project and bucket explicitly.
await downloadFromBucket(
  "configs/app-settings.json",
  "./local-configs/settings.json",
  {
    project: "my-gcp-project",
    bucket: "my-config-bucket",
  },
);
```

## class DurationTracker

A utility class for tracking the progress and estimating the remaining time of
iterative processes. It calculates the average duration of completed iterations
and uses this to project the time left for the remaining tasks. This is
particularly useful for long-running operations where users need feedback on
progress.

The tracker provides methods to mark the start of an iteration and to log the
estimated remaining time. The log message can be customized with a prefix and
suffix.

### Constructor

Creates an instance of DurationTracker.

#### Parameters

- **`length`**: The total number of iterations.
- **`options`**: Optional settings for the tracker.

### Methods

#### `start`

Starts the timer for the current iteration.

##### Signature

```typescript
start(): void;
```

##### Examples

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start(); // Mark the start of each iteration
  // Simulate some work
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
```

#### `log`

Logs the estimated remaining time based on the average duration of previous
iterations.

##### Signature

```typescript
log(): void;
```

##### Examples

```ts
const totalItems = 100;
const tracker = new DurationTracker(totalItems);
for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  tracker.log(); // Log the estimated remaining time for each iteration
}
```

### Examples

```ts
// Basic usage: Tracking a loop with 100 iterations.
const totalItems = 100;
const tracker = new DurationTracker(totalItems, {
  prefix: "Processing... Estimated time remaining: ",
  suffix: " until completion.",
});

for (let i = 0; i < totalItems; i++) {
  tracker.start();
  // Simulate some work
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  tracker.log();
}
console.log("Processing complete!");
```

## euclidianDistance

Calculates the Euclidean distance between two points in a 2D Cartesian
coordinate system. The Euclidean distance is the shortest straight-line distance
between two points, often referred to as the "as the crow flies" distance.

This function applies the Pythagorean theorem to compute the distance.

### Signature

```typescript
function euclidianDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number;
```

### Parameters

- **`x1`**: The x-coordinate of the first point.
- **`y1`**: The y-coordinate of the first point.
- **`x2`**: The x-coordinate of the second point.
- **`y2`**: The y-coordinate of the second point.

### Returns

The Euclidean distance between the two points.

### Examples

```ts
// Basic usage: Calculate the distance between (0,0) and (3,4).
const dist1 = euclideanDistance(0, 0, 3, 4);
console.log(dist1); // 5
```

```ts
// Calculate the distance between two points with negative coordinates.
const dist2 = euclideanDistance(-1, -1, 2, 3);
console.log(dist2); // 5
```

```ts
// Distance between identical points should be zero.
const dist3 = euclideanDistance(5, 10, 5, 10);
console.log(dist3); // 0
```

## filesInBucket

Lists files within a Google Cloud Storage (GCS) bucket. You can list all files
in the bucket or narrow down the results to a specific folder. The function can
also return the full Google Storage URIs for each file.

This function requires the Google Cloud project ID and the target bucket name.
These can be provided either through environment variables (`BUCKET_PROJECT` and
`BUCKET_NAME`) or directly as parameters in the `options` object. Parameters
passed in `options` will take precedence over environment variables.

### Signature

```typescript
async function filesInBucket(
  options?: {
    folder?: string;
    project?: string;
    bucket?: string;
    URI?: boolean;
  },
): Promise<string[]>;
```

### Parameters

- **`options`**: Optional configuration for listing files.
- **`options.folder`**: The path to a specific folder within the bucket (e.g.,
  'my-data/'). Only files within this folder will be listed.
- **`options.project`**: The Google Cloud project ID. If not provided, it
  defaults to the `BUCKET_PROJECT` environment variable.
- **`options.bucket`**: The name of the Google Cloud Storage bucket. If not
  provided, it defaults to the `BUCKET_NAME` environment variable.
- **`options.URI`**: If `true`, the function will return the full Google Storage
  URI (e.g., 'gs://your-bucket/path/to/file.txt') for each file. Defaults to
  `false`, returning just the file path within the bucket.

### Returns

An array of strings, where each string is either the file path within the bucket
or its full Google Storage URI, depending on the `URI` option.

### Examples

```ts
// List all files in the default bucket.
const allFiles = await filesInBucket();
console.log("All files:", allFiles);
```

```ts
// List files within a specific folder.
const folderFiles = await filesInBucket({ folder: "images/thumbnails/" });
console.log("Files in folder:", folderFiles);
```

```ts
// Get Google Storage URIs for files in a folder.
const fileURIs = await filesInBucket({ folder: "documents/", URI: true });
console.log("File URIs:", fileURIs);
```

```ts
// Explicitly specify project and bucket.
const specificBucketFiles = await filesInBucket({
  project: "my-gcp-project",
  bucket: "my-archive-bucket",
  folder: "old-data/",
});
console.log("Files from specific bucket:", specificBucketFiles);
```

## formatDate

Formats a `Date` object into a human-readable string based on a specified
format, style, and time zone. This function provides flexible date and time
formatting options, including support for UTC, different linguistic styles
(English/French), and various display preferences like abbreviations and
zero-padding.

### Signature

```typescript
function formatDate(
  date: Date,
  format:
    | "YYYY-MM-DD"
    | "YYYY-MM-DD HH:MM:SS TZ"
    | "DayOfWeek, Month Day"
    | "Month DD"
    | "Month DD, HH:MM period"
    | "Month DD, HH:MM period TZ"
    | "DayOfWeek, HH:MM period"
    | "DayOfWeek, HH:MM period TZ"
    | "Month DD, YYYY"
    | "Month DD, YYYY, at HH:MM period"
    | "Month DD, YYYY, at HH:MM period TZ"
    | "DayOfWeek"
    | "Month"
    | "YYYY"
    | "MM"
    | "DD"
    | "HH:MM period"
    | "HH:MM period TZ"
    | "HH:MM period TZ on Month DD, YYYY"
    | "HH:MM period on Month DD, YYYY"
    | "HH:MM period TZ on Month DD"
    | "HH:MM period on Month DD",
  options?: {
    utc?: boolean;
    style?: "cbc" | "rc";
    abbreviations?: boolean;
    noZeroPadding?: boolean;
    threeLetterMonth?: boolean;
    timeZone?:
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon";
  },
): string;
```

### Parameters

- **`date`**: The `Date` object to be formatted.
- **`format`**: A predefined string literal specifying the desired output
  format. Examples include "YYYY-MM-DD", "Month DD, YYYY", "HH:MM period", etc.
- **`options`**: Optional settings to customize the formatting behavior.
- **`options.utc`**: If `true`, the date will be formatted in UTC (Coordinated
  Universal Time). Defaults to `false`.
- **`options.style`**: The linguistic style for formatting. Use "cbc" for
  English (default) or "rc" for French. This affects month and day names, and
  time representations.
- **`options.abbreviations`**: If `true`, month and day names will be
  abbreviated (e.g., "Jan.", "Mon."). Defaults to `false`.
- **`options.noZeroPadding`**: If `true`, single-digit days and months will not
  be padded with a leading zero (e.g., "1" instead of "01"). Defaults to
  `false`.
- **`options.threeLetterMonth`**: If `true`, month abbreviations will be three
  letters (e.g., "Jan", "Feb"). Defaults to `false`.
- **`options.timeZone`**: Specifies a time zone for formatting. Accepts standard
  IANA time zone names (e.g., "America/New_York") or specific Canadian time
  zones. If `utc` is `true`, this option is ignored.

### Returns

The formatted date string.

### Examples

```ts
// Basic usage: Format a date in default English style.
const date = new Date("2023-01-01T01:35:00.000Z");
const formatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  utc: true,
});
console.log(formatted); // "January 1, 2023, at 1:35 a.m."
```

```ts
// Formatting in French style with abbreviations.
const frenchFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  style: "rc",
  abbreviations: true,
  utc: true,
});
console.log(frenchFormatted); // "1 janv. 2023 à 1 h 35"
```

```ts
// Formatting with a specific time zone.
const estFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
  timeZone: "Canada/Eastern",
});
console.log(estFormatted); // "January 1, 2023, at 8:35 p.m. EST" (assuming date is UTC)
```

```ts
// Custom format: YYYY-MM-DD
const isoFormatted = formatDate(new Date("2024-03-15T10:00:00Z"), "YYYY-MM-DD");
console.log(isoFormatted); // "2024-03-15"
```

## formatNumber

Formats a number according to specified style, rounding, and display options.
This versatile function can handle various numerical formatting needs.

The function supports two main styles: "cbc" (Canadian Broadcasting Corporation
style, typically English) and "rc" (Radio-Canada style, typically French), which
dictate the thousands separator and decimal marker.

### Signature

```typescript
function formatNumber(
  number: number,
  options?: {
    style?: "cbc" | "rc";
    sign?: boolean;
    round?: boolean;
    decimals?: number;
    significantDigits?: number;
    fixed?: boolean;
    nearestInteger?: number;
    abbreviation?: boolean;
    prefix?: string;
    suffix?: string;
    position?: boolean;
  },
): string;
```

### Parameters

- **`number`**: The number to be formatted.
- **`options`**: An object containing various formatting options.
- **`options.style`**: The formatting style to apply. Can be "cbc" (default,
  typically English with comma thousands separator and dot decimal) or "rc"
  (typically French with space thousands separator and comma decimal).
- **`options.sign`**: If `true`, a "+" sign will be prepended to positive
  numbers. Negative numbers always retain their "-" sign. Defaults to `false`.
- **`options.round`**: If `true`, the number will be rounded to the nearest
  integer or based on `decimals`, `significantDigits`, or `nearestInteger`
  options. Defaults to `false`.
- **`options.decimals`**: The number of decimal places to round to.
- **`options.significantDigits`**: The number of significant digits to round to.
- **`options.fixed`**: If `true`, the number will be displayed with a fixed
  number of decimal places as specified by `decimals`, padding with zeros if
  necessary. Defaults to `false`.
- **`options.nearestInteger`**: The base to which the number should be rounded
  (e.g., 10 for rounding to the nearest ten, 100 for nearest hundred).
- **`options.abbreviation`**: If `true`, the number will be abbreviated (e.g.,
  1,200,000 becomes "1.2M"). Defaults to `false`.
- **`options.prefix`**: A string to prepend before the formatted number.
- **`options.suffix`**: A string to append after the formatted number.
- **`options.position`**: If `true`, formats the number as an ordinal position
  (e.g., "1st", "2nd" in English, "1er", "2e" in French).

### Returns

The formatted number as a string.

### Examples

```ts
// Basic usage: Format a number with thousands separator.
const num1 = formatNumber(1234567.89);
console.log(num1); // "1,234,567.89"
```

```ts
// With sign and rounding to 0 decimals.
const num2 = formatNumber(1234.567, { sign: true, decimals: 0 });
console.log(num2); // "+1,235"
```

```ts
// French style with abbreviation.
const num3 = formatNumber(1234567, { style: "rc", abbreviation: true });
console.log(num3); // "1,2 M"
```

```ts
// Fixed number of decimals with prefix and suffix.
const num4 = formatNumber(98.765, {
  decimals: 2,
  fixed: true,
  prefix: "$",
  suffix: " CAD",
});
console.log(num4); // "$98.77 CAD"
```

```ts
// Formatting as an ordinal position.
const position1 = formatNumber(1, { position: true });
console.log(position1); // "1st"

const position2 = formatNumber(2, { position: true, style: "rc" });
console.log(position2); // "2e"
```

## geoTo3D

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x,
y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter
determines the size of the sphere on which the points are projected.

### Signature

```typescript
function geoTo3D(
  lon: number,
  lat: number,
  radius: number,
  options: { decimals?: number; toArray: true },
): [number, number, number];
```

### Parameters

- **`lon`**: The longitude of the geographical point, in degrees.
- **`lat`**: The latitude of the geographical point, in degrees.
- **`radius`**: The radius of the sphere on which to project the coordinates.
- **`options`**: Optional settings for the conversion.
- **`options.decimals`**: The number of decimal places to round the x, y, and z
  coordinates to. If not specified, no rounding is applied.
- **`options.toArray`**: If `true`, the function will return the coordinates as
  an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

### Returns

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian
coordinates.

### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, {
  decimals: 2,
  toArray: true,
});
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```

## geoTo3D

Converts geographical coordinates (longitude and latitude) into 3D Cartesian (x,
y, z) coordinates based on a specified radius.

The conversion assumes a spherical Earth model. The `radius` parameter
determines the size of the sphere on which the points are projected.

### Signature

```typescript
function geoTo3D(
  lon: number,
  lat: number,
  radius: number,
  options?: { decimals?: number; toArray?: false },
): { x: number; y: number; z: number };
```

### Parameters

- **`lon`**: The longitude of the geographical point, in degrees.
- **`lat`**: The latitude of the geographical point, in degrees.
- **`radius`**: The radius of the sphere on which to project the coordinates.
- **`options`**: Optional settings for the conversion.
- **`options.decimals`**: The number of decimal places to round the x, y, and z
  coordinates to. If not specified, no rounding is applied.
- **`options.toArray`**: If `true`, the function will return the coordinates as
  an array `[x, y, z]` instead of an object `{ x, y, z }`. Defaults to `false`.

### Returns

An object `{ x, y, z }` or an array `[x, y, z]` representing the 3D Cartesian
coordinates.

### Examples

```ts
// Basic usage: Convert geographical coordinates to 3D object coordinates.
// Longitude: -73.5674 (Montreal), Latitude: 45.5019 (Montreal), Radius: 1
const coordsObject = geoTo3D(-73.5674, 45.5019, 1, { decimals: 2 });
console.log(coordsObject); // Expected output: { x: -0.67, y: 0.71, z: 0.2 }
```

```ts
// Convert geographical coordinates to 3D array coordinates.
const coordsArray = geoTo3D(-73.5674, 45.5019, 1, {
  decimals: 2,
  toArray: true,
});
console.log(coordsArray); // Expected output: [-0.67, 0.71, 0.2]
```

```ts
// Using a larger radius for visualization purposes.
const earthCoords = geoTo3D(0, 0, 6371, { decimals: 0 }); // Earth's approximate radius in km
console.log(earthCoords); // Expected output: { x: 0, y: 6371, z: 0 } (for 0,0 lat/lon)
```

## getClosest

Finds the geographical item closest to a given reference point (longitude and
latitude) from a list of geographical items.

The function calculates the distance between the reference point and each item
in the `geoItems` array using the Haversine formula (via the `distance`
function). It then returns the item with the minimum distance.

Optionally, you can choose to add the calculated distance as a new property to
the returned closest item. If the `geoItems` have a `properties` key (common in
GeoJSON-like structures), the distance will be added there; otherwise, it will
be added directly to the item object.

### Signature

```typescript
function getClosest<T>(
  lon: number,
  lat: number,
  geoItems: T[],
  getItemLon: (item: T) => number,
  getItemLat: (item: T) => number,
  options?: { addDistance?: false; decimals?: number },
): T;
```

### Parameters

- **`lon`**: The longitude of the reference point.
- **`lat`**: The latitude of the reference point.
- **`geoItems`**: An array of geographical items to search through. Each item
  should contain properties that can be accessed by `getItemLon` and
  `getItemLat` to retrieve its longitude and latitude.
- **`getItemLon`**: A function that takes an item from `geoItems` and returns
  its longitude.
- **`getItemLat`**: A function that takes an item from `geoItems` and returns
  its latitude.
- **`options`**: Optional settings for the search.
- **`options.addDistance`**: If `true`, the calculated distance to the closest
  item will be added as a property (`distance`) to the returned object. Defaults
  to `false`.
- **`options.decimals`**: The number of decimal places to round the calculated
  distance to, if `addDistance` is `true`.

### Returns

The geographical item from `geoItems` that is closest to the reference point. If
`addDistance` is `true`, the returned object will also include the `distance`
property.

### Examples

```ts
// Basic usage: Find the closest city to Ottawa.
const cities = [
  { name: "Montreal", lon: -73.5673, lat: 45.5017 },
  { name: "Toronto", lon: -79.3832, lat: 43.6532 },
  { name: "Vancouver", lon: -123.1207, lat: 49.2827 },
];
const ottawa = { lon: -75.6972, lat: 45.4215 };

const closestCity = getClosest(
  ottawa.lon,
  ottawa.lat,
  cities,
  (d) => d.lon,
  (d) => d.lat,
  { addDistance: true, decimals: 2 },
);

console.log(closestCity);
// Expected output: { name: "Montreal", lon: -73.5673, lat: 45.5017, distance: 160.69 }
```

```ts
// Finding the closest point in a GeoJSON FeatureCollection.
const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Park A" },
      geometry: { type: "Point", coordinates: [-74.0, 40.7] },
    },
    {
      type: "Feature",
      properties: { name: "Park B" },
      geometry: { type: "Point", coordinates: [-73.9, 40.8] },
    },
  ],
};
const userLocation = { lon: -73.95, lat: 40.75 };

const closestPark = getClosest(
  userLocation.lon,
  userLocation.lat,
  featureCollection.features,
  (f) => f.geometry.coordinates[0],
  (f) => f.geometry.coordinates[1],
  { addDistance: true },
);

console.log(closestPark);
// Expected output: { type: "Feature", properties: { name: "Park B", distance: ... }, geometry: { ... } }
```

## getClosest

Finds the geographical item closest to a given reference point and adds distance
to the properties object.

### Signature

```typescript
function getClosest<T extends { properties: unknown }>(
  lon: number,
  lat: number,
  geoItems: T[],
  getItemLon: (item: T) => number,
  getItemLat: (item: T) => number,
  options: { addDistance: true; decimals?: number },
): T & { properties: T["properties"] & { distance: number } };
```

### Parameters

- **`lon`**: - The longitude of the reference point.
- **`lat`**: - The latitude of the reference point.
- **`geoItems`**: - An array of geographical items with properties objects.
- **`getItemLon`**: - A function that returns longitude from an item.
- **`getItemLat`**: - A function that returns latitude from an item.
- **`options`**: - Settings with addDistance: true for items with properties.

### Returns

The closest item with distance added to its properties object.

## getClosest

Finds the geographical item closest to a given reference point and adds distance
directly to the item.

### Signature

```typescript
function getClosest<T>(
  lon: number,
  lat: number,
  geoItems: T[],
  getItemLon: (item: T) => number,
  getItemLat: (item: T) => number,
  options: { addDistance: true; decimals?: number },
): T & { distance: number };
```

### Parameters

- **`lon`**: - The longitude of the reference point.
- **`lat`**: - The latitude of the reference point.
- **`geoItems`**: - An array of geographical items without properties objects.
- **`getItemLon`**: - A function that returns longitude from an item.
- **`getItemLat`**: - A function that returns latitude from an item.
- **`options`**: - Settings with addDistance: true for items without properties.

### Returns

The closest item with distance added directly to the item.

## getCovarianceMatrix

Computes the covariance matrix for a given dataset. The covariance matrix is a
square matrix that describes the covariance between each pair of variables in a
dataset.

The function takes a 2D array (matrix) as input, where each inner array
represents a data point and each element within the inner array represents a
variable. It calculates the covariance between all pairs of variables.

Optionally, you can choose to invert the computed covariance matrix by setting
the `invert` option to `true`. The inverse covariance matrix is often used in
statistical applications, particularly in the calculation of Mahalanobis
distance.

### Signature

```typescript
function getCovarianceMatrix(
  data: number[][],
  options?: { invert?: boolean },
): number[][];
```

### Parameters

- **`data`**: - A 2D array of numbers representing the dataset. Each inner array
  is a data point, and each element is a variable.
- **`options`**: - Optional settings for the covariance matrix computation.
- **`options.invert`**: - If `true`, the function will return the inverse of the
  computed covariance matrix. Defaults to `false`.

### Returns

A 2D array representing the covariance matrix. If `options.invert` is `true`,
the inverse covariance matrix is returned.

### Throws

- **`Error`**: If any element in the input `data` is not a number.

### Examples

```ts
// Basic usage: Compute the covariance matrix for a 2x2 dataset.
// This example uses a subset of the wine-quality dataset.
const twoVariables = [
  [6.5, 11],
  [7.1, 12.2],
  [6.3, 10.5],
];
const matrix2x2 = getCovarianceMatrix(twoVariables);
console.log(matrix2x2);
// Expected output (approximately):
// [
//   [0.7119681970550005, -0.12550719251309772],
//   [-0.12550719251309772, 1.514117788841716]
// ]
```

```ts
// Compute the inverse covariance matrix for a 2x2 dataset.
const invertedMatrix2x2 = getCovarianceMatrix(twoVariables, { invert: true });
console.log(invertedMatrix2x2);
// Expected output (approximately):
// [
//   [1.4253851985430073, 0.1181520327131952],
//   [0.11815203271319519, 0.6702443742450724]
// ]
```

// Basic usage: Compute the covariance matrix for a 3x3 dataset. const
threeVariables = [ [6.5, 1.9, 11], [7.1, 2.2, 12.2], [6.3, 2.1, 10.5] ]; const
matrix3x3 = getCovarianceMatrix(threeVariables); console.log(matrix3x3); //
Expected output (approximately): // [ // [0.7119681970550005,
0.3809440223475775, -0.12550719251309772], // [0.3809440223475775,
25.72051786341322, -2.8121660685891356], // [-0.12550719251309772,
-2.8121660685891356, 1.514117788841716] // ]

// Compute the inverse covariance matrix for a 3x3 dataset. const
invertedMatrix3x3 = getCovarianceMatrix(threeVariables, { invert: true });
console.log(invertedMatrix3x3); // Expected output (approximately): // [ //
[1.4275549391155293, -0.01029636303437083, 0.09920848359253127], //
[-0.010296363034370827, 0.048860722373056165, 0.08989538259823723], //
[0.09920848359253126, 0.08989538259823725, 0.835636521966158] // ]

// Basic usage: Compute the covariance matrix for a 4x4 dataset. const
fourVariables = [ [6.5, 1.9, 0.99], [7.1, 2.2, 0.98], [6.3, 2.1, 0.97] ]; const
matrix4x4 = getCovarianceMatrix(fourVariables); console.log(matrix4x4); //
Expected output (approximately): // [ // [0.7119681970550005,
0.3809440223475775, 0.0006695405312093783, -0.12550719251309772], //
[0.3809440223475775, 25.72051786341322, 0.012724566900994994,
-2.8121660685891356], // [0.0006695405312093783, 0.012724566900994994,
0.000008943697841212739, -0.00287084411696803], // [-0.12550719251309772,
-2.8121660685891356, -0.00287084411696803, 1.514117788841716] // ]

// Compute the inverse covariance matrix for a 4x4 dataset. const
invertedMatrix4x4 = getCovarianceMatrix(fourVariables, { invert: true });
console.log(invertedMatrix4x4); // Expected output (approximately): // [ //
[1.890366500801349, 0.29548258210193046, -857.0948891407204,
-0.9196015969508056], // [0.29548258210193046, 0.2508884395460819,
-566.2813827046937, -0.583230998661561], // [-857.0948891407204,
-566.2813827046937, 1587280.2449344082, 1886.7655549874191], //
[-0.9196015969508056, -0.583230998661561, 1886.7655549874191, 3.078393760864504]
// ]

## getEmbedding

Generates a numerical embedding (vector representation) for a given text string.
Embeddings are crucial for various natural language processing (NLP) tasks,
including semantic search, text classification, clustering, and anomaly
detection, as they allow text to be processed and compared mathematically.

This function supports both Google's Gemini AI models and local models running
with Ollama. It provides options for authentication, model selection, and
caching to optimize performance and cost.

**Authentication**: Credentials and model information can be provided via
environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`,
`AI_EMBEDDINGS_MODEL`) or directly through the `options` object. Options take
precedence over environment variables.

**Local Models**: To use a local model with Ollama, set the `OLLAMA` environment
variable to `true` and ensure Ollama is running on your machine. You will also
need to specify the model name using the `AI_EMBEDDINGS_MODEL` environment
variable or the `model` option. If you want your Ollama instance to be used, you
can pass an instance of the `Ollama` class as the `ollama` option.

**Caching**: To save resources and time, you can enable caching by setting
`cache` to `true`. Responses will be stored in a local `.journalism-cache`
directory. If the same request is made again, the cached response will be
returned, avoiding redundant API calls. Remember to add `.journalism-cache` to
your `.gitignore` file.

### Signature

```typescript
async function getEmbedding(
  text: string,
  options?: {
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    cache?: boolean;
    ollama?: boolean | Ollama;
    verbose?: boolean;
    contextWindow?: number;
  },
): Promise<number[]>;
```

### Parameters

- **`text`**: The input text string for which to generate the embedding.
- **`options`**: Configuration options for the embedding generation.
- **`options.model`**: The specific embedding model to use (e.g.,
  'text-embedding-004'). Defaults to the `AI_EMBEDDINGS_MODEL` environment
  variable.
- **`options.apiKey`**: Your API key for authentication with Google Gemini.
  Defaults to the `AI_KEY` environment variable.
- **`options.vertex`**: If `true`, uses Vertex AI for authentication. Defaults
  to `false`.
- **`options.project`**: Your Google Cloud project ID for Vertex AI. Defaults to
  the `AI_PROJECT` environment variable.
- **`options.location`**: The Google Cloud location for your Vertex AI project.
  Defaults to the `AI_LOCATION` environment variable.
- **`options.cache`**: If `true`, enables caching of the embedding response.
  Defaults to `false`.
- **`options.ollama`**: If `true`, uses Ollama for local embedding generation.
  Defaults to the `OLLAMA` environment variable. If you want your Ollama
  instance to be used, you can pass it here too.
- **`options.verbose`**: If `true`, logs additional information such as
  execution time and the truncated input text. Defaults to `false`.
- **`options.contextWindow`**: - An option to specify the context window size
  for Ollama models. By default, Ollama sets this depending on the model, which
  can be lower than the actual maximum context window size of the model.

### Returns

A promise that resolves to an an array of numbers representing the generated
embedding.

### Examples

```ts
// Basic usage: Generate an embedding for a simple text.
const embedding = await getEmbedding(
  "The quick brown fox jumps over the lazy dog.",
);
console.log(embedding); // [0.012, -0.034, ..., 0.056] (example output)
```

```ts
// Generate an embedding with caching enabled.
const cachedEmbedding = await getEmbedding(
  "Artificial intelligence is transforming industries.",
  { cache: true },
);
console.log(cachedEmbedding);
```

```ts
// Generate an embedding using a specific model and API key.
const customEmbedding = await getEmbedding(
  "Machine learning is a subset of AI.",
  {
    model: "another-embedding-model",
    apiKey: "your_custom_api_key",
  },
);
console.log(customEmbedding);
```

```ts
// Generate an embedding with verbose logging.
const verboseEmbedding = await getEmbedding(
  "The quick brown fox jumps over the lazy dog.",
  { verbose: true },
);
console.log(verboseEmbedding);
```

## getEnvironmentCanadaRecords

Retrieves historical weather records from Environment and Climate Change Canada
for specified locations and date ranges. This function fetches extreme weather
records (daily maximum temperatures, precipitation, or snowfall) from the
closest weather stations to your provided coordinates.

The function uses Environment Canada's Long-Term Climate Extremes (LTCE) API to
find the nearest weather stations that have recorded the specified weather
variable, then retrieves the historical record values for each day in your
specified date range.

**Weather Variables**:

- `"DAILY MAXIMUM TEMPERATURE"`: Historical record high temperatures for each
  day
- `"DAILY TOTAL PRECIPITATION"`: Historical record precipitation amounts for
  each day
- `"DAILY TOTAL SNOWFALL"`: Historical record snowfall amounts for each day

**Station Selection**: For each location you provide, the function automatically
finds the closest weather station that has recorded the specified weather
variable. The distance to the station is calculated and included in the results,
allowing you to assess the relevance of the data to your specific location.

**Rate Limiting**: The function includes built-in rate limiting with a
configurable delay between API calls to respect Environment Canada's servers.
The default delay is 100ms between requests, but this can be adjusted based on
your needs.

### Signature

```typescript
async function getEnvironmentCanadaRecords<T extends Record<string, unknown>>(locations: T[], variable: "DAILY MAXIMUM TEMPERATURE" | "DAILY TOTAL PRECIPITATION" | "DAILY TOTAL SNOWFALL", dateRange: [${[0m[36mnumber[0m}-${[0m[36mnumber[0m}-${[0m[36mnumber[0m}, ${[0m[36mnumber[0m}-${[0m[36mnumber[0m}-${[0m[36mnumber[0m}], options?: { delay?: number; verbose?: boolean }): Promise<(T & { recordMonth: number; recordDay: number; recordVariable: string; recordValue: number; recordYear: number; previousRecordValue: number; previousRecordYear: number; recordStationName: string; recordStationId: string; recordStationLat: number; recordStationLon: number; recordStationDistance: number; recordStationRecordBegin: string; recordStationRecordEnd: string | null })[]>;
```

### Parameters

- **`locations`**: - An array of location objects, each containing `lat` and
  `lon` properties. Additional properties will be preserved in the output.
- **`variable`**: - The type of weather record to retrieve. Must be one of: -
  `"DAILY MAXIMUM TEMPERATURE"`: Record high temperatures in Celsius -
  `"DAILY TOTAL PRECIPITATION"`: Record precipitation amounts in millimeters -
  `"DAILY TOTAL SNOWFALL"`: Record snowfall amounts in centimeters
- **`dateRange`**: - A tuple of two date strings in "YYYY-MM-DD" format
  representing the start and end dates (inclusive) for the record retrieval.
  Note: The year values are only used for iteration purposes to determine which
  calendar days to fetch records for - the actual records returned are
  historical all-time extremes regardless of the year specified.
- **`options`**: - Configuration options for the data retrieval.
- **`options.delay`**: - Delay in milliseconds between API requests. Defaults to
  100ms. Increase this value if you encounter rate limiting.
- **`options.verbose`**: - If `true`, logs detailed information about station
  selection and API requests. Useful for debugging and monitoring progress.
  Defaults to `false`.

### Returns

A Promise that resolves to an array of objects containing the weather records.
Each object includes:

- All original properties from the input location
- `recordMonth`: The month (1-12) of the record
- `recordDay`: The day of the month of the record
- `recordVariable`: The weather variable that was requested
- `recordValue`: The record value (temperature in °C, precipitation/snowfall in
  mm/cm)
- `recordYear`: The year when the record was set
- `previousRecordValue`: The previous record value before the current record
- `previousRecordYear`: The year when the previous record was set
- `recordStationName`: The name of the weather station where the record was
  measured
- `recordStationId`: The unique identifier of the weather station
- `recordStationLat`: The latitude of the weather station
- `recordStationLon`: The longitude of the weather station
- `recordStationDistance`: The distance in meters from your location to the
  weather station
- `recordStationRecordBegin`: The date when record-keeping began at this station
- `recordStationRecordEnd`: The date when record-keeping ended at this station
  (null if still active)

### Examples

```ts
// Get record high temperatures for Toronto in July 2023
const torontoRecords = await getEnvironmentCanadaRecords(
  [{ lat: 43.6532, lon: -79.3832, city: "Toronto" }],
  "DAILY MAXIMUM TEMPERATURE",
  ["2023-07-01", "2023-07-31"],
);
console.table(torontoRecords);
// Returns daily record highs with station info and distances
```

```ts
// Get precipitation records for multiple cities with custom options
const cities = [
  { lat: 45.4215, lon: -75.6972, name: "Ottawa" },
  { lat: 43.6532, lon: -79.3832, name: "Toronto" },
  { lat: 45.5017, lon: -73.5673, name: "Montreal" },
];

const precipitationRecords = await getEnvironmentCanadaRecords(
  cities,
  "DAILY TOTAL PRECIPITATION",
  ["2023-06-01", "2023-08-31"],
  {
    delay: 200, // Slower requests to be extra respectful
    verbose: true, // Log progress and station information
  },
);
console.table(precipitationRecords);
```

```ts
// Get snowfall records for winter months
const vancouverSnow = await getEnvironmentCanadaRecords(
  [{ lat: 49.2827, lon: -123.1207, region: "Vancouver" }],
  "DAILY TOTAL SNOWFALL",
  ["2023-12-01", "2024-02-29"],
);

// Filter for days with significant snowfall records
const significantSnow = vancouverSnow.filter((record) =>
  record.recordValue > 10
);
console.table(significantSnow);
```

## getGeoTiffDetails

Extracts detailed information from a GeoTIFF file, which can then be used with
the `getGeoTiffValues` function.

### Signature

```typescript
async function getGeoTiffDetails(
  path: string,
): Promise<
  {
    image: GeoTIFFImage;
    bbox: number[];
    pixelWidth: number;
    pixelHeight: number;
    bboxWidth: number;
    bboxHeight: number;
  }
>;
```

### Parameters

- **`path`**: - The absolute path to the GeoTIFF file.

### Returns

A Promise that resolves to an object containing the GeoTIFF image, bounding box,
pixel dimensions, and bounding box dimensions.

### Examples

```ts
// Basic usage
const geoTiffDetails = await getGeoTiffDetails("./some-file.tif");
console.log(geoTiffDetails.bbox); // [ -73.8, 45.4, -73.5, 45.6 ]
```

```ts
// Using the output with `getGeoTiffValues`

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif");
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails);
console.log(value); // 255
```

## getGeoTiffValues

Extracts values at specific latitude and longitude coordinates from a GeoTIFF
image. This function works in conjunction with the `getGeoTiffDetails` function,
using the details returned by it.

### Signature

```typescript
async function getGeoTiffValues(
  lat: number,
  lon: number,
  geoTiffDetails: {
    image: GeoTIFFImage;
    bbox: number[];
    pixelWidth: number;
    pixelHeight: number;
    bboxWidth: number;
    bboxHeight: number;
  },
): Promise<TypedArray>;
```

### Parameters

- **`lat`**: - The latitude coordinate for which to extract the value.
- **`lon`**: - The longitude coordinate for which to extract the value.
- **`geoTiffDetails`**: - An object containing the GeoTIFF image details,
  typically obtained from `getGeoTiffDetails`.

### Returns

A Promise that resolves to the pixel value at the specified coordinates, or a
`TypedArray` if multiple bands are present.

### Throws

- **`Error`**: If the coordinates are outside the GeoTIFF's bounding box or if
  there's an issue reading the raster data.

### Examples

```ts
// Basic usage

const geoTiffDetails = await getGeoTiffDetails("./some-file.tif");
const value = await getGeoTiffValues(45.50, -73.57, geoTiffDetails);
console.log(value); // 255
```

## getHtmlTable

Extracts tabular data from an HTML table on a given URL and returns it as an
array of objects. This function is particularly useful for scraping structured
data from web pages.

### Signature

```typescript
async function getHtmlTable(
  url: string,
  options?: { selector?: string; index?: number },
): Promise<DSVRowArray<string>>;
```

### Parameters

- **`url`**: - The URL of the web page containing the HTML table.
- **`options`**: - An optional object to specify how to locate the table.
- **`options.selector`**: - A CSS selector string to identify the target table
  on the page. If not provided, the function will look for the first `<table>`
  element.
- **`options.index`**: - The 0-based index of the table to select if multiple
  tables match the `selector`. Defaults to `0`.

### Returns

A Promise that resolves to an array of objects representing the table data,
where each row is an object with column headers as keys.

### Examples

```ts
// Extract data from the first table on a page
const data = await getHtmlTable("https://example.com/data");
console.log(data[0]); // Accessing data from the first row
```

```ts
// Extract data from a specific table using a selector and index
// This parses the fourth table with the class name 'data-table'.
const specificTableData = await getHtmlTable("https://example.com/data", {
  selector: ".data-table",
  index: 3,
});
console.table(specificTableData);
```

## getHumidex

Calculates the humidex factor in Celsius based on the given temperature in
Celsius and humidity percentage.

If the calculated humidex is less than the provided temperature, the temperature
itself is returned.

This calculation uses the formula provided by the Canadian Centre for Climate
Services.

### Signature

```typescript
function getHumidex(temperature: number, humidity: number): number;
```

### Parameters

- **`temperature`**: - The ambient temperature in Celsius.
- **`humidity`**: - The relative humidity as a percentage (0-100).

### Returns

The calculated humidex value in Celsius, rounded to the nearest whole number.
Returns the original temperature if the calculated humidex is lower.

### Throws

- **`Error`**: If the humidity value is not within the valid range of 0 to 100.

### Examples

```ts
// Calculate humidex for a warm and humid day.
const humidex = getHumidex(30, 70); // returns 41
console.log(`Humidex: ${humidex}`);
```

```ts
// In cases where the calculated humidex is less than the temperature, the temperature is returned.
const humidexLowHumidity = getHumidex(20, 30); // returns 20 (since calculated humidex would be lower)
console.log(`Humidex: ${humidexLowHumidity}`);
```

## getId

Generates a unique ID string composed of letters and numbers, without spaces or
special characters. By default, the ID has a length of 6 characters. While handy
for general use, it is not cryptographically secure, meaning it should not be
used for security-sensitive applications where true randomness and
unpredictability are required.

The function ensures uniqueness by keeping track of previously generated IDs
within the current session. If a collision occurs (which is highly unlikely for
reasonable lengths), it will attempt to generate a new ID. For very small
`length` values, repeated collisions might trigger a warning to suggest
increasing the length to maintain uniqueness.

### Signature

```typescript
function getId(length?: number): string;
```

### Parameters

- **`length`**: - The desired length of the generated ID. Defaults to 6.

### Returns

A unique string ID.

### Examples

```ts
// Generate a default length ID (6 characters).
const id = getId();
console.log(id); // e.g., 'a1B2c3'
```

```ts
// Generate an ID with a specified length (e.g., 10 characters).
const customId = getId(10);
console.log(customId); // e.g., 'a1B2c3D4e5'
```

## getMahalanobisDistance

Computes the Mahalanobis distance between two data points (`x1` and `x2`) given
the inverted covariance matrix of the dataset. The Mahalanobis distance is a
measure of the distance between a point and a distribution. It is a unitless
measure. This function can handle data points of any dimension (i.e., with more
than 2 coordinates).

This function requires the inverted covariance matrix of your dataset, which can
be computed using the `getCovarianceMatrix` function with the `invert: true`
option.

### Signature

```typescript
function getMahalanobisDistance(
  x1: number[],
  x2: number[],
  invCovMatrix: number[][],
): number;
```

### Parameters

- **`x1`**: - The first data point (an array of numbers).
- **`x2`**: - The second data point (an array of numbers).
- **`invCovMatrix`**: - The inverted covariance matrix of the dataset (a 2D
  array of numbers).

### Returns

The Mahalanobis distance between `x1` and `x2`.

### Examples

```ts
// Calculate the Mahalanobis distance between two simple 2D points.
// Note: In a real-world scenario, `invCovMatrix` would be derived from a dataset.
const x1 = [1, 2];
const x2 = [3, 4];
const invCovMatrix = [
  [1, 0],
  [0, 1],
];
const distance = getMahalanobisDistance(x1, x2, invCovMatrix);
console.log(`Mahalanobis Distance: ${distance}`);
```

```ts
// Calculate the Mahalanobis distance for 3D points.
const p1 = [1, 2, 3];
const p2 = [4, 5, 6];
const invCovMatrix3D = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const distance3D = getMahalanobisDistance(p1, p2, invCovMatrix3D);
console.log(`Mahalanobis Distance (3D): ${distance3D}`);
```

```ts
// Demonstrate how `getMahalanobisDistance` would typically be used with `getCovarianceMatrix`.
import { getCovarianceMatrix, getMahalanobisDistance } from "journalism";

const dataPoints = [
  [1, 10],
  [2, 12],
  [3, 11],
  [4, 15],
  [5, 13],
];
const point1 = [2, 12];
const point2 = [4, 15];

const covMatrix = getCovarianceMatrix(dataPoints, { invert: true });
const mahalanobisDist = getMahalanobisDistance(point1, point2, covMatrix);
console.log(
  `Mahalanobis Distance between point1 and point2: ${mahalanobisDist}`,
);
```

## getSampleSizeMean

Calculates the required sample size for estimating a population mean with a
specified confidence level and margin of error.

The function uses the finite population correction formula. It calculates the
sample standard deviation from the provided data to estimate the population
standard deviation, which is then used in the sample size calculation.

**When to use this function:**

- Use when you want to estimate the average (mean) value of a numeric variable
  in a population
- When your outcome is continuous/numeric data (income, age, test scores,
  measurements, etc.)
- When you need to answer questions like "What's the average household income?"
  or "What's the mean temperature?"
- When you have existing data to calculate the standard deviation from

**Use `getSampleSizeProportion` instead when:**

- You want to estimate what percentage/proportion of a population has a certain
  characteristic
- Your outcome is categorical (yes/no, present/absent, pass/fail, etc.)
- You need to answer questions like "What percentage of people support this
  policy?" or "What proportion of records are accurate?"

### Signature

```typescript
function getSampleSizeMean<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T,
  confidenceLevel: 90 | 95 | 99,
  marginOfError: number,
  options?: { populationSize?: number },
): number;
```

### Parameters

- **`data`**: - An array of objects used to calculate the sample standard
  deviation. Each object must contain the specified key with numeric values.
- **`key`**: - The key in each data object that contains the numeric values to
  analyze for calculating the sample size.
- **`confidenceLevel`**: - The desired confidence level for the sample. Must be
  90, 95, or 99. The higher the confidence level, the larger the returned sample
  size.
- **`marginOfError`**: - The acceptable margin of error in the same units as the
  data values. The smaller the margin of error, the larger the returned sample
  size.
- **`options`**: - Optional configuration object.
- **`options.populationSize`**: - The total size of the population. If not
  provided, the function assumes the provided data represents the entire
  population and uses data.length as the population size.

### Returns

The minimum required sample size, rounded up to the nearest whole number.

### Examples

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
console.log(
  `You need to analyze ${sampleSize} income records to estimate the average income within $2,000 with 95% confidence`,
);
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
  { populationSize: 10000 }, // Total student population is 10,000
);
console.log(
  `For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores from the 10,000 students.`,
);
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
console.log(
  `For 99% confidence with a 5-point margin of error, sample ${requiredSample} test scores.`,
);
```

## getSampleSizeProportion

Calculates the required sample size for estimating a population proportion with
a specified confidence level and margin of error.

The function uses the finite population correction formula when the population
size is known, which provides more accurate sample size calculations for smaller
populations. It assumes a worst-case scenario proportion of 0.5 (50%) to ensure
the calculated sample size is sufficient regardless of the actual population
proportion.

**When to use this function:**

- Use when you want to estimate what percentage/proportion of a population has a
  certain characteristic
- When your outcome is categorical (yes/no, pass/fail, present/absent)
- When you need to answer questions like "What percentage of voters support this
  candidate?" or "What proportion of records contain errors?"
- When you don't know the actual proportion in advance (this function uses the
  conservative 50% assumption)

**Use `getSampleSizeMean` instead when:**

- You want to estimate an average value (mean) rather than a proportion
- Your data is continuous/numeric (income, temperature, test scores, etc.)
- You need to answer questions like "What's the average salary?" or "What's the
  mean test score?"

### Signature

```typescript
function getSampleSizeProportion(
  populationSize: number,
  confidenceLevel: 90 | 95 | 99,
  marginOfError: number,
): number;
```

### Parameters

- **`populationSize`**: - The size of the population from which the sample will
  be drawn. Used in the finite population correction formula for more accurate
  sample size calculations.
- **`confidenceLevel`**: - The desired confidence level for the sample. Must be
  90, 95, or 99. The higher the confidence level, the larger the returned sample
  size.
- **`marginOfError`**: - The acceptable margin of error as a percentage (1-100).
  The smaller the margin of error, the larger the returned sample size.

### Returns

The minimum required sample size, rounded up to the nearest whole number.

### Examples

```ts
// A journalist has a dataset of 1,000 records and wants to know how many
// data points to manually double-check to ensure their analysis is accurate
const recordsToVerify = getSampleSizeProportion(1000, 95, 5);
console.log(
  `You need to manually verify ${recordsToVerify} records to be 95% confident in your analysis with a 5% margin of error`,
); // 278
```

```ts
// Example for survey planning
const requiredSample = getSampleSizeProportion(50000, 95, 4);
console.log(
  `For a city survey with 95% confidence and 4% margin of error, you need ${requiredSample} respondents.`,
); // 594
```

## getSeason

Determines the current season based on a given date, hemisphere, and season
type. This function provides flexibility by allowing you to specify the exact
date, the hemisphere (Northern or Southern), and the method of season
calculation (astronomical or meteorological). By default, it uses the current
date, the Northern Hemisphere, and astronomical seasons.

Astronomical seasons are based on the Earth's position in its orbit around the
sun, marked by equinoxes and solstices. Meteorological seasons are based on the
annual temperature cycle and are typically defined by calendar months, making
them consistent for statistical purposes.

### Signature

```typescript
function getSeason(
  options?: {
    date?: Date;
    hemisphere?: "northern" | "southern";
    type?: "meteorological" | "astronomical";
  },
): "winter" | "spring" | "summer" | "fall";
```

### Parameters

- **`options`**: - An object containing options for determining the season.
- **`options.date`**: - Optional. The date for which to determine the season.
  Defaults to the current date if not provided.
- **`options.hemisphere`**: - Optional. The hemisphere for which to determine
  the season. Can be 'northern' or 'southern'. Defaults to 'northern'.
- **`options.type`**: - Optional. The type of season calculation to use. Can be
  'meteorological' or 'astronomical'. Defaults to 'astronomical'.

### Returns

The name of the season ('winter', 'spring', 'summer', or 'fall').

### Examples

```ts
// Get the current season in the northern hemisphere using astronomical seasons.
const season = getSeason();
console.log(season); // e.g., "summer" (if current date is July 7, 2025)
```

```ts
// Get the season for a specific date in the southern hemisphere using meteorological seasons.
const specificDate = new Date("2023-06-15");
const seasonSouthernMeteorological = getSeason({
  date: specificDate,
  hemisphere: "southern",
  type: "meteorological",
});
console.log(seasonSouthernMeteorological); // Output: "winter"
```

```ts
// Compare astronomical and meteorological seasons for a specific date in the Northern Hemisphere.
const march21 = new Date("2024-03-21");
const astronomicalSeason = getSeason({ date: march21, type: "astronomical" });
console.log(`Astronomical season on March 21: ${astronomicalSeason}`); // Output: "spring"

const meteorologicalSeason = getSeason({
  date: march21,
  type: "meteorological",
});
console.log(`Meteorological season on March 21: ${meteorologicalSeason}`); // Output: "spring"

const december1 = new Date("2024-12-01");
const astronomicalSeasonDec = getSeason({
  date: december1,
  type: "astronomical",
});
console.log(`Astronomical season on December 1: ${astronomicalSeasonDec}`); // Output: "fall"

const meteorologicalSeasonDec = getSeason({
  date: december1,
  type: "meteorological",
});
console.log(`Meteorological season on December 1: ${meteorologicalSeasonDec}`); // Output: "winter"
```

## getSheetData

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables
(`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the
service account email). Alternatively, you can use
`GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For
detailed instructions on setting up credentials, refer to the
`node-google-spreadsheet` authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Signature

```typescript
function getSheetData(
  sheetUrl: string,
  options: { csv: true; skip?: number; apiEmail?: string; apiKey?: string },
): Promise<string>;
```

### Parameters

- **`sheetUrl`**: - The URL of the Google Sheet from which to retrieve data.
  This URL should point to a specific sheet (e.g., ending with `#gid=0`).
- **`options`**: - An optional object with configuration options:
- **`options.skip`**: - The number of rows to skip from the beginning of the
  sheet before parsing the data. This is useful for sheets that have metadata at
  the top. Defaults to `0`.
- **`options.csv`**: - If `true`, the function will return the raw data as a CSV
  string. If `false` or omitted, it will return an array of objects, where each
  object represents a row and keys correspond to column headers. Defaults to
  `false`.
- **`options.apiEmail`**: - Optional. Your Google Service Account email. If
  provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment
  variable.
- **`options.apiKey`**: - Optional. Your Google Service Account private key. If
  provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.

### Returns

A Promise that resolves to either an array of objects
(`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string
(`string`) if `options.csv` is `true`.

### Examples

```ts
// Fake URL used as an example.
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Returning the data as an array of objects.
const data = await getSheetData(sheetUrl);
console.log(data);
// Expected output (example):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Retrieve data, skipping the first row (e.g., if it contains metadata).
const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
console.log(dataSkippingFirstRow);
// Expected output (example, assuming first row was metadata):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Return the data as a raw CSV string, useful for direct writing to files or other systems.
const csvString = await getSheetData(sheetUrl, { csv: true });
console.log(csvString);
// Expected output (example):
// "Header1,Header2\nValue1,Value2\nValue3,Value4"
```

```ts
// Use custom environment variable names for API email and key.
const dataWithCustomCredentials = await getSheetData(sheetUrl, {
  apiEmail: "GG_EMAIL",
  apiKey: "GG_KEY",
});
console.log(dataWithCustomCredentials);
```

## getSheetData

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables
(`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the
service account email). Alternatively, you can use
`GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For
detailed instructions on setting up credentials, refer to the
`node-google-spreadsheet` authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Signature

```typescript
function getSheetData(
  sheetUrl: string,
  options?: { csv?: false; skip?: number; apiEmail?: string; apiKey?: string },
): Promise<Record<string, string>[]>;
```

### Parameters

- **`sheetUrl`**: - The URL of the Google Sheet from which to retrieve data.
  This URL should point to a specific sheet (e.g., ending with `#gid=0`).
- **`options`**: - An optional object with configuration options:
- **`options.skip`**: - The number of rows to skip from the beginning of the
  sheet before parsing the data. This is useful for sheets that have metadata at
  the top. Defaults to `0`.
- **`options.csv`**: - If `true`, the function will return the raw data as a CSV
  string. If `false` or omitted, it will return an array of objects, where each
  object represents a row and keys correspond to column headers. Defaults to
  `false`.
- **`options.apiEmail`**: - Optional. Your Google Service Account email. If
  provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment
  variable.
- **`options.apiKey`**: - Optional. Your Google Service Account private key. If
  provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.

### Returns

A Promise that resolves to either an array of objects
(`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string
(`string`) if `options.csv` is `true`.

### Examples

```ts
// Fake URL used as an example.
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Returning the data as an array of objects.
const data = await getSheetData(sheetUrl);
console.log(data);
// Expected output (example):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Retrieve data, skipping the first row (e.g., if it contains metadata).
const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
console.log(dataSkippingFirstRow);
// Expected output (example, assuming first row was metadata):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Return the data as a raw CSV string, useful for direct writing to files or other systems.
const csvString = await getSheetData(sheetUrl, { csv: true });
console.log(csvString);
// Expected output (example):
// "Header1,Header2\nValue1,Value2\nValue3,Value4"
```

```ts
// Use custom environment variable names for API email and key.
const dataWithCustomCredentials = await getSheetData(sheetUrl, {
  apiEmail: "GG_EMAIL",
  apiKey: "GG_KEY",
});
console.log(dataWithCustomCredentials);
```

## getSheetData

Retrieves data from a Google Sheet.

By default, this function attempts to authenticate using environment variables
(`GOOGLE_PRIVATE_KEY` for the API key and `GOOGLE_SERVICE_ACCOUNT_EMAIL` for the
service account email). Alternatively, you can use
`GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file. For
detailed instructions on setting up credentials, refer to the
`node-google-spreadsheet` authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Signature

```typescript
async function getSheetData(
  sheetUrl: string,
  options?: {
    csv?: boolean;
    skip?: number;
    apiEmail?: string;
    apiKey?: string;
  },
): Promise<Record<string, string>[] | string>;
```

### Parameters

- **`sheetUrl`**: - The URL of the Google Sheet from which to retrieve data.
  This URL should point to a specific sheet (e.g., ending with `#gid=0`).
- **`options`**: - An optional object with configuration options:
- **`options.skip`**: - The number of rows to skip from the beginning of the
  sheet before parsing the data. This is useful for sheets that have metadata at
  the top. Defaults to `0`.
- **`options.csv`**: - If `true`, the function will return the raw data as a CSV
  string. If `false` or omitted, it will return an array of objects, where each
  object represents a row and keys correspond to column headers. Defaults to
  `false`.
- **`options.apiEmail`**: - Optional. Your Google Service Account email. If
  provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment
  variable.
- **`options.apiKey`**: - Optional. Your Google Service Account private key. If
  provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.

### Returns

A Promise that resolves to either an array of objects
(`Record<string, string>[]`) if `options.csv` is `false`, or a CSV string
(`string`) if `options.csv` is `true`.

### Examples

```ts
// Fake URL used as an example.
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Returning the data as an array of objects.
const data = await getSheetData(sheetUrl);
console.log(data);
// Expected output (example):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Retrieve data, skipping the first row (e.g., if it contains metadata).
const dataSkippingFirstRow = await getSheetData(sheetUrl, { skip: 1 });
console.log(dataSkippingFirstRow);
// Expected output (example, assuming first row was metadata):
// [
//   { Header1: 'Value1', Header2: 'Value2' },
//   { Header1: 'Value3', Header2: 'Value4' }
// ]
```

```ts
// Return the data as a raw CSV string, useful for direct writing to files or other systems.
const csvString = await getSheetData(sheetUrl, { csv: true });
console.log(csvString);
// Expected output (example):
// "Header1,Header2\nValue1,Value2\nValue3,Value4"
```

```ts
// Use custom environment variable names for API email and key.
const dataWithCustomCredentials = await getSheetData(sheetUrl, {
  apiEmail: "GG_EMAIL",
  apiKey: "GG_KEY",
});
console.log(dataWithCustomCredentials);
```

## getStatCanTable

Retrieves tabular data from Statistics Canada's website using a provided Product
ID (PID). This function automates the process of fetching, unzipping, and
parsing the CSV data directly from StatCan's API, making it easy to integrate
official Canadian statistics into applications or analyses.

The PID is a unique identifier for each table on the Statistics Canada website.
It can typically be found in the URL of the table's page (e.g.,
`https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=98100001` where
`98100001` is the PID).

### Signature

```typescript
async function getStatCanTable(
  pid: string,
  options?: { lang?: "en" | "fr"; returnRawCSV?: boolean; debug?: boolean },
): Promise<string | DSVRowArray<string>>;
```

### Parameters

- **`pid`**: - The Product ID (PID) of the Statistics Canada table. This is a
  string of up to 8 digits. If a longer string is provided, it will be truncated
  to the first 8 characters.
- **`options`**: - Optional settings to customize the data retrieval.
- **`options.lang`**: - The language of the table data. Can be 'en' for English
  or 'fr' for French. Defaults to 'en'.
- **`options.returnRawCSV`**: - A boolean indicating whether to return the raw
  CSV data as a string instead of a parsed array of objects. Useful for direct
  file storage or custom parsing. Defaults to `false`.
- **`options.debug`**: - A boolean indicating whether to enable debug logging to
  the console, showing fetch URLs and other process details. Defaults to
  `false`.

### Returns

A Promise that resolves to either a `string` (if `returnRawCSV` is `true`) or an
array of objects representing the table rows.

### Examples

```ts
// Retrieve data for a specific Statistics Canada table (e.g., PID '98100001').
const data = await getStatCanTable("98100001");
console.table(data);
```

```ts
// Retrieve data in French and return as raw CSV.
const rawCsvData = await getStatCanTable("98100001", {
  lang: "fr",
  returnRawCSV: true,
});
console.log(rawCsvData);
```

```ts
// The function automatically truncates PIDs longer than 8 characters.
const truncatedPidData = await getStatCanTable("9810000112345", {
  debug: true,
});
console.table(truncatedPidData); // Console will show a warning about truncation.
```

## getYahooFinanceData

Fetches historical financial data for a given stock symbol from Yahoo Finance.
This function provides a convenient way to access various financial metrics
(e.g., open, high, low, close, adjusted close, volume) at specified intervals
(daily, hourly, or minute-by-minute).

**Important Note on Data Usage:** The use of a small amount of data from Yahoo
Finance is generally tolerated for educational or public interest purposes.
However, if you intend to collect and reuse a large volume of this data,
especially for commercial purposes, it is crucial to contact the Yahoo Finance
team or consider purchasing a premium subscription to ensure compliance with
their terms of service.

### Signature

```typescript
async function getYahooFinanceData(
  symbol: string,
  startDate: Date,
  endDate: Date,
  variable: "open" | "high" | "low" | "close" | "adjclose" | "volume",
  interval: "1d" | "1h" | "1m",
): Promise<{ timestamp: number; value: number }[]>;
```

### Parameters

- **`symbol`**: - The stock symbol (ticker) for which to fetch data (e.g.,
  'AAPL' for Apple Inc., '^GSPTSE' for S&P/TSX Composite Index).
- **`startDate`**: - The start date for the data range (inclusive). Data will be
  fetched from this date onwards.
- **`endDate`**: - The end date for the data range (inclusive). Data will be
  fetched up to this date.
- **`variable`**: - The specific financial variable to retrieve. Can be one
  of: - `"open"`: The opening price for the period. - `"high"`: The highest
  price for the period. - `"low"`: The lowest price for the period. - `"close"`:
  The closing price for the period. - `"adjclose"`: The adjusted closing price,
  accounting for dividends and stock splits. - `"volume"`: The trading volume
  for the period.
- **`interval`**: - The time interval for the data points. Can be one of: -
  `"1d"`: Daily data. - `"1h"`: Hourly data. - `"1m"`: Minute-by-minute data.

### Returns

A promise that resolves to an array of objects, where each object contains a
`timestamp` (Unix timestamp in milliseconds) and the `value` of the requested
financial variable for that period.

### Examples

```ts
// Fetch the adjusted close price for the S&P/TSX Composite Index for a specific period.
const spTsxData = await getYahooFinanceData(
  "^GSPTSE",
  new Date("2025-03-01"),
  new Date("2025-03-15"),
  "adjclose",
  "1d",
);
console.log("S&P/TSX Composite Index Data:", spTsxData);
```

```ts
// Get hourly trading volume for Apple (AAPL) for a single day.
const appleVolumeData = await getYahooFinanceData(
  "AAPL",
  new Date("2024-07-01T09:30:00"),
  new Date("2024-07-01T16:00:00"),
  "volume",
  "1h",
);
console.log("Apple Hourly Volume Data:", appleVolumeData);
```

## inBucket

Checks if a specified file exists within a Google Cloud Storage (GCS) bucket.
This function provides a straightforward way to verify the presence of a file in
your GCS infrastructure, which is useful for conditional operations, data
validation, or status checks.

Authentication and bucket identification can be configured either through
environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and
`BUCKET_NAME` for the bucket name) or by passing them directly as options to the
function. Options provided directly will take precedence over environment
variables.

### Signature

```typescript
async function inBucket(
  destination: string,
  options?: { project?: string; bucket?: string },
): Promise<boolean>;
```

### Parameters

- **`destination`**: - The full path to the file within the bucket (e.g.,
  'my-folder/my-file.txt').
- **`options`**: - Optional settings for configuring the GCS client.
- **`options.project`**: - Your Google Cloud Project ID. If not provided, it
  defaults to the `BUCKET_PROJECT` environment variable.
- **`options.bucket`**: - The name of the Google Cloud Storage bucket. If not
  provided, it defaults to the `BUCKET_NAME` environment variable.

### Returns

A Promise that resolves to `true` if the file exists in the bucket, and `false`
otherwise.

### Examples

```ts
// Check if a file exists in the default Google Cloud Storage bucket (configured via environment variables).
const exists = await inBucket("remote/file.txt");
if (exists) {
  console.log("File exists in the bucket.");
} else {
  console.log("File does not exist in the bucket.");
}
```

```ts
// Check for a file's existence in a specified project and bucket, overriding environment variables.
const existsInSpecificBucket = await inBucket("remote/file.txt", {
  project: "my-gcp-project",
  bucket: "my-bucket-name",
});
if (existsInSpecificBucket) {
  console.log("File exists in the specified bucket.");
} else {
  console.log("File does not exist in the specified bucket.");
}
```

## invertMatrix

Computes the inverse of a square matrix.

The function takes a square matrix as input and returns its inverse. It handles
both 2x2 and larger square matrices. If the matrix is singular (i.e., its
determinant is zero), it cannot be inverted, and the function will throw an
error.

### Signature

```typescript
function invertMatrix(matrix: number[][]): number[][];
```

### Parameters

- **`matrix`**: - The square matrix to be inverted. It must be a 2D array where
  the number of rows equals the number of columns.

### Returns

A new 2D array representing the inverse of the input matrix.

### Throws

- **`Error`**: If the input matrix is not square (e.g.,
  `matrix.length !== matrix[0].length`), or if it is singular (non-invertible),
  an error will be thrown.

### Examples

```ts
// Invert a simple 2x2 matrix.
const matrix2x2 = [
  [4, 7],
  [2, 6],
];
const inverted2x2 = invertMatrix(matrix2x2);
console.log(inverted2x2);
```

```ts
// Invert a 3x3 matrix.
const matrix3x3 = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0],
];
const inverted3x3 = invertMatrix(matrix3x3);
console.log(inverted3x3);
```

```ts
// Attempting to invert a singular matrix will throw an error.
const singularMatrix = [
  [1, 2],
  [2, 4],
];
try {
  invertMatrix(singularMatrix);
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: Matrix is singular and cannot be inverted"
}
```

## logBarChart

Generates and logs a text-based bar chart to the console. This function is
useful for quickly visualizing data distributions or comparisons directly within
a terminal or log output, without needing a graphical interface. It's
particularly effective for presenting categorical data or showing the relative
magnitudes of different items.

The chart is constructed using ASCII characters, making it universally
compatible across various terminal environments. It can display data for various
categories and their corresponding numerical values, with extensive options for
custom formatting of labels and values, controlling the chart's width, and
adding a descriptive title or a total label. For optimal visualization, it's
recommended that the input `data` be sorted by the `values` key in descending
order, though the function does not enforce this.

### Signature

```typescript
function logBarChart<T extends Record<string, unknown>>(
  data: T[],
  labels: keyof T,
  values: keyof T,
  options?: {
    formatLabels?: (d: T[labels]) => string;
    formatValues?: (d: T[values]) => string;
    width?: number;
    title?: string;
    totalLabel?: string;
    compact?: boolean;
  },
): void;
```

### Parameters

- **`data`**: - An array of objects, where each object represents a bar in the
  chart. Each object should contain keys corresponding to the `labels` and
  `values` parameters.
- **`labels`**: - The key in the data objects whose values will be used as
  textual labels for each bar (e.g., 'category', 'name', 'country').
- **`values`**: - The key in the data objects whose numerical values will
  determine the length of each bar and be displayed alongside the labels (e.g.,
  'sales', 'count', 'percentage').
- **`options`**: - Optional configuration for customizing the appearance and
  behavior of the chart.
- **`options.formatLabels`**: - A function to format the labels displayed on the
  chart. It receives the raw label value as input and should return a string.
  Defaults to converting the label to a string.
- **`options.formatValues`**: - A function to format the numerical values
  displayed next to the bars. It receives the raw numerical value as input and
  should return a string. Defaults to formatting the number using `formatNumber`
  (which adds commas for thousands, etc.).
- **`options.width`**: - The maximum width of the bars in characters. The bars
  will scale proportionally to this width. A larger width allows for more
  detailed visualization. Defaults to `40`.
- **`options.title`**: - An optional title to display above the chart. If not
  provided, a default title based on `labels` and `values` keys will be
  generated.
- **`options.totalLabel`**: - An optional label to display for the total sum of
  all values at the bottom of the chart. If provided, the sum of all `values`
  will be calculated and displayed next to this label.
- **`options.compact`**: - If `true`, the chart will be rendered in a more
  compact format, reducing vertical spacing between bars. Defaults to `false`.

### Examples

```ts
// Visualize sales data for different regions.
const salesData = [
  { region: "North", sales: 1200 },
  { region: "South", sales: 800 },
  { region: "East", sales: 1500 },
  { region: "West", sales: 950 },
];
logBarChart(salesData, "region", "sales", { title: "Regional Sales Overview" });
```

```ts
// Display product popularity with custom value formatting and a compact layout.
const productPopularity = [
  { product: "Laptop", views: 5000 },
  { product: "Mouse", views: 1500 },
  { product: "Keyboard", views: 2500 },
];
logBarChart(productPopularity, "product", "views", {
  formatValues: (v) => `${v / 1000}K`,
  width: 30,
  compact: true,
  totalLabel: "Total Views",
});
```

## logDotChart

Generates and logs a text-based dot chart to the console. This function is ideal
for visualizing the relationship between two numerical variables. It provides a
quick, terminal-friendly way to inspect data trends and distributions.

The chart is rendered using ASCII characters, ensuring compatibility across
various terminal environments. It supports custom formatting for both x and
y-axis values, and can generate small multiples to compare distributions across
different categories. While the function expects data to be sorted by the x-axis
values for proper rendering, it does not enforce this.

**Data Type Requirements:**

- **X-axis values**: Must be `number` or `Date` objects.
- **Y-axis values**: Must be `number` values.
- All values must be non-null and defined.

### Signature

```typescript
function logDotChart<T extends Record<string, unknown>>(
  data: T[],
  x: keyof T,
  y: keyof T,
  options?: {
    formatX?: (d: T[x]) => string;
    formatY?: (d: T[y]) => string;
    smallMultiples?: keyof T;
    fixedScales?: boolean;
    smallMultiplesPerRow?: number;
    width?: number;
    height?: number;
    title?: string;
  },
): void;
```

### Parameters

- **`data`**: - An array of objects representing the data to be visualized. Each
  object should contain keys corresponding to the `x` and `y` parameters.
- **`x`**: - The key in the data objects whose values will be plotted on the
  x-axis. Values must be numbers or Date objects.
- **`y`**: - The key in the data objects whose values will be plotted on the
  y-axis. Values must be numbers.
- **`options`**: - An optional object to customize the chart's appearance and
  behavior.
- **`options.formatX`**: - A function to format the x-axis values for display.
  It receives the raw x-value as input and should return a string. If the first
  data point's x value is a Date, it defaults to formatting the date as
  "YYYY-MM-DD".
- **`options.formatY`**: - A function to format the y-axis values for display.
  It receives the raw y-value as input and should return a string.
- **`options.smallMultiples`**: - A key in the data objects to create small
  multiples (separate charts) for each unique value of this key. This is useful
  for comparing trends across different categories.
- **`options.fixedScales`**: - If `true` and `smallMultiples` is used, all small
  multiple charts will share the same x and y scales, allowing for direct
  comparison of magnitudes. If `false`, each small multiple will have its own
  independent scales. Defaults to `false`.
- **`options.smallMultiplesPerRow`**: - The number of small multiples to display
  per row when `smallMultiples` is used. Defaults to `3`.
- **`options.width`**: - The width of the chart in characters. This affects the
  horizontal resolution of the chart. Defaults to `60`.
- **`options.height`**: - The height of the chart in lines. This affects the
  vertical resolution of the chart. Defaults to `20`.
- **`options.title`**: - The title of the chart. If not provided, a default
  title based on `x`, `y`, and `smallMultiples` (if applicable) will be
  generated.

### Examples

```ts
// Visualize a time series of values.
const timeSeriesData = [
  { date: new Date("2023-01-01"), value: 10 },
  { date: new Date("2023-02-01"), value: 20 },
  { date: new Date("2023-03-01"), value: 30 },
  { date: new Date("2023-04-01"), value: 40 },
];

logDotChart(timeSeriesData, "date", "value", {
  formatX: (d) => (d as Date).toISOString().slice(0, 10),
  formatY: (d) => "$" + (d as number).toString(),
  title: "Monthly Sales Trend",
});
```

```ts
// Compare trends across different categories using small multiples.
const multiCategoryData = [
  { date: new Date("2023-01-01"), value: 10, category: "A" },
  { date: new Date("2023-02-01"), value: 20, category: "A" },
  { date: new Date("2023-03-01"), value: 30, category: "A" },
  { date: new Date("2023-04-01"), value: 40, category: "A" },
  { date: new Date("2023-01-01"), value: 15, category: "B" },
  { date: new Date("2023-02-01"), value: 25, category: "B" },
  { date: new Date("2023-03-01"), value: 35, category: "B" },
  { date: new Date("2023-04-01"), value: 45, category: "B" },
];

logDotChart(multiCategoryData, "date", "value", {
  formatX: (d) => (d as Date).toISOString().slice(0, 10),
  formatY: (d) => "$" + (d as number).toString(),
  smallMultiples: "category",
  smallMultiplesPerRow: 2,
  fixedScales: true,
  title: "Sales Trend by Category",
});
```

## logLineChart

Generates and logs a text-based line chart to the console. This function is
particularly useful for visualizing trends over time providing a quick and
accessible way to understand data progression directly within a terminal or log
output.

The chart is rendered using ASCII characters, ensuring broad compatibility. It
supports custom formatting for both x and y-axis values, and can generate small
multiples to compare trends across different categories. When the chart's width
is smaller than the number of data points, the line represents an averaged
approximation of the data, providing a smoothed view of the trend. For optimal
visualization, it's recommended that the input `data` be sorted by the x-axis
values.

**Data Type Requirements:**

- **X-axis values**: Must be `number` or `Date` objects.
- **Y-axis values**: Must be `number` values.
- All values must be non-null and defined.

### Signature

```typescript
function logLineChart<T extends Record<string, unknown>>(
  data: T[],
  x: keyof T,
  y: keyof T,
  options?: {
    formatX?: (d: T[x]) => string;
    formatY?: (d: T[y]) => string;
    smallMultiples?: keyof T;
    fixedScales?: boolean;
    smallMultiplesPerRow?: number;
    width?: number;
    height?: number;
    title?: string;
  },
): void;
```

### Parameters

- **`data`**: - An array of objects representing the data to be visualized. Each
  object should contain keys corresponding to the `x` and `y` parameters.
- **`x`**: - The key in the data objects whose values will be plotted on the
  x-axis. Values must be numbers or Date objects.
- **`y`**: - The key in the data objects whose values will be plotted on the
  y-axis. Values must be numbers.
- **`options`**: - An optional object to customize the chart's appearance and
  behavior.
- **`options.formatX`**: - A function to format the x-axis values for display.
  It receives the raw x-value as input and should return a string. If the first
  data point's x value is a Date, it defaults to formatting the date as
  "YYYY-MM-DD".
- **`options.formatY`**: - A function to format the y-axis values for display.
  It receives the raw y-value as input and should return a string.
- **`options.smallMultiples`**: - A key in the data objects to create small
  multiples (separate charts) for each unique value of this key. This is useful
  for comparing trends across different categories.
- **`options.fixedScales`**: - If `true` and `smallMultiples` is used, all small
  multiple charts will share the same x and y scales, allowing for direct
  comparison of magnitudes. If `false`, each small multiple will have its own
  independent scales. Defaults to `false`.
- **`options.smallMultiplesPerRow`**: - The number of small multiples to display
  per row when `smallMultiples` is used. Defaults to `3`.
- **`options.width`**: - The width of the chart in characters. This affects the
  horizontal resolution of the chart. Defaults to `60`.
- **`options.height`**: - The height of the chart in lines. This affects the
  vertical resolution of the chart. Defaults to `20`.
- **`options.title`**: - The title of the chart. If not provided, a default
  title based on `x`, `y`, and `smallMultiples` (if applicable) will be
  generated.

### Examples

```ts
// Visualize a simple time series of values.
const timeSeriesData = [
  { date: new Date("2023-01-01"), value: 10 },
  { date: new Date("2023-02-01"), value: 20 },
  { date: new Date("2023-03-01"), value: 30 },
  { date: new Date("2023-04-01"), value: 40 },
];

logLineChart(timeSeriesData, "date", "value", {
  formatX: (d) => (d as Date).toISOString().slice(0, 10),
  title: "Monthly Data Trend",
});
```

```ts
// Compare trends across different categories using small multiples.
const multiCategoryData = [
  { date: new Date("2023-01-01"), value: 10, category: "A" },
  { date: new Date("2023-02-01"), value: 20, category: "A" },
  { date: new Date("2023-03-01"), value: 30, category: "A" },
  { date: new Date("2023-04-01"), value: 40, category: "A" },
  { date: new Date("2023-01-01"), value: 15, category: "B" },
  { date: new Date("2023-02-01"), value: 25, category: "B" },
  { date: new Date("2023-03-01"), value: 35, category: "B" },
  { date: new Date("2023-04-01"), value: 45, category: "B" },
];

logLineChart(multiCategoryData, "date", "value", {
  formatX: (d) => (d as Date).toLocaleDateString(),
  formatY: (d) => "$" + (d as number).toString(),
  smallMultiples: "category",
  smallMultiplesPerRow: 2,
  fixedScales: true,
  title: "Sales Trend by Category",
});
```

## mortgageInsurancePremium

Calculates the mortgage insurance premium based on the property's purchase price
and the down payment amount. This function is designed to reflect the premium
rates typically applied in Canada, as outlined by institutions like the
Financial Consumer Agency of Canada. The calculated premium is rounded to the
nearest integer.

Mortgage insurance is generally required in Canada when the down payment is less
than 20% of the home's purchase price.

### Signature

```typescript
function mortgageInsurancePremium(
  purchasePrice: number,
  downPayment: number,
): number;
```

### Parameters

- **`purchasePrice`**: - The total price of the property being purchased.
- **`downPayment`**: - The amount of money paid upfront by the buyer towards the
  purchase price.

### Returns

The calculated mortgage insurance premium, rounded to the nearest integer.
Returns `0` if the down payment is 20% or more, as insurance is typically not
required in such cases.

### Throws

- **`Error`**: If the down payment is less than 5% of the purchase price, as
  this is generally the minimum required down payment for insured mortgages in
  Canada.

### Examples

```ts
// Calculate the insurance premium for a property with a $500,000 purchase price and a $25,000 down payment.
// (5% down payment, so 4% premium on the mortgage amount)
const insurancePremium = mortgageInsurancePremium(500_000, 25_000);
console.log(insurancePremium); // Expected output: 19000 (4% of $475,000)
```

```ts
// Scenario 1: 10% down payment ($50,000 on $500,000 property) - 3.1% premium
const premium10Percent = mortgageInsurancePremium(500_000, 50_000);
console.log(`Premium for 10% down: ${premium10Percent}`); // Expected: 13950 (3.1% of $450,000)

// Scenario 2: 15% down payment ($75,000 on $500,000 property) - 2.8% premium
const premium15Percent = mortgageInsurancePremium(500_000, 75_000);
console.log(`Premium for 15% down: ${premium15Percent}`); // Expected: 11900 (2.8% of $425,000)

// Scenario 3: 20% or more down payment ($100,000 on $500,000 property) - No premium
const premium20Percent = mortgageInsurancePremium(500_000, 100_000);
console.log(`Premium for 20% down: ${premium20Percent}`); // Expected: 0
```

```ts
// Attempting to calculate with a down payment less than 5% will throw an error.
try {
  mortgageInsurancePremium(500_000, 20_000); // 4% down payment
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: The down payment must be more than 5% of the purchase price..."
}
```

## mortgageMaxAmount

Calculates the maximum affordable property purchase price and the corresponding
mortgage amount a borrower can qualify for, based on their annual income, down
payment, and current mortgage interest rates. This function is designed to
simulate mortgage qualification criteria, taking into account various financial
factors and debt service ratios.

The calculation incorporates a stress test, where the interest rate used for
qualification is the higher of the provided rate + 2% or 5.25% (a common
benchmark in Canada). It also considers monthly debt payments, heating costs,
property taxes, and condo fees to determine the Gross Debt Service (GDS) and
Total Debt Service (TDS) ratios, which are critical in mortgage approvals.

### Signature

```typescript
function mortgageMaxAmount(
  annualIncome: number,
  downPayment: number,
  rate: number,
  options?: {
    monthlyDebtPayment?: number;
    monthlyHeating?: number;
    monthlyTax?: number;
    monthlyCondoFees?: number;
  },
): {
  annualIncome: number;
  downPayment: number;
  rate: number;
  rateTested: number;
  purchasePrice: number;
  mortgageAmount: number;
  insurancePremium: number;
  monthlyMortgagePayment: number;
  grossDebtServiceRatio: number;
  totalDebtServiceRatio: number;
  reason: string;
  monthlyDebtPayment: number;
  monthlyHeating: number;
  isHeatingEstimate: boolean;
  monthlyTax: number;
  isTaxEstimate: boolean;
  monthlyCondoFees: number;
};
```

### Parameters

- **`annualIncome`**: - The borrower's gross annual income.
- **`downPayment`**: - The amount of money the borrower is putting down as a
  down payment.
- **`rate`**: - The current mortgage interest rate (e.g., 5.25 for 5.25%).
- **`options`**: - Additional options to fine-tune the calculation:
- **`options.monthlyDebtPayment`**: - The borrower's total monthly payments for
  other debts (e.g., car loans, credit cards). Defaults to `0`.
- **`options.monthlyHeating`**: - The estimated monthly heating costs for the
  property. Defaults to `175` (a common estimate, e.g., by Royal Bank of
  Canada).
- **`options.monthlyTax`**: - The estimated monthly property tax. Defaults to
  `1.5%` of the purchase price annually, divided by 12 (a common estimate, e.g.,
  by Royal Bank of Canada).
- **`options.monthlyCondoFees`**: - The estimated monthly condo fees, if
  applicable. Defaults to `0`.

### Returns

An object containing detailed results of the mortgage affordability calculation,
including:

- `annualIncome`: The annual income provided.
- `downPayment`: The down payment provided.
- `rate`: The mortgage interest rate provided.
- `rateTested`: The interest rate used for the stress test (higher of
  `rate + 2%` or `5.25%`).
- `purchasePrice`: The maximum affordable property purchase price.
- `mortgageAmount`: The maximum mortgage amount the borrower qualifies for.
- `insurancePremium`: The calculated mortgage insurance premium (if applicable).
- `monthlyMortgagePayment`: The estimated monthly mortgage payment.
- `grossDebtServiceRatio`: The calculated Gross Debt Service (GDS) ratio.
- `totalDebtServiceRatio`: The calculated Total Debt Service (TDS) ratio.
- `reason`: The limiting factor for the maximum amount (e.g., "debt limit",
  "downPayment limit", "max purchase price").
- `monthlyDebtPayment`: The monthly debt payment used in the calculation.
- `monthlyHeating`: The monthly heating cost used in the calculation.
- `isHeatingEstimate`: `true` if `monthlyHeating` was an estimate, `false` if
  provided.
- `monthlyTax`: The monthly property tax used in the calculation.
- `isTaxEstimate`: `true` if `monthlyTax` was an estimate, `false` if provided.
- `monthlyCondoFees`: The monthly condo fees used in the calculation.

### Examples

```ts
// Calculate affordability for a borrower with $100,000 annual income, $25,000 down payment, and a 5.25% rate.
const results = mortgageMaxAmount(100_000, 25_000, 5.25);
console.log(results);
// Expected output:
// {
//   annualIncome: 100000,
//   downPayment: 25000,
//   rate: 5.25,
//   rateTested: 7.25,
//   purchasePrice: 307000,
//   mortgageAmount: 293280,
//   insurancePremium: 11280,
//   monthlyMortgagePayment: 2100,
//   grossDebtServiceRatio: 0.32,
//   totalDebtServiceRatio: 0.32,
//   reason: "debt limit",
//   monthlyDebtPayment: 0,
//   monthlyHeating: 175,
//   isHeatingEstimate: true,
//   monthlyTax: 385,
//   isTaxEstimate: true,
//   monthlyCondoFees: 0,
// }
```

```ts
// Calculate affordability with specific monthly debt payments and property taxes.
const customExpensesResults = mortgageMaxAmount(120_000, 40_000, 4.5, {
  monthlyDebtPayment: 300,
  monthlyTax: 450,
  monthlyCondoFees: 200,
});
console.log(customExpensesResults);
```

## mortgagePayments

Calculates and returns a detailed schedule of fixed-rate mortgage payments. This
function is designed to provide a comprehensive breakdown of each payment,
including the principal and interest portions, remaining balance, and cumulative
amounts paid. It adheres to Canadian mortgage regulations, which typically
require semi-annual compounding, but allows for customization of the compounding
frequency.

The function is flexible, supporting various payment frequencies (weekly,
bi-weekly, monthly, semi-monthly, accelerated weekly, accelerated bi-weekly) and
allowing for the specification of the mortgage amount, interest rate, term, and
amortization period. It also includes options for rounding payment values and
enabling debug logging.

### Signature

```typescript
function mortgagePayments(
  mortgageAmount: number,
  rate: number,
  paymentFrequency:
    | "weekly"
    | "biWeekly"
    | "monthly"
    | "semiMonthly"
    | "acceleratedWeekly"
    | "acceleratedBiWeekly",
  term: number,
  amortizationPeriod: number,
  options?: {
    id?: string;
    decimals?: number;
    annualCompounding?: number;
    debug?: boolean;
  },
): {
  id?: string | undefined;
  paymentId: number;
  payment: number;
  interest: number;
  capital: number;
  balance: number;
  amountPaid: number;
  interestPaid: number;
  capitalPaid: number;
}[];
```

### Parameters

- **`mortgageAmount`**: - The total amount of the mortgage loan.
- **`rate`**: - The annual interest rate of the mortgage (e.g., `6.00` for
  6.00%).
- **`paymentFrequency`**: - The frequency at which mortgage payments are made.
  Supported values are: `"weekly"`, `"biWeekly"`, `"monthly"`, `"semiMonthly"`,
  `"acceleratedWeekly"`, `"acceleratedBiWeekly"`.
- **`term`**: - The term of the mortgage in years. This is the length of the
  current mortgage contract.
- **`amortizationPeriod`**: - The total amortization period of the mortgage in
  years. This is the total time it will take to pay off the mortgage.
- **`options`**: - Additional options for customizing the mortgage calculation
  and output.
- **`options.id`**: - An optional string ID to be added to each payment object
  in the returned array. Useful for tracking payments related to a specific
  mortgage.
- **`options.decimals`**: - The number of decimal places to round the financial
  values (payment, interest, capital, balance) to. Defaults to `2`.
- **`options.annualCompounding`**: - The number of times the mortgage interest
  should be compounded per year. Defaults to `2` (semi-annual compounding, as is
  standard in Canada).
- **`options.debug`**: - If `true`, enables debug logging to the console,
  providing additional insights into the calculation process. Defaults to
  `false`.

### Returns

An array of objects, where each object represents a single mortgage payment and
contains:

- `paymentId`: A 0-based index for the payment.
- `payment`: The total amount of the payment.
- `interest`: The portion of the payment that goes towards interest.
- `capital`: The portion of the payment that goes towards the principal
  (capital).
- `balance`: The remaining mortgage balance after the payment.
- `amountPaid`: The cumulative total amount paid so far.
- `interestPaid`: The cumulative total interest paid so far.
- `capitalPaid`: The cumulative total capital reimbursed so far.
- `id` (optional): The ID provided in `options.id`.

### Throws

- **`Error`**: If the `amortizationPeriod` is less than the `term`, as this is
  an invalid mortgage configuration.

### Examples

```ts
// Return the monthly mortgage payments for a $250,000 loan with a 6.00% rate, 5-year term, and 25-year amortization.
const payments = mortgagePayments(250_000, 6, "monthly", 5, 25);
console.log(payments[0]); // First payment details
// Expected output (example):
// {
//   paymentId: 0,
//   payment: 1599.52,
//   interest: 1234.66,
//   capital: 364.86,
//   balance: 249635.14,
//   amountPaid: 1599.52,
//   interestPaid: 1234.66,
//   capitalPaid: 364.86,
// }
console.log(payments[payments.length - 1]); // Last payment details
// Expected output (example):
// {
//   paymentId: 59,
//   payment: 1599.52,
//   interest: 1111.58,
//   capital: 487.93,
//   balance: 224591.84,
//   amountPaid: 95970.99,
//   interestPaid: 70562.76,
//   capitalPaid: 25408.23,
// }
```

```ts
// Attempting to set an amortization period shorter than the term will throw an error.
try {
  mortgagePayments(200_000, 5, "monthly", 10, 5); // Term (10) > Amortization (5)
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: The amortizationPeriod should be equal or greater than the term."
}
```

## overwriteSheetData

Clears the content of a Google Sheet and then populates it with new data. This
function is useful for regularly updating datasets in Google Sheets, ensuring
that the sheet always reflects the latest information without manual
intervention.

The function automatically infers column headers from the keys of the first
object in your `data` array. It supports various options for customizing the
update process, including adding a timestamp of the last update, prepending
custom text, and controlling how Google Sheets interprets the data types.

By default, authentication is handled via environment variables
(`GOOGLE_PRIVATE_KEY` and `GOOGLE_SERVICE_ACCOUNT_EMAIL`). Alternatively, you
can use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON
file. For detailed setup instructions, refer to the `node-google-spreadsheet`
authentication guide:
[https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication).

### Signature

```typescript
async function overwriteSheetData(
  data: Record<string, string | number | boolean | Date | null>[],
  sheetUrl: string,
  options?: {
    prepend?: string;
    lastUpdate?: boolean;
    timeZone?:
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon";
    raw?: boolean;
    apiEmail?: string;
    apiKey?: string;
  },
): Promise<void>;
```

### Parameters

- **`data`**: - An array of objects to be written to the Google Sheet. The keys
  of the first object in this array will be used as column headers.
- **`sheetUrl`**: - The URL of the Google Sheet to be updated. This URL should
  point to a specific sheet (e.g., ending with `#gid=0`).
- **`options`**: - An optional object with configuration options:
- **`options.prepend`**: - A string to be added as a new row at the very top of
  the sheet, before any data or `lastUpdate` information. Useful for adding
  notes or disclaimers.
- **`options.lastUpdate`**: - If `true`, a row indicating the date and time of
  the update will be added before the data. Defaults to `false`.
- **`options.timeZone`**: - If `lastUpdate` is `true`, this option allows you to
  specify a time zone for the timestamp (e.g., `"Canada/Eastern"`). If omitted,
  the date will be formatted in UTC.
- **`options.raw`**: - If `true`, data will be written as raw values, preventing
  Google Sheets from automatically guessing data types or applying formatting.
  This can be useful for preserving exact string representations. Defaults to
  `false`.
- **`options.apiEmail`**: - Optional. Your Google Service Account email. If
  provided, this will override the `GOOGLE_SERVICE_ACCOUNT_EMAIL` environment
  variable.
- **`options.apiKey`**: - Optional. Your Google Service Account private key. If
  provided, this will override the `GOOGLE_PRIVATE_KEY` environment variable.

### Returns

A Promise that resolves when the sheet has been successfully cleared and
populated with new data.

### Examples

```ts
// The data needs to be an array of objects. The keys of the first object will be used to create the header row.
const data = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
];
// Fake URL used as an example.
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/nrqo3oP4KMWYbELScQa8W1nHZPfIrA7LIz9UmcRE4GyJN/edit#gid=0";

// Clearing the sheet and then populating it.
await overwriteSheetData(data, sheetUrl);
console.log("Sheet updated successfully with data.");
```

```ts
// Write data as raw values to prevent Google Sheets from interpreting them.
const rawData = [
  { id: "001", value: "05" }, // '05' might be interpreted as 5 without raw: true
  { id: "002", value: "10" },
];
await overwriteSheetData(rawData, sheetUrl, { raw: true });
console.log("Sheet updated successfully with raw data.");
```

```ts
// Add a timestamp of the update in UTC.
await overwriteSheetData(data, sheetUrl, { lastUpdate: true });
console.log("Sheet updated with UTC timestamp.");

// Add a timestamp formatted to a specific time zone.
await overwriteSheetData(data, sheetUrl, {
  lastUpdate: true,
  timeZone: "Canada/Eastern",
});
console.log("Sheet updated with Eastern Time timestamp.");
```

```ts
// Add a custom message at the top of the sheet.
await overwriteSheetData(data, sheetUrl, {
  prepend: "For inquiries, contact data.team@example.com",
});
console.log("Sheet updated with prepended text.");

// Combine prepend with last update and time zone.
await overwriteSheetData(data, sheetUrl, {
  prepend: "For inquiries, contact data.team@example.com",
  lastUpdate: true,
  timeZone: "Canada/Eastern",
});
console.log("Sheet updated with prepended text and timestamp.");
```

```ts
// Use explicitly provided API credentials instead of environment variables.
await overwriteSheetData(data, sheetUrl, {
  apiEmail: "your-service-account@project-id.iam.gserviceaccount.com",
  apiKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
});
console.log("Sheet updated using custom API credentials.");
```

## performChiSquaredGoodnessOfFitTest

Performs a Chi-Squared goodness of fit test to determine if observed frequencies
match expected frequencies.

The Chi-Squared goodness of fit test examines whether observed frequencies in
categorical data differ significantly from expected frequencies. This test helps
determine if a sample follows a particular theoretical distribution or pattern.

**When to use this function:**

- Use for goodness of fit tests to see if observed data matches expected
  distribution
- When testing if a sample follows a specific theoretical distribution
- For validating assumptions about population proportions
- When comparing actual results against theoretical models

**Important Requirements:**

- The sum of observed frequencies must equal the sum of expected frequencies
  (within 0.1% tolerance)
- All expected frequencies must be greater than 0
- For reliable results, at least 80% of expected frequencies should be ≥ 5
- For tests with 1 degree of freedom, all expected frequencies should be ≥ 5

### Signature

```typescript
function performChiSquaredGoodnessOfFitTest<T extends Record<string, unknown>>(
  data: T[],
  categoryKey: keyof T,
  observedKey: keyof T,
  expectedKey: keyof T,
): {
  chiSquared: number;
  degreesOfFreedom: number;
  pValue: number;
  warnings: string[];
};
```

### Parameters

- **`data`**: - An array of objects containing the categorical data and
  frequency counts.
- **`categoryKey`**: - The key for the categorical variable.
- **`observedKey`**: - The key containing the observed frequency count for each
  category.
- **`expectedKey`**: - The key containing the expected frequency count for each
  category.

### Returns

An object containing the chi-squared statistic, degrees of freedom, p-value, and
any warnings about test assumptions.

### Examples

```ts
// Testing if observed crime types match expected distribution (goodness of fit)
const crimeData = [
  { crime_type: "theft", observed_count: 120, expected_count: 100 },
  { crime_type: "assault", observed_count: 80, expected_count: 90 },
  { crime_type: "fraud", observed_count: 45, expected_count: 50 },
  { crime_type: "vandalism", observed_count: 55, expected_count: 60 },
];
// Note: Total observed = 300, Total expected = 300 ✓

const testResult = performChiSquaredGoodnessOfFitTest(
  crimeData,
  "crime_type",
  "observed_count",
  "expected_count",
);

console.log(`Chi-squared: ${testResult.chiSquared.toFixed(3)}`);
if (testResult.pValue < 0.05) {
  console.log(
    "Observed crime distribution differs significantly from expected",
  );
} else {
  console.log("Observed crime distribution matches expected pattern");
}

// Check for any warnings about test assumptions
if (testResult.warnings.length > 0) {
  console.log("Test assumption warnings:");
  testResult.warnings.forEach((warning) => console.log("- " + warning));
}
```

```ts
// Testing if dice rolls follow uniform distribution
const diceData = [
  { face: "1", observed: 18, expected: 20 },
  { face: "2", observed: 22, expected: 20 },
  { face: "3", observed: 16, expected: 20 },
  { face: "4", observed: 25, expected: 20 },
  { face: "5", observed: 19, expected: 20 },
  { face: "6", observed: 20, expected: 20 },
];
// Note: Total observed = 120, Total expected = 120 ✓

const result = performChiSquaredGoodnessOfFitTest(
  diceData,
  "face",
  "observed",
  "expected",
);

if (result.pValue > 0.05) {
  console.log("Dice appears to be fair (follows uniform distribution)");
} else {
  console.log("Dice may be biased");
}
```

```ts
// Example that would throw an error due to mismatched totals
const invalidData = [
  { category: "A", observed: 50, expected: 40 }, // Total observed: 80
  { category: "B", observed: 30, expected: 25 }, // Total expected: 65
];

try {
  performChiSquaredGoodnessOfFitTest(
    invalidData,
    "category",
    "observed",
    "expected",
  );
} catch (error) {
  console.log("Error:", error.message);
  // "Total observed frequencies (80) must approximately equal total expected frequencies (65)"
}
```

## performChiSquaredIndependenceTest

Performs a Chi-Squared independence test to determine if two categorical
variables are statistically independent or associated.

The Chi-Squared independence test examines whether there is a statistically
significant association between two categorical variables by comparing observed
frequencies against expected frequencies calculated under the assumption of
independence.

**When to use this function:**

- Use for testing independence between two categorical variables (e.g., gender
  vs voting preference)
- When you have categorical data organized in frequency counts
- When testing hypotheses about associations between variables

### Signature

```typescript
function performChiSquaredIndependenceTest<T extends Record<string, unknown>>(
  data: T[],
  firstVariableKey: keyof T,
  secondVariableKey: keyof T,
  countKey: keyof T,
): {
  chiSquared: number;
  degreesOfFreedom: number;
  pValue: number;
  warnings: string[];
};
```

### Parameters

- **`data`**: - An array of objects containing the categorical data and
  frequency counts.
- **`firstVariableKey`**: - The key for the first categorical variable.
- **`secondVariableKey`**: - The key for the second categorical variable.
- **`countKey`**: - The key containing the frequency count for each combination.

### Returns

An object containing the chi-squared statistic, degrees of freedom, p-value,
contingency table details, and any warnings about test assumptions.

### Examples

```ts
// A journalist investigating if voting preference is independent of age group
const votingData = [
  { age_group: "18-30", candidate: "A", count: 45 },
  { age_group: "18-30", candidate: "B", count: 55 },
  { age_group: "31-50", candidate: "A", count: 60 },
  { age_group: "31-50", candidate: "B", count: 40 },
  { age_group: "51+", candidate: "A", count: 70 },
  { age_group: "51+", candidate: "B", count: 30 },
];

const result = performChiSquaredIndependenceTest(
  votingData,
  "age_group",
  "candidate",
  "count",
);

console.log(`Chi-squared statistic: ${result.chiSquared.toFixed(3)}`);
console.log(`Degrees of freedom: ${result.degreesOfFreedom}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Voting preference is significantly associated with age group");
} else {
  console.log("Voting preference is independent of age group");
}

// Check for any warnings about test assumptions
if (result.warnings.length > 0) {
  console.log("Test assumption warnings:");
  result.warnings.forEach((warning) => console.log("- " + warning));
}
```

```ts
// Testing association between education level and income category
const educationIncomeData = [
  { education: "high_school", income: "low", count: 150 },
  { education: "high_school", income: "medium", count: 100 },
  { education: "high_school", income: "high", count: 50 },
  { education: "college", income: "low", count: 80 },
  { education: "college", income: "medium", count: 120 },
  { education: "college", income: "high", count: 100 },
  { education: "graduate", income: "low", count: 30 },
  { education: "graduate", income: "medium", count: 70 },
  { education: "graduate", income: "high", count: 150 },
];

const result = performChiSquaredIndependenceTest(
  educationIncomeData,
  "education",
  "income",
  "count",
);

if (result.pValue < 0.01) {
  console.log("Strong evidence that education and income are associated");
} else {
  console.log("No strong evidence of association between education and income");
}
```

## performPairedTTest

Performs a paired t-test for dependent means to determine if there is a
significant difference between two related samples.

The paired t-test is used when comparing two measurements from the same subjects
or entities, such as before and after an event, policy change, or intervention.
It tests whether the mean difference between paired observations is
significantly different from zero. This is a test for **dependent means**
(related samples), not independent groups.

**When to use this function:**

- Use when you have two measurements from the same subjects or entities
  (before/after an event, pre/post policy change)
- When comparing two related conditions or matched pairs (same districts,
  candidates, regions, etc.)
- When you want to control for individual variation between subjects (dependent
  means)
- When data differences are approximately normally distributed

**Test types:**

- **"two-tailed"** (default): Tests if the mean difference is significantly
  different from zero
- **"left-tailed"**: Tests if the mean difference is significantly less than
  zero
- **"right-tailed"**: Tests if the mean difference is significantly greater than
  zero

### Signature

```typescript
function performPairedTTest<T extends Record<string, unknown>>(
  pairedData: T[],
  firstVariableKey: keyof T,
  secondVariableKey: keyof T,
  options?: { tail?: "two-tailed" | "left-tailed" | "right-tailed" },
): {
  sampleSize: number;
  firstMean: number;
  secondMean: number;
  meanDifference: number;
  differenceStdDev: number;
  differenceVariance: number;
  degreesOfFreedom: number;
  tStatistic: number;
  pValue: number;
};
```

### Parameters

- **`pairedData`**: - An array of objects containing paired observations. Each
  object must contain both specified keys with numeric values.
- **`firstVariableKey`**: - The key for the first measurement in each pair
  (e.g., "before_event", "baseline", "pre_policy").
- **`secondVariableKey`**: - The key for the second measurement in each pair
  (e.g., "after_event", "follow_up", "post_policy").
- **`options`**: - Optional configuration object.
- **`options.tail`**: - The type of test to perform: "two-tailed" (default),
  "left-tailed", or "right-tailed".

### Returns

An object containing comprehensive test results including sample statistics,
differences, degrees of freedom, t-statistic, and p-value.

### Examples

```ts
// A journalist investigating if parking fines increased after new enforcement policy
const parkingFineData = [
  { district_id: 1, fines_before: 125, fines_after: 142 },
  { district_id: 2, fines_before: 98, fines_after: 108 },
  { district_id: 3, fines_before: 156, fines_after: 175 },
  { district_id: 4, fines_before: 87, fines_after: 95 },
  { district_id: 5, fines_before: 203, fines_after: 228 },
  { district_id: 6, fines_before: 134, fines_after: 149 },
];

const result = performPairedTTest(
  parkingFineData,
  "fines_before",
  "fines_after",
);
console.log(
  `Mean increase in fines: ${result.meanDifference.toFixed(2)} per month`,
);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Parking fines increased significantly after the new policy");
} else {
  console.log("No significant change in parking fines");
}
```

```ts
// Testing if campaign spending affects vote share (right-tailed test)
const campaignData = [
  { district_id: 1, before_ads: 32.5, after_ads: 38.2 },
  { district_id: 2, before_ads: 28.9, after_ads: 34.1 },
  { district_id: 3, before_ads: 41.3, after_ads: 43.7 },
  { district_id: 4, before_ads: 25.6, after_ads: 31.9 },
  { district_id: 5, before_ads: 36.8, after_ads: 40.3 },
];

// Test if after_ads - before_ads > 0 (increase in vote share)
const testResult = performPairedTTest(
  campaignData,
  "before_ads",
  "after_ads",
  { tail: "right-tailed" },
);

console.log(
  `Mean vote share increase: ${testResult.meanDifference.toFixed(2)}%`,
);
if (testResult.pValue < 0.05) {
  console.log("Campaign ads show significant increase in vote share!");
} else {
  console.log("Campaign ads don't show significant increase in vote share");
}
```

## performTTest

Performs a one-sample t-test for independent means to determine if a sample mean
is significantly different from a hypothesized population mean.

The function compares the mean of a sample against a hypothesized population
mean when the population standard deviation is unknown. This is the most common
scenario in real-world statistical analysis where we only have sample data and
need to estimate the population parameters. This is a test for **independent
means** (sample vs population), not related/paired samples.

**When to use this function:**

- Use when you have sample data and want to test if the sample mean differs
  significantly from a known or hypothesized value
- When the population standard deviation is unknown (most common case)
- When data is approximately normally distributed OR when you have a large
  sample size (n ≥ 30-50)
- **Robustness to non-normality**: Due to the Central Limit Theorem, the t-test
  becomes robust to violations of normality as sample size increases. For large
  samples (n ≥ 30-50), the sampling distribution of the mean approaches
  normality even if the underlying data is not normally distributed
- **Small samples (n < 30)**: Normality assumption is more critical. Consider
  checking for normality or using non-parametric alternatives (like Wilcoxon
  signed-rank test) if data is heavily skewed or has extreme outliers
- For independent observations (not paired or matched data)

**Test types:**

- **"two-tailed"** (default): Tests if sample mean is significantly different
  (higher OR lower) than hypothesized mean
- **"left-tailed"**: Tests if sample mean is significantly lower than
  hypothesized mean
- **"right-tailed"**: Tests if sample mean is significantly higher than
  hypothesized mean

### Signature

```typescript
function performTTest<T extends Record<string, unknown>>(
  sampleData: T[],
  variableKey: keyof T,
  hypothesizedMean: number,
  options?: { tail?: "two-tailed" | "left-tailed" | "right-tailed" },
): {
  sampleSize: number;
  sampleMean: number;
  sampleStdDev: number;
  sampleVariance: number;
  hypothesizedMean: number;
  degreesOfFreedom: number;
  tStatistic: number;
  pValue: number;
};
```

### Parameters

- **`sampleData`**: - An array of objects representing the sample data. Each
  object must contain the specified key with numeric values.
- **`variableKey`**: - The key in each data object that contains the numeric
  values to analyze for the statistical test.
- **`hypothesizedMean`**: - The hypothesized population mean to test against
  (null hypothesis value).
- **`options`**: - Optional configuration object.
- **`options.tail`**: - The type of test to perform: "two-tailed" (default),
  "left-tailed", or "right-tailed".

### Returns

An object containing comprehensive test results including sample statistics,
degrees of freedom, t-statistic, and p-value.

### Examples

```ts
// A journalist investigating if basketball players in a local league
// score significantly different from the national average of 10 points per game
const localPlayers = [
  { player_id: 1, name: "John", points_per_game: 15 },
  { player_id: 2, name: "Sarah", points_per_game: 12 },
  { player_id: 3, name: "Mike", points_per_game: 18 },
  { player_id: 4, name: "Lisa", points_per_game: 14 },
  { player_id: 5, name: "Tom", points_per_game: 16 },
  { player_id: 6, name: "Anna", points_per_game: 13 },
];

const nationalAverage = 10; // Known population mean

const result = performTTest(localPlayers, "points_per_game", nationalAverage);
console.log(`Sample mean: ${result.sampleMean.toFixed(2)} points per game`);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log(
    "Local players score significantly different from national average",
  );
} else {
  console.log("Local players' scoring is consistent with national average");
}
```

```ts
// Testing if a new training program improves performance (right-tailed test)
const trainingResults = [
  { athlete_id: 1, improvement_score: 8.5 },
  { athlete_id: 2, improvement_score: 12.3 },
  { athlete_id: 3, improvement_score: 6.7 },
  { athlete_id: 4, improvement_score: 15.2 },
  { athlete_id: 5, improvement_score: 9.8 },
];

const expectedImprovement = 5; // Null hypothesis: no significant improvement

const testResult = performTTest(
  trainingResults,
  "improvement_score",
  expectedImprovement,
  { tail: "right-tailed" },
);

console.log(`Sample mean improvement: ${testResult.sampleMean.toFixed(2)}`);
if (testResult.pValue < 0.05) {
  console.log("Training program shows significant improvement!");
} else {
  console.log("Training program doesn't show significant improvement");
}
```

## performTwoSampleTTest

Performs a two-sample t-test for independent means to determine if there is a
significant difference between two independent groups.

The two-sample t-test compares the means of two independent groups when the
population standard deviations are unknown. It tests whether the difference
between the two group means is significantly different from zero. This is a test
for **independent means** (unrelated groups), not paired/related samples.

**When to use this function:**

- Use when you have two separate, independent groups to compare
- When comparing measurements from different subjects, entities, or populations
- When the population standard deviations are unknown (most common case)
- When data in both groups are approximately normally distributed OR when you
  have large sample sizes (n ≥ 30-50 per group)
- **Robustness to non-normality**: Due to the Central Limit Theorem, the
  two-sample t-test becomes robust to violations of normality as sample sizes
  increase. For large samples (n ≥ 30-50 per group), the sampling distribution
  of the difference in means approaches normality even if the underlying data is
  not normally distributed
- **Small samples (n < 30 per group)**: Normality assumption is more critical
  for both groups. Consider checking for normality or using non-parametric
  alternatives (like Mann-Whitney U test) if data is heavily skewed or has
  extreme outliers
- For independent observations (not paired, matched, or related data)

**Test types:**

- **"two-tailed"** (default): Tests if the group means are significantly
  different from each other
- **"left-tailed"**: Tests if group 1 mean is significantly less than group 2
  mean
- **"right-tailed"**: Tests if group 1 mean is significantly greater than group
  2 mean

### Signature

```typescript
function performTwoSampleTTest<
  T1 extends Record<string, unknown>,
  T2 extends Record<string, unknown>,
  K extends keyof T1 & keyof T2,
>(
  group1Data: T1[],
  group2Data: T2[],
  variableKey: K,
  options?: { tail?: "two-tailed" | "left-tailed" | "right-tailed" },
): {
  group1SampleSize: number;
  group2SampleSize: number;
  group1Mean: number;
  group2Mean: number;
  group1StdDev: number;
  group2StdDev: number;
  group1Variance: number;
  group2Variance: number;
  meanDifference: number;
  degreesOfFreedom: number;
  tStatistic: number;
  pValue: number;
};
```

### Parameters

- **`group1Data`**: - An array of objects containing observations for the first
  group. Each object must contain the specified key with a numeric value.
- **`group2Data`**: - An array of objects containing observations for the second
  group. Each object must contain the specified key with a numeric value.
- **`variableKey`**: - The key for the measurement in both group objects (e.g.,
  "income", "score", "price").
- **`options`**: - Optional configuration object.
- **`options.tail`**: - The type of test to perform: "two-tailed" (default),
  "left-tailed", or "right-tailed".

### Returns

An object containing comprehensive test results including sample statistics for
both groups, mean difference, degrees of freedom, t-statistic, and p-value.

### Examples

```ts
// A journalist comparing average housing prices between two different cities
const city1Prices = [
  { property_id: 1, price: 450000 },
  { property_id: 2, price: 520000 },
  { property_id: 3, price: 380000 },
  { property_id: 4, price: 610000 },
  { property_id: 5, price: 475000 },
];

const city2Prices = [
  { property_id: 101, price: 520000 },
  { property_id: 102, price: 580000 },
  { property_id: 103, price: 490000 },
  { property_id: 104, price: 660000 },
  { property_id: 105, price: 530000 },
  { property_id: 106, price: 615000 },
];

const result = performTwoSampleTTest(city1Prices, city2Prices, "price");
console.log(`City 1 average: $${result.group1Mean.toFixed(0)}`);
console.log(`City 2 average: $${result.group2Mean.toFixed(0)}`);
console.log(`Mean difference: $${result.meanDifference.toFixed(0)}`);
console.log(`T-statistic: ${result.tStatistic.toFixed(3)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);

if (result.pValue < 0.05) {
  console.log("Significant difference in housing prices between cities");
} else {
  console.log("No significant difference in housing prices between cities");
}
```

```ts
// Testing if male candidates receive higher campaign donations than female candidates (right-tailed)
const maleCandidates = [
  { candidate_id: 1, donation_total: 25000 },
  { candidate_id: 2, donation_total: 32000 },
  { candidate_id: 3, donation_total: 18000 },
  { candidate_id: 4, donation_total: 41000 },
];

const femaleCandidates = [
  { candidate_id: 101, donation_total: 22000 },
  { candidate_id: 102, donation_total: 28000 },
  { candidate_id: 103, donation_total: 19000 },
  { candidate_id: 104, donation_total: 35000 },
  { candidate_id: 105, donation_total: 24000 },
];

// Test if male average > female average
const testResult = performTwoSampleTTest(
  maleCandidates,
  femaleCandidates,
  "donation_total",
  { tail: "right-tailed" },
);

console.log(`Male average: $${testResult.group1Mean.toFixed(0)}`);
console.log(`Female average: $${testResult.group2Mean.toFixed(0)}`);
if (testResult.pValue < 0.05) {
  console.log("Male candidates receive significantly higher donations");
} else {
  console.log("No significant difference in donation amounts by gender");
}
```

## performZTest

Performs a one-sample Z-test to determine if a sample mean is significantly
different from a population mean.

The function compares the mean of a sample against the mean of a known
population to test the null hypothesis. It automatically applies the finite
population correction (FPC) when the sample size exceeds 5% of the population
size, which provides more accurate results for smaller populations. This is a
**one-sample Z-test** comparing a sample against a known population, not a
comparison between two independent samples.

**When to use this function:**

- Use when you have a complete population dataset and want to test if a sample
  represents that population
- When you need to validate whether observed differences between sample and
  population means are statistically significant
- When data is approximately normally distributed or sample size is large
  (Central Limit Theorem applies)
- For independent observations (not paired or matched data)

**Test types:**

- **"two-tailed"** (default): Tests if sample mean is significantly different
  (higher OR lower) than population mean
- **"left-tailed"**: Tests if sample mean is significantly lower than population
  mean
- **"right-tailed"**: Tests if sample mean is significantly higher than
  population mean

### Signature

```typescript
function performZTest<T extends Record<string, unknown>>(
  populationData: T[],
  sampleData: T[],
  variableKey: keyof T,
  options?: { tail?: "two-tailed" | "left-tailed" | "right-tailed" },
): {
  populationSize: number;
  sampleSize: number;
  populationMean: number;
  sampleMean: number;
  populationStdDev: number;
  populationVariance: number;
  fpcApplied: boolean;
  zScore: number;
  pValue: number;
};
```

### Parameters

- **`populationData`**: - An array of objects representing the complete
  population data. Each object must contain the specified key with numeric
  values.
- **`sampleData`**: - An array of objects representing the sample data to test
  against the population. Each object must contain the specified key with
  numeric values.
- **`variableKey`**: - The key in each data object that contains the numeric
  values to analyze for the statistical test.
- **`options`**: - Optional configuration object.
- **`options.tail`**: - The type of test to perform: "two-tailed" (default),
  "left-tailed", or "right-tailed".

### Returns

An object containing comprehensive test results including population and sample
statistics, population variance and standard deviation, test statistics
(z-score), p-value, and whether finite population correction was applied.

### Examples

```ts
// A journalist investigating if Democratic candidates receive significantly
// different donation amounts compared to all political candidates (two-tailed test)
const allCandidates = [
  { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
  { candidate_id: 2, party: "Republican", donation_amount: 3200 },
  { candidate_id: 3, party: "Independent", donation_amount: 1800 },
  { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
  // ... complete population of all candidates (5,000 records)
];

const democraticCandidates = [
  { candidate_id: 1, party: "Democratic", donation_amount: 2500 },
  { candidate_id: 4, party: "Democratic", donation_amount: 2800 },
  { candidate_id: 7, party: "Democratic", donation_amount: 3100 },
  // ... all Democratic candidates (1,200 records)
];

const result = performZTest(
  allCandidates,
  democraticCandidates,
  "donation_amount",
);
console.log(`Population mean donation: $${result.populationMean.toFixed(2)}`);
console.log(`Democratic candidates mean: $${result.sampleMean.toFixed(2)}`);
console.log(`P-value: ${result.pValue.toFixed(4)}`);
if (result.pValue < 0.05) {
  console.log(
    "Democratic candidates receive significantly different donations than average",
  );
} else {
  console.log(
    "Democratic candidates' donations are consistent with overall average",
  );
}
```

```ts
// Testing if corporate donors give MORE than average (right-tailed test)
const allDonors = [
  { donor_id: 1, type: "individual", amount: 500 },
  { donor_id: 2, type: "corporate", amount: 5000 },
  { donor_id: 3, type: "PAC", amount: 2500 },
  // ... complete donor population
];

const corporateDonors = [
  { donor_id: 2, type: "corporate", amount: 5000 },
  { donor_id: 8, type: "corporate", amount: 7500 },
  // ... all corporate donors
];

const testResult = performZTest(allDonors, corporateDonors, "amount", {
  tail: "right-tailed",
});
console.log(
  `All donors mean donation: $${testResult.populationMean.toFixed(2)}`,
);
console.log(`Corporate donors mean: $${testResult.sampleMean.toFixed(2)}`);
if (testResult.pValue < 0.05) {
  console.log("Corporate donors give significantly MORE than average");
} else {
  console.log("Corporate donors don't give significantly more than average");
}
```

## prettyDuration

Formats a duration into a human-readable string, breaking it down into years,
months, days, hours, minutes, seconds, and milliseconds. This function is useful
for displaying elapsed time in a user-friendly format, such as for performance
logging, task completion times, or general time tracking.

The function can calculate the duration from a given start time to the current
time, or between a specified start and end time. It provides options for logging
the output directly to the console and adding custom prefixes or suffixes to the
formatted string. Note that for simplicity, months are approximated as 30 days
and years as 365 days.

### Signature

```typescript
function prettyDuration(
  start: Date | number,
  options?: {
    log?: boolean;
    end?: Date | number;
    prefix?: string;
    suffix?: string;
  },
): string;
```

### Parameters

- **`start`**: - The starting point of the duration. This can be a `Date` object
  or a Unix timestamp (number of milliseconds since epoch).
- **`options`**: - Optional settings to customize the duration formatting and
  output.
- **`options.log`**: - If `true`, the formatted duration string will be logged
  to the console. Defaults to `false`.
- **`options.end`**: - The ending point of the duration. This can be a `Date`
  object or a Unix timestamp. If omitted, the current time (`Date.now()`) will
  be used as the end point.
- **`options.prefix`**: - A string to prepend to the formatted duration string
  (e.g., "Elapsed time: ").
- **`options.suffix`**: - A string to append to the formatted duration string
  (e.g., " (Task completed)").

### Returns

A human-readable string representing the duration.

### Examples

```ts
// A starting Date somewhere in your code.
const startDate = new Date(); // or Date.now()

// When you want to know the elapsed duration, pass the start date.
const duration = prettyDuration(startDate);
console.log(duration); // Returns something like "22 days, 6 h, 3 min, 15 sec, 3 ms"
```

```ts
// If you want to console.log it directly, set the `log` option to `true`.
// This will print the duration to the console and also return the string.
const startDateForLog = new Date();
// ... some operations ...
prettyDuration(startDateForLog, { log: true });
```

```ts
// You can also use a prefix and/or suffix for the output string.
const startDateWithPrefixSuffix = new Date();
// ... some operations ...
prettyDuration(startDateWithPrefixSuffix, {
  log: true,
  prefix: "Elapsed time: ",
  suffix: " (Main function)",
});
// Returns and logs something like "Total duration: 3 min, 15 sec, 3 ms (Main function)"
```

```ts
// If you want to format the duration between two specific dates, use the `end` option.
const start = new Date("2024-01-01T17:00:00");
const end = new Date("2024-01-23T23:03:15");
const specificDuration = prettyDuration(start, { end });
console.log(specificDuration); // Returns "22 days, 6 h, 3 min, 15 sec, 0 ms"
```

## publishChartDW

Publishes a specified Datawrapper chart, table, or map. This function
streamlines the process of making your Datawrapper visualizations live, allowing
for automated deployment and updates. It handles authentication using an API
key, which can be provided via environment variables or directly through
options.

### Signature

```typescript
async function publishChartDW(
  chartId: string,
  options?: { apiKey?: string; returnResponse?: boolean },
): Promise<void | Response>;
```

### Parameters

- **`chartId`**: - The unique ID of the Datawrapper chart, table, or map to be
  published. This ID can be found in the Datawrapper URL or dashboard.
- **`options`**: - Optional parameters to configure the publishing process.
- **`options.apiKey`**: - The name of the environment variable that stores your
  Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function
  defaults to looking for the `DATAWRAPPER_KEY` environment variable.
- **`options.returnResponse`**: - If `true`, the function will return the full
  `Response` object from the Datawrapper API call. This can be useful for
  debugging or for more detailed handling of the API response. Defaults to
  `false`.

### Returns

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a
`Response` object if `returnResponse` is `true`.

### Examples

```ts
// Publish a Datawrapper chart with a given ID.
const chartID = "myChartId";
await publishChartDW(chartID);
console.log(`Chart ${chartID} published successfully.`);
```

```ts
// If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
const customApiKeyChartID = "anotherChartId";
await publishChartDW(customApiKeyChartID, { apiKey: "DW_API_KEY" });
console.log(`Chart ${customApiKeyChartID} published using custom API key.`);
```

```ts
// Get the full HTTP response object after publishing.
const chartIDForResponse = "yetAnotherChartId";
const response = await publishChartDW(chartIDForResponse, {
  returnResponse: true,
});
console.log(`Response status for ${chartIDForResponse}: ${response?.status}`);
```

## reencode

Converts a file from one character encoding to another. This function is
particularly optimized for handling large files.

Character encoding is crucial for ensuring that text data is displayed correctly
across different systems and applications. This function helps resolve issues
related to garbled text when files are created or read with different encoding
standards.

### Signature

```typescript
async function reencode(
  inputFilePath: string,
  outputFilePath: string,
  fromEncoding: string,
  toEncoding: string,
  options?: { bufferSize?: number; addBOM?: boolean },
): Promise<void>;
```

### Parameters

- **`inputFilePath`**: - The absolute path to the input file that needs to be
  re-encoded.
- **`outputFilePath`**: - The absolute path where the converted file will be
  saved.
- **`fromEncoding`**: - The character encoding of the input file (e.g.,
  'windows-1252', 'latin1', 'ISO-8859-1').
- **`toEncoding`**: - The desired character encoding for the output file (e.g.,
  'utf-8').
- **`options`**: - Optional configuration settings for the re-encoding process.
- **`options.bufferSize`**: - The size of the read buffer in kilobytes (KB). A
  larger buffer can improve performance for very large files but consumes more
  memory. Defaults to `256` KB.
- **`options.addBOM`**: - If `true`, a Byte Order Mark (BOM) will be added to
  the output file if the `toEncoding` is UTF-8. A BOM can help some applications
  correctly identify the UTF-8 encoding. Defaults to `false`.

### Returns

A Promise that resolves when the file has been successfully re-encoded and
saved.

### Examples

```ts
// Convert a CSV file from Windows-1252 to UTF-8 encoding.
await reencode("input.csv", "output.csv", "windows-1252", "utf-8");
console.log("File re-encoded successfully.");
```

```ts
// Re-encode a large file with a larger buffer size and add a UTF-8 Byte Order Mark (BOM).
await reencode("large_input.csv", "large_output.csv", "latin1", "utf-8", {
  bufferSize: 1024, // 1MB buffer
  addBOM: true,
});
console.log("Large file re-encoded with custom buffer and BOM.");
```

## removeDirectory

Removes a directory and all its contents recursively.

**Caution**: Use this function with care, as it permanently deletes files and
directories without sending them to the recycle bin or trash. Ensure that the
`path` provided is correct to avoid accidental data loss.

### Signature

```typescript
function removeDirectory(path: string): void;
```

### Parameters

- **`path`**: - The absolute or relative path to the directory to be removed.

### Returns

`void`

### Examples

```ts
// Removes the directory and all its contents recursively.
removeDirectory("./data/temp");
console.log("Directory removed successfully.");
```

```ts
// Attempting to remove a directory that does not exist will not throw an error due to `force: true`.
removeDirectory("./non-existent-folder");
console.log("Attempted to remove non-existent folder (no error thrown).");
```

## rewind

Rewinds the winding order of the specified GeoJSON object to be clockwise. It is
based on the D3-geo library's winding order conventions.

### Signature

```typescript
function rewind(object: GeoPermissibleObjects): GeoPermissibleObjects;
```

### Parameters

- **`object`**: - The GeoJSON object to rewind.

### Returns

A new GeoJSON object.

### Examples

```ts
// Rewind a FeatureCollection.
const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[-10, -10], [-10, 10], [10, 10], [10, -10], [-10, -10]]],
      },
    },
  ],
};
const rewoundFeatureCollection = rewind(featureCollection);
```

```ts
// Rewind a GeoJSON Feature containing a Polygon geometry.
const feature = {
  type: "Feature",
  properties: { name: "Example Area" },
  geometry: {
    type: "Polygon",
    coordinates: [[[-5, -5], [-5, 5], [5, 5], [5, -5], [-5, -5]]],
  },
};
const rewoundFeature = rewind(feature);
console.log(rewoundFeature);
```

## round

Rounds a number based on specified criteria: a fixed number of decimal places,
to the nearest integer multiple, or to a specific number of significant digits.
This function provides flexible rounding capabilities essential for data
presentation and numerical accuracy.

By default, if no options are specified, the function rounds to the nearest
whole number.

### Signature

```typescript
function round(
  number: number,
  options?: {
    decimals?: number;
    nearestInteger?: number;
    significantDigits?: number;
    try?: boolean;
  },
): number;
```

### Parameters

- **`number`**: - The number to be rounded.
- **`options`**: - An object containing options for rounding.
- **`options.decimals`**: - The number of decimal places to keep when rounding.
  For example, `round(123.456, { decimals: 2 })` returns `123.46`.
- **`options.nearestInteger`**: - The base to which the number should be
  rounded. For example, `round(123, { nearestInteger: 10 })` rounds to `120`.
- **`options.significantDigits`**: - The number of significant digits to retain.
  Significant digits are counted from the first non-zero digit. For example,
  `round(0.004622, { significantDigits: 1 })` rounds to `0.005`.
- **`options.try`**: - If `true`, the function will return `NaN` (Not a Number)
  if the input `number` is not a valid number, instead of throwing an error.
  Defaults to `false`.

### Returns

The rounded number.

### Throws

- **`Error`**: If the input `number` is not a number (and `options.try` is not
  `true`), or if more than one rounding option (`decimals`, `nearestInteger`,
  `significantDigits`) is provided.

### Examples

```ts
// Round to the nearest integer (default behavior).
const resultDefault = round(1234.567);
console.log(resultDefault); // Expected output: 1235

// Round to one decimal place.
const resultDecimal = round(1234.567, { decimals: 1 });
console.log(resultDecimal); // Expected output: 1234.6
```

```ts
// Round 123 to the nearest multiple of 10.
const resultNearestInteger = round(123, { nearestInteger: 10 });
console.log(resultNearestInteger); // Expected output: 120

// Round 127 to the nearest multiple of 5.
const resultNearestFive = round(127, { nearestInteger: 5 });
console.log(resultNearestFive); // Expected output: 125
```

```ts
// Round 0.004622 to 1 significant digit.
const resultSignificantDigits = round(0.004622, { significantDigits: 1 });
console.log(resultSignificantDigits); // Expected output: 0.005

// Round 12345 to 2 significant digits.
const resultSignificantDigitsLarge = round(12345, { significantDigits: 2 });
console.log(resultSignificantDigitsLarge); // Expected output: 12000
```

```ts
// Attempting to round a non-numeric value without `try: true` will throw an error.
try {
  round("abc");
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: abc is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}."
}

// With `try: true`, it returns NaN for non-numeric input.
const nanResult = round("abc", { try: true });
console.log(nanResult); // Expected output: NaN
```

```ts
// Providing multiple rounding options will throw an error.
try {
  round(123.45, { decimals: 1, significantDigits: 2 });
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: You can't use options decimals, nearestInteger, or significantDigits together. Pick one."
}
```

## saveChart

Saves an [Observable Plot](https://github.com/observablehq/plot) chart as an
image file (`.png` or `.jpeg`) or an SVG file (`.svg`).

When saving as an SVG, only the SVG elements will be captured.

### Signature

```typescript
async function saveChart(
  data: Data,
  chart: (data: Data) => SVGSVGElement | HTMLElement,
  path: string,
  options?: { style?: string; dark?: boolean },
): Promise<void>;
```

### Parameters

- **`data`**: - An array of data objects that your Observable Plot chart
  function expects.
- **`chart`**: - A function that takes the `data` array and returns an SVG or
  HTML element representing the chart. This function should typically be a
  direct call to `Plot.plot()` or a similar Observable Plot constructor.
- **`path`**: - The file path where the image or SVG will be saved. The file
  extension (`.png`, `.jpeg`, or `.svg`) determines the output format.
- **`options`**: - Optional settings to customize the chart's appearance and
  behavior.
- **`options.style`**: - A CSS string to apply custom styles to the chart's
  container `div` (which has the ID `chart`). This is useful for fine-tuning the
  visual presentation beyond what Observable Plot's `style` option offers.
- **`options.dark`**: - If `true`, the chart will be rendered with a dark mode
  theme. This adjusts background and text colors for better visibility in dark
  environments. Defaults to `false`.

### Returns

A Promise that resolves when the chart has been successfully saved to the
specified path.

### Examples

```ts
// Save a simple dot plot as a PNG image.
import { dot, plot } from "@observablehq/plot";

const dataForPng = [{ year: 2024, value: 10 }, { year: 2025, value: 15 }];
const chartForPng = (d) => plot({ marks: [dot(d, { x: "year", y: "value" })] });
const pngPath = "output/dot-chart.png";

await saveChart(dataForPng, chartForPng, pngPath);
console.log(`Chart saved to ${pngPath}`);
```

```ts
// Save a bar chart as an SVG file with a custom background color.
import { barY, plot } from "@observablehq/plot";

const dataForSvg = [{ city: "New York", population: 8.4 }, {
  city: "Los Angeles",
  population: 3.9,
}];
const chartForSvg = (d) =>
  plot({ marks: [barY(d, { x: "city", y: "population" })] });
const svgPath = "output/bar-chart.svg";

await saveChart(dataForSvg, chartForSvg, svgPath, {
  style: "background-color: #f0f0f0;",
});
console.log(`Chart saved to ${svgPath}`);
```

```ts
// Save a line chart in dark mode.
import { line, plot } from "@observablehq/plot";

const dataForDark = [{ month: "Jan", temp: 5 }, { month: "Feb", temp: 7 }, {
  month: "Mar",
  temp: 10,
}];
const chartForDark = (d) =>
  plot({ marks: [line(d, { x: "month", y: "temp" })] });
const darkPath = "output/line-chart-dark.jpeg";

await saveChart(dataForDark, chartForDark, darkPath, { dark: true });
console.log(`Chart saved to ${darkPath}`);
```

## sleep

Pauses the execution of an asynchronous function for a specified duration. This
utility is useful for introducing delays in workflows, throttling requests, or
simulating real-world latencies.

It can also adjust the pause duration by subtracting any time already elapsed
since a given start point, ensuring more precise delays. This is particularly
useful for respecting API rate limits, ensuring that the total time spent
between requests meets a minimum threshold without over-waiting if the preceding
operations took some time. If the elapsed time is greater than or equal to `ms`,
the function will resolve immediately without pausing.

### Signature

```typescript
function sleep(
  ms: number,
  options?: { start?: Date; log?: boolean },
): Promise<void>;
```

### Parameters

- **`ms`**: - The number of milliseconds to pause execution for. This is the
  target duration of the sleep.
- **`options`**: - Optional parameters to customize the sleep behavior.
- **`options.start`**: - A `Date` object representing a starting timestamp. If
  provided, the function will subtract the time elapsed since this `start` time
  from the `ms` duration. This is particularly useful for respecting API rate
  limits.
- **`options.log`**: - If `true`, the function will log messages to the console
  indicating the sleep duration or if no sleep was needed. Defaults to `false`.

### Returns

A Promise that resolves after the specified (or adjusted) duration has passed.

### Examples

```ts
// Pause execution for 1 second.
await sleep(1000);
console.log("1 second has passed.");
```

```ts
// Pause execution for 1 second, but subtract any time already elapsed since `start`.
const start = new Date();
// Simulate a task that takes some time (e.g., 200ms)
await new Promise((resolve) => setTimeout(resolve, 200));
await sleep(1000, { start }); // This will pause for approximately 800ms
console.log("Execution resumed after approximately 1 second from start.");
```

```ts
// If the elapsed time already exceeds the requested sleep duration, no actual sleep occurs.
const startTime = new Date();
// Simulate a long-running task (e.g., 150ms)
await new Promise((resolve) => setTimeout(resolve, 150));
await sleep(100, { start: startTime, log: true });
// Expected console output: "No need to sleep, already took 150 ms." (or similar)
```

```ts
// Pause execution for 2 seconds and log the sleep duration.
await sleep(2000, { log: true });
// Expected console output: "Sleeping for 2 sec, 0 ms..." (or similar)
```

## styledLayerDescriptor

Generates an OpenGIS Styled Layer Descriptor (SLD) XML string, encoded for use
in a URL. This function is particularly useful for dynamically styling Web Map
Service (WMS) layers, allowing for custom color scales and visual
representations of geospatial data directly through the WMS request.

The SLD specifies how a map layer should be rendered. This function focuses on
creating a `ColorMap` within the SLD, which defines a gradient of colors based
on data values. This is commonly used for visualizing continuous data, such as
temperature, elevation, or precipitation, on a map.

### Signature

```typescript
function styledLayerDescriptor(
  layer: string,
  colorScale: { color: string; value: number }[],
): string;
```

### Parameters

- **`layer`**: - The name of the WMS layer to which this SLD will be applied
  (e.g., `"GDPS.ETA_TT"`).
- **`colorScale`**: - An array of objects, where each object defines a `color`
  (hex code) and a `value` (the data threshold for that color). The function
  will sort these entries by value in ascending order to create a proper color
  gradient.

### Returns

A URL-encoded XML string representing the Styled Layer Descriptor.

### Examples

```ts
// Returns the SLD for the GDPS.ETA_TT layer with a color scale going from blue to red.
const sld = styledLayerDescriptor("GDPS.ETA_TT", [
  { color: "#550c24", value: 100 },
  { color: "#7f2e34", value: 30 },
  { color: "#c26847", value: 20 },
  { color: "#bdbb7a", value: 10 },
  { color: "#e0e9f0", value: 0 },
  { color: "#97b4cd", value: -10 },
  { color: "#5881a1", value: -20 },
  { color: "#334f60", value: -30 },
  { color: "#21353f", value: -100 },
]);

// The sld can now be used in a WMS request as SLD_BODY.
const url =
  `https://geo.weather.gc.ca/geomet?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=-90,-180,90,180&CRS=EPSG:4326&WIDTH=2400&HEIGHT=1200&LAYERS=GDPS.ETA_TT&FORMAT=image/jpeg&SLD_BODY=${sld}`;
console.log(url);
```

## toBucket

Uploads a local file to a Google Cloud Storage (GCS) bucket and returns the URI
of the uploaded file. This function provides robust control over the upload
process, including options for skipping uploads if the file already exists,
overwriting existing files, and setting custom metadata.

By default, if a file with the same destination path already exists in the
bucket, an error will be thrown to prevent accidental overwrites. You can modify
this behavior using the `skip` or `overwrite` options.

Authentication and bucket identification can be configured either through
environment variables (`BUCKET_PROJECT` for the Google Cloud Project ID and
`BUCKET_NAME` for the bucket name) or by passing them directly as options to the
function. Options provided directly will take precedence over environment
variables.

### Signature

```typescript
async function toBucket(
  file: string,
  destination: string,
  options?: {
    project?: string;
    bucket?: string;
    metadata?: UploadOptions["metadata"];
    overwrite?: boolean;
    skip?: boolean;
  },
): Promise<string>;
```

### Parameters

- **`file`**: - The absolute or relative path to the local file that you want to
  upload.
- **`destination`**: - The desired path and filename for the file within the GCS
  bucket (e.g., `"my-folder/my-uploaded-file.txt"`).
- **`options`**: - Optional settings to customize the upload behavior.
- **`options.project`**: - Your Google Cloud Project ID. If not provided, it
  defaults to the `BUCKET_PROJECT` environment variable.
- **`options.bucket`**: - The name of the Google Cloud Storage bucket. If not
  provided, it defaults to the `BUCKET_NAME` environment variable.
- **`options.metadata`**: - An object containing custom metadata to be
  associated with the uploaded file (e.g., `contentType`, `cacheControl`). This
  is passed directly to the GCS upload options.
- **`options.overwrite`**: - If `true`, an existing file at the `destination`
  path in the bucket will be overwritten. Cannot be used with `skip: true`.
  Defaults to `false`.
- **`options.skip`**: - If `true`, the upload will be skipped if a file with the
  same `destination` path already exists in the bucket. If the local file does
  not exist but the remote file does, the URI of the remote file will be
  returned without an error. Cannot be used with `overwrite: true`. Defaults to
  `false`.

### Returns

A Promise that resolves to the Google Cloud Storage URI of the uploaded file
(e.g., `"gs://your-bucket-name/your-file-path.txt"`).

### Examples

```ts
// Upload a file using environment variables for project and bucket.
// Assuming `BUCKET_PROJECT` and `BUCKET_NAME` are set in your environment.
const uri = await toBucket("./local/file.txt", "remote/file.txt");
console.log(uri); // "gs://my-bucket/remote/file.txt"
```

```ts
// Skip upload if the file already exists in the bucket.
const uriSkip = await toBucket("./local/file.txt", "remote/file.txt", {
  skip: true,
});
console.log(uriSkip); // Returns URI whether file was uploaded or already existed
```

```ts
// If the local file doesn't exist but the remote file does, the URI is returned without error.
// (Assuming "./non-existent.txt" does not exist locally, but "remote/file.txt" exists in the bucket)
const uriNonExistentLocal = await toBucket(
  "./non-existent.txt",
  "remote/file.txt",
  {
    skip: true,
  },
);
console.log(uriNonExistentLocal); // "gs://my-bucket/remote/file.txt"
```

```ts
// Overwrite an existing file in the bucket.
const uriOverwrite = await toBucket("./local/file.txt", "remote/file.txt", {
  overwrite: true,
});
console.log(uriOverwrite); // "gs://my-bucket/remote/file.txt"
```

```ts
// Upload a file with specified project, bucket, and custom metadata.
const uriExplicit = await toBucket("./local/file.txt", "remote/file.txt", {
  project: "my-gcp-project",
  bucket: "my-bucket-name",
  metadata: {
    contentType: "text/plain",
    cacheControl: "public, max-age=3600",
  },
});
console.log(uriExplicit);
```

## unzip

Unzips a given zipped file to a specified output directory. This function
provides a convenient way to extract compressed archives, commonly used for
distributing data or software. It offers an option to delete the original zipped
file after successful extraction, which is useful for cleanup operations.

### Signature

```typescript
function unzip(
  zippedFile: string,
  output: string,
  options?: { deleteZippedFile?: boolean },
): void;
```

### Parameters

- **`zippedFile`**: - The absolute or relative path to the zipped file (`.zip`)
  to be extracted.
- **`output`**: - The absolute or relative path to the directory where the
  contents of the zipped file will be extracted. If the directory does not
  exist, it will be created.
- **`options`**: - Optional settings for the unzip operation.
- **`options.deleteZippedFile`**: - If `true`, the original zipped file will be
  deleted from the filesystem after its contents have been successfully
  extracted. Defaults to `false`.

### Returns

`void`

### Examples

```ts
// Unzip a file to a specified output directory.
unzip("path/to/file.zip", "path/to/output");
console.log("File unzipped successfully.");
```

```ts
// Unzip a file and then delete the original zipped file.
unzip("path/to/another-file.zip", "path/to/another-output", {
  deleteZippedFile: true,
});
console.log("File unzipped and original zipped file deleted.");
```

## updateAnnotationsDW

Updates annotations on a Datawrapper chart. This function allows you to
programmatically add, modify, or remove text and line annotations on your
Datawrapper visualizations, providing precise control over highlighting specific
data points or trends.

This function supports various annotation properties, including position, text
content, styling (bold, italic, color, size), alignment, and connector lines
with customizable arrowheads.

Authentication is handled via an API key, which can be provided through
environment variables (`DATAWRAPPER_KEY`) or explicitly in the options. For
detailed information on Datawrapper annotations and their properties, refer to
the official Datawrapper API documentation.

### Signature

```typescript
async function updateAnnotationsDW(
  chartId: string,
  annotations: {
    x: string;
    y: string;
    text: string;
    bg?: boolean;
    dx?: number;
    dy?: number;
    bold?: boolean;
    size?: number;
    align?: "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br";
    color?: string;
    width?: number;
    italic?: boolean;
    underline?: boolean;
    showMobile?: boolean;
    showDesktop?: boolean;
    mobileFallback?: boolean;
    connectorLine?: {
      type?: "straight" | "curveRight" | "curveLeft";
      circle?: boolean;
      stroke?: 1 | 2 | 3;
      enabled?: boolean;
      arrowHead?: "lines" | "triangle" | false;
      circleStyle?: string;
      circleRadius?: number;
      inheritColor?: boolean;
      targetPadding?: number;
    };
  }[],
  options?: { apiKey?: string; returnResponse?: boolean },
): Promise<void | Response>;
```

### Parameters

- **`chartId`**: - The ID of the Datawrapper chart to update. This ID can be
  found in the Datawrapper URL or dashboard.
- **`annotations`**: - An array of annotation objects. Each object defines a
  single annotation with its properties. Required properties for each annotation
  are `x`, `y`, and `text`.
- **`annotations.x`**: - The x-coordinate of the annotation's position on the
  chart.
- **`annotations.y`**: - The y-coordinate of the annotation's position on the
  chart.
- **`annotations.text`**: - The text content of the annotation.
- **`annotations.bg`**: - If `true`, the annotation text will have a background.
  Defaults to `false`.
- **`annotations.dx`**: - The horizontal offset of the annotation text from its
  `x` coordinate, in pixels. Defaults to `0`.
- **`annotations.dy`**: - The vertical offset of the annotation text from its
  `y` coordinate, in pixels. Defaults to `0`.
- **`annotations.bold`**: - If `true`, the annotation text will be bold.
  Defaults to `false`.
- **`annotations.size`**: - The font size of the annotation text in pixels.
  Defaults to `12`.
- **`annotations.align`**: - The alignment of the annotation text relative to
  its `x` and `y` coordinates. Can be `"tl"` (top-left), `"tc"` (top-center),
  `"tr"` (top-right), `"ml"` (middle-left), `"mc"` (middle-center), `"mr"`
  (middle-right), `"bl"` (bottom-left), `"bc"` (bottom-center), or `"br"`
  (bottom-right). Defaults to `"mr"`.
- **`annotations.color`**: - The color of the annotation text (e.g.,
  `"#FF0000"`, `"red"`). Defaults to `"#8C8C8C"`.
- **`annotations.width`**: - The maximum width of the annotation text box in
  pixels. Text will wrap if it exceeds this width. Defaults to `20`.
- **`annotations.italic`**: - If `true`, the annotation text will be italic.
  Defaults to `false`.
- **`annotations.underline`**: - If `true`, the annotation text will be
  underlined. Defaults to `false`.
- **`annotations.showMobile`**: - If `true`, the annotation will be visible on
  mobile devices. Defaults to `true`.
- **`annotations.showDesktop`**: - If `true`, the annotation will be visible on
  desktop devices. Defaults to `true`.
- **`annotations.mobileFallback`**: - If `true`, the annotation will be
  displayed as a simple text label on mobile if it's too complex. Defaults to
  `false`.
- **`annotations.connectorLine`**: - An object defining the properties of a
  connector line from the annotation to a data point.
- **`annotations.connectorLine.type`**: - The type of the connector line. Can be
  `"straight"`, `"curveRight"`, or `"curveLeft"`. Defaults to `"straight"`.
- **`annotations.connectorLine.circle`**: - If `true`, a circle will be drawn at
  the end of the connector line. Defaults to `false`.
- **`annotations.connectorLine.stroke`**: - The stroke width of the connector
  line. Can be `1`, `2`, or `3`. Defaults to `1`.
- **`annotations.connectorLine.enabled`**: - If `true`, the connector line will
  be drawn. Defaults to `false`.
- **`annotations.connectorLine.arrowHead`**: - The style of the arrowhead. Can
  be `"lines"`, `"triangle"`, or `false` (no arrowhead). Defaults to `"lines"`.
- **`annotations.connectorLine.circleStyle`**: - The style of the circle at the
  end of the connector line. Defaults to `"solid"`.
- **`annotations.connectorLine.circleRadius`**: - The radius of the circle at
  the end of the connector line. Defaults to `10`.
- **`annotations.connectorLine.inheritColor`**: - If `true`, the connector line
  will inherit the annotation's text color. Defaults to `false`.
- **`annotations.connectorLine.targetPadding`**: - The padding between the end
  of the connector line and the target data point. Defaults to `4`.
- **`options.apiKey`**: - The name of the environment variable that stores your
  Datawrapper API key. If not provided, the function defaults to looking for
  `DATAWRAPPER_KEY`.
- **`options.returnResponse`**: - If `true`, the function will return the full
  `Response` object from the Datawrapper API call. This can be useful for
  debugging or for more detailed handling of the API response. Defaults to
  `false`.

### Returns

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a
`Response` object if `returnResponse` is `true`.

### Examples

```ts
// Update annotations on a Datawrapper chart with a simple text annotation and one with an arrow.

const chartID = "myChartId";
const myAnnotations = [
  {
    "x": "2024/08/30 01:52",
    "y": "14496235",
    "text": "This is an annotation!",
  },
  {
    "x": "2024/06/29",
    "y": "15035128",
    "dy": 50,
    "text": "This is also some text, but with an arrow!",
    "connectorLine": {
      "enabled": true,
      "type": "straight",
      "arrowHead": "lines",
    },
    "mobileFallback": false,
  },
];

await updateAnnotationsDW(chartID, myAnnotations);
console.log(`Annotations updated for chart ${chartID}.`);
```

```ts
// If your Datawrapper API key is stored under a different environment variable name (e.g., `DW_API_KEY`).
const customApiKeyChartID = "anotherChartId";
const annotationsForCustomKey = [
  { x: "2024/01/01", y: "100", text: "Custom API Key Test" },
];
await updateAnnotationsDW(customApiKeyChartID, annotationsForCustomKey, {
  apiKey: "DW_API_KEY",
});
console.log(
  `Annotations updated for chart ${customApiKeyChartID} using custom API key.`,
);
```

## updateDataDW

Updates the data of a specified Datawrapper chart, table, or map. This function
is essential for keeping your Datawrapper visualizations dynamic and up-to-date
with the latest information. It supports both CSV data for standard charts and
tables, and JSON data for more complex visualizations like locator maps.

Datawrapper is a powerful tool for creating interactive data visualizations.
This function allows for programmatic updates, which is ideal for automated data
pipelines, dashboards, or applications that require fresh data to be reflected
in visualizations without manual intervention.

Authentication is handled via an API key, which can be provided through
environment variables (`process.env.DATAWRAPPER_KEY`) or explicitly in the
options. The `Content-Type` header for the API request is automatically set
based on whether the data is CSV or JSON.

### Signature

```typescript
async function updateDataDW(
  chartId: string,
  data: string,
  options?: { apiKey?: string; returnResponse?: boolean },
): Promise<void | Response>;
```

### Parameters

- **`chartId`**: - The unique ID of the Datawrapper chart, table, or map to
  update. This ID can be found in the Datawrapper URL or dashboard.
- **`data`**: - The data to update the chart, table, or map with. For standard
  charts and tables, this should be a CSV formatted string. For locator maps,
  this should be a JSON string representing the map's data (e.g., markers,
  areas).
- **`options`**: - Optional parameters to configure the data update process.
- **`options.apiKey`**: - The name of the environment variable that stores your
  Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function
  defaults to looking for `process.env.DATAWRAPPER_KEY`.
- **`options.returnResponse`**: - If `true`, the function will return the full
  `Response` object from the Datawrapper API call. This can be useful for
  debugging or for more detailed handling of the API response. Defaults to
  `false`.

### Returns

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a
`Response` object if `returnResponse` is `true`.

### Throws

- **`Error`**: If the API key is not found, if the Datawrapper API returns an
  error status (e.g., invalid chart ID, authentication failure, malformed data),
  or if there's a network issue.

### Examples

```ts
// Update the data of a Datawrapper chart or table with CSV formatted data.
import { dataAsCsv, updateDataDW } from "journalism";

const chartID = "myChartId";
const data = [
  { salary: 75000, hireDate: new Date("2022-12-15") },
  { salary: 80000, hireDate: new Date("2023-01-20") },
];
const dataForChart = dataAsCsv(data);

await updateDataDW(chartID, dataForChart);
console.log(`Data updated for chart ${chartID}.`);
```

```ts
// Update the data of a Datawrapper locator map with GeoJSON data.

const mapID = "myMapId";
const geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              11.127454320325711,
              20.34856592751224,
            ],
            [
              11.127454320325711,
              -13.781306861158996,
            ],
            [
              55.68071875381875,
              -13.781306861158996,
            ],
            [
              55.68071875381875,
              20.34856592751224,
            ],
            [
              11.127454320325711,
              20.34856592751224,
            ],
          ],
        ],
        "type": "Polygon",
      },
    },
  ],
};

const dataForMap = {
  "markers": [
    {
      "id": "m1",
      "type": "area",
      "visible": true,
      "exactShape": true,
      "fill": true,
      "stroke": true,
      "properties": {
        "fill": "#15607a",
        "fill-opacity": 0.2,
        "stroke": "#15607a",
        "stroke-width": 1,
        "stroke-opacity": 1,
        "stroke-dasharray": "100000",
        "pattern": "solid",
        "pattern-line-width": 2,
        "pattern-line-gap": 2,
      },
      "feature": geojson,
    },
  ],
};

await updateDataDW(mapID, JSON.stringify(dataForMap));
console.log(`Data updated for map ${mapID}.`);
```

```ts
// If your API key is stored under a different name in process.env, use the options.
const chartIDCustomKey = "anotherChartId";
const dataForCustomKey = "col1,col2\nval1,val2";
await updateDataDW(chartIDCustomKey, dataForCustomKey, { apiKey: "DW_KEY" });
console.log(`Data updated for chart ${chartIDCustomKey} using custom API key.`);
```

```ts
// Attempting to update data without a configured API key will throw an error.
try {
  await updateDataDW("someChartId", "data", { apiKey: "NON_EXISTENT_KEY" });
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: process.env.NON_EXISTENT_KEY is undefined or ''"
}
```

## updateNotesDW

Updates the notes field for a specified Datawrapper chart, table, or map. This
function provides a programmatic way to add or modify descriptive text
associated with your Datawrapper visualizations, which can include data sources,
methodologies, or any other relevant context.

Authentication is handled via an API key, which can be provided through
environment variables (`DATAWRAPPER_KEY`) or explicitly in the options.

### Signature

```typescript
async function updateNotesDW(
  chartId: string,
  note: string,
  options?: { apiKey?: string; returnResponse?: boolean },
): Promise<void | Response>;
```

### Parameters

- **`chartId`**: - The unique ID of the Datawrapper chart, table, or map to
  update. This ID can be found in the Datawrapper URL or dashboard.
- **`note`**: - The string content to update the chart's notes field with.
- **`options`**: - Optional parameters to configure the notes update process.
- **`options.apiKey`**: - The name of the environment variable that stores your
  Datawrapper API key (e.g., `"DATAWRAPPER_KEY"`). If not provided, the function
  defaults to looking for the `DATAWRAPPER_KEY` environment variable.
- **`options.returnResponse`**: - If `true`, the function will return the full
  `Response` object from the Datawrapper API call. This can be useful for
  debugging or for more detailed handling of the API response. Defaults to
  `false`.

### Returns

A Promise that resolves to `void` if `returnResponse` is `false` (default), or a
`Response` object if `returnResponse` is `true`.

### Examples

```ts
// Update the notes field of a Datawrapper chart with a simple text string.
import { formatDate, updateNotesDW } from "journalism";

const chartID = "myChartId";
const dateString = formatDate(new Date(), "Month DD, YYYY, at HH:MM period", {
  abbreviations: true,
});
const note = `This chart was last updated on ${dateString}`;

await updateNotesDW(chartID, note);
console.log(`Notes updated for chart ${chartID}.`);
```

```ts
// If your API key is stored under a different name in process.env (e.g., `DW_KEY`).
const customApiKeyChartID = "anotherChartId";
const customNote = "This is a note using a custom API key.";
await updateNotesDW(customApiKeyChartID, customNote, { apiKey: "DW_KEY" });
console.log(
  `Notes updated for chart ${customApiKeyChartID} using custom API key.`,
);
```

## variableMortgagePayments

Calculates and returns a detailed schedule of variable-rate monthly mortgage
payments (VRM). This function models a Variable Rate Mortgage where the payment
amount stays FIXED for the term, but rate changes affect how much goes to
interest vs. principal. If rates rise too high, payments may not cover interest,
causing negative amortization (balance increases).

### Signature

```typescript
function variableMortgagePayments(
  mortgageAmount: number,
  rates: number[],
  term: number,
  amortizationPeriod: number,
  options?: {
    id?: string;
    decimals?: number;
    annualCompounding?: number;
    debug?: boolean;
  },
): {
  id?: string | undefined;
  paymentId: number;
  payment: number;
  interest: number;
  capital: number;
  balance: number;
  amountPaid: number;
  interestPaid: number;
  capitalPaid: number;
  rate: number;
}[];
```

### Parameters

- **`mortgageAmount`**: - The total amount of the mortgage loan.
- **`rates`**: - An array of annual interest rates (e.g.,
  `[6.00, 6.00, 5.50, 5.50, ...]` for rates in percentages). The array must
  contain at least as many rates as there are payments in the term. Each element
  corresponds to the rate for that payment period (0-based index).
- **`term`**: - The term of the mortgage in years. This is the length of the
  current mortgage contract.
- **`amortizationPeriod`**: - The total amortization period of the mortgage in
  years. This is the total time it will take to pay off the mortgage.
- **`options`**: - Additional options for customizing the mortgage calculation
  and output.
- **`options.id`**: - An optional string ID to be added to each payment object
  in the returned array. Useful for tracking payments related to a specific
  mortgage.
- **`options.decimals`**: - The number of decimal places to round the financial
  values (payment, interest, capital, balance) to. Defaults to `2`.
- **`options.annualCompounding`**: - The number of times the mortgage interest
  should be compounded per year. Defaults to `12` (monthly compounding). Set to
  `2` for semi-annual compounding as is standard in Canada.
- **`options.debug`**: - If `true`, enables debug logging to the console,
  providing additional insights into the calculation process. Defaults to
  `false`.

### Returns

An array of objects, where each object represents a single mortgage payment and
contains:

- `paymentId`: A 0-based index for the payment.
- `payment`: The total amount of the payment (fixed for the term).
- `interest`: The portion that goes towards interest (varies with rate changes).
- `capital`: The portion that goes towards the principal (can be negative during
  negative amortization).
- `balance`: The remaining mortgage balance after the payment (can increase if
  interest exceeds payment).
- `amountPaid`: The cumulative total amount paid so far.
- `interestPaid`: The cumulative total interest paid so far.
- `capitalPaid`: The cumulative total capital reimbursed so far (can be
  negative).
- `rate`: The annual interest rate in effect for this payment.
- `id` (optional): The ID provided in `options.id`.

### Throws

- **`Error`**: If the `amortizationPeriod` is less than the `term`, as this is
  an invalid mortgage configuration.
- **`Error`**: If the `rates` array does not contain enough rates for all
  payments in the term.

### Examples

```ts
// VRM: Payment stays fixed, but rate changes affect interest/principal split
// If rates rise high enough, balance can increase (negative amortization)
const rates = [
  ...Array(12).fill(6), // Months 0-11 at 6%
  ...Array(12).fill(5.5), // Months 12-23 at 5.5% (more goes to principal)
  ...Array(36).fill(7.5), // Months 24-59 at 7.5% (might trigger negative amortization)
];
const payments = variableMortgagePayments(250_000, rates, 5, 25);
console.log(payments[0]); // Payment amount set based on initial rate
console.log(payments[12]); // Same payment, but less interest (rate dropped)
console.log(payments[24]); // Same payment, but more interest (rate increased)
```

## zip

Compresses one or more files or an entire folder into a single zip archive. This
function is useful for bundling multiple assets, preparing data for transfer, or
creating backups.

You can specify individual files to be added to the archive, or provide a path
to a directory, in which case all its contents will be compressed. The function
automatically creates the necessary directory structure for the output zip file
if it doesn't already exist.

### Signature

```typescript
function zip(files: string | string[], zipFile: string): void;
```

### Parameters

- **`files`**: - A string representing the path to a folder, or an array of
  strings representing paths to individual files. These are the items to be
  included in the zip archive.
- **`zipFile`**: - The absolute or relative path, including the filename and
  `.zip` extension, where the created zip archive will be saved (e.g.,
  `"./archives/my-data.zip"`).

### Returns

`void`

### Examples

```ts
// Compressing multiple files into a zip archive.
zip(["file1.txt", "file2.txt"], "archive.zip");
console.log("Files zipped successfully.");

// Compressing a folder into a zip archive.
zip("path/to/folder", "folder-archive.zip");
console.log("Folder zipped successfully.");
```
