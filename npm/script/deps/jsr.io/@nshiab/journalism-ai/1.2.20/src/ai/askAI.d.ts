/**
 * Interacts with a Large Language Model (LLM) to perform a wide range of tasks, from answering questions to analyzing multimedia content. This function serves as a versatile interface to various AI models, including Google's Gemini and local models via Ollama.
 *
 * The function is designed to be highly configurable, allowing you to specify the AI model, credentials, and various input types such as text, images, audio, video, and even web pages. It also includes features for caching responses to improve performance and reduce costs, as well as for testing and cleaning the AI's output.
 *
 * **Authentication**:
 * The function can be authenticated using environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or by passing credentials directly in the `options` object. Options will always take precedence over environment variables.
 *
 * **Local Models**:
 * To use a local model with Ollama, set the `OLLAMA` environment variable to `true` and ensure that Ollama is running on your machine. You will also need to specify the model name using the `AI_MODEL` environment variable or the `model` option. If you want your Ollama instance to be used, you can pass an instance of the `Ollama` class as the `ollama` option.
 *
 * **Caching**:
 * Caching is a powerful feature that saves the AI's response to a local directory (`.journalism-cache`). When the same request is made again, the cached response is returned instantly, saving time and API costs. To enable caching, set the `cache` option to `true`.
 *
 * **File Handling**:
 * The function can process both local files and files stored in Google Cloud Storage (GCS). Simply provide the file path or the `gs://` URL. Note that Ollama only supports local files.
 *
 * **Web Search Grounding**:
 * For Gemini models, you can enable web search grounding by setting `webSearch` to `true`. This allows the AI to search the web for current information and ground its responses in real-time data. Note that this feature incurs additional API costs.
 *
 * Temperature is set at 0 by default to encourage more deterministic responses. Safety filters are enabled by default (default is `true`), but they are disabled by default when using Vertex AI (default is `false`). Users can always override this default with the `safetyEnabled` option.
 *
 * @example
 * ```ts
 * // Basic usage: Get a simple text response from the AI.
 * // Assumes credentials are set in environment variables.
 * const capital = await askAI("What is the capital of France?");
 * console.log(capital); // "Paris"
 * ```
 *
 * @example
 * ```ts
 * // Enable caching to save the response and avoid repeated API calls.
 * // A .journalism-cache directory will be created.
 * const cachedCapital = await askAI("What is the capital of France?", { cache: true });
 * ```
 *
 * @example
 * ```ts
 * // Pass API credentials directly as options.
 * const response = await askAI("What is the capital of France?", {
 *   apiKey: "your_api_key",
 *   model: "gemini-1.5-flash",
 * });
 *
 * // Use Vertex AI for authentication.
 * const vertexResponse = await askAI("What is the capital of France?", {
 *   vertex: true,
 *   project: "your_project_id",
 *   location: "us-central1",
 * });
 * ```
 *
 * @example
 * ```ts
 * // Combine web search with other features for fact-checking.
 * const factCheck = await askAI(
 *   `Based on current web sources, verify the following claim and provide supporting evidence: "Renewable energy now accounts for over 30% of global electricity generation."`,
 *   {
 *     webSearch: true,
 *   },
 * );
 * console.log(factCheck);
 * ```
 *
 * @example
 * ```ts
 * // Return a response that conforms to a specific JSON schema.
 * import * as z from "zod";
 *
 * const schema = z.toJSONSchema(
 *   z.array(z.object({
 *     name: z.string(),
 *     age: z.number(),
 *     gender: z.enum(["man", "woman"]),
 *   })),
 * );
 *
 * await askAI("Give me 10 random people.", {
 *   verbose: true,
 *   cache: true,
 *   schemaJson: schema,
 * });
 * ```
 *
 * @example
 * ```ts
 * // Scrape and analyze HTML content from a URL.
 * const orders = await askAI(
 *   `From the following HTML, extract the executive order titles, their dates (in yyyy-mm-dd format), and their URLs. Return the data as a JSON array of objects.`,
 *   {
 *     HTMLFrom: "https://www.whitehouse.gov/presidential-actions/executive-orders/",
 *     returnJson: true,
 *   },
 * );
 * console.table(orders);
 *
 * @example
 * ```ts
 * // Analyze a local image file.
 * const personInfo = await askAI(
 *   `Analyze the provided image and return a JSON object with the following details:
 *   - name: The name of the person if they are a recognizable public figure.
 *   - description: A brief description of the image.
 *   - isPolitician: A boolean indicating if the person is a politician.`,
 *   {
 *     image: "./path/to/your_image.jpg",
 *     returnJson: true,
 *   },
 * );
 * console.log(personInfo);
 *
 * // Analyze an image from Google Cloud Storage.
 * const gcsImageInfo = await askAI(
 *   `Describe the scene in this image.`,
 *   {
 *     image: "gs://your-bucket/your_image.jpg",
 *   },
 * );
 * console.log(gcsImageInfo);
 *
 * // Transcribe an audio file.
 * const speechDetails = await askAI(
 *   `Transcribe the speech in this audio file. If possible, identify the speaker and the approximate date of the speech.`,
 *   {
 *     audio: "./path/to/speech.mp3",
 *     returnJson: true,
 *   },
 * );
 * console.log(speechDetails);
 *
 * // Analyze a video file.
 * const videoAnalysis = await askAI(
 *   `Create a timeline of events from this video. For each event, provide a timestamp, a short description, and identify the main people involved.`,
 *   {
 *     video: "./path/to/your_video.mp4",
 *     returnJson: true,
 *   },
 * );
 * console.table(videoAnalysis);
 * ```
 * @example
 * ```ts
 * // Extract structured data from a PDF document.
 * const caseSummary = await askAI(
 *   `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
 *   {
 *     pdf: "./path/to/decision.pdf",
 *     returnJson: true,
 *   },
 * );
 * console.table(caseSummary);
 *
 * // Summarize a local text file.
 * const summary = await askAI(
 *   `Analyze the content of this CSV file and provide a summary of its key findings.`,
 *   {
 *     text: "./path/to/data.csv",
 *   },
 * );
 * console.log(summary);
 * ```
 * @example
 * ```ts
 * // Process multiple files of different types in a single call.
 * const multiFileSummary = await askAI(
 *   `Provide a brief summary for each file I've provided.`,
 *   {
 *     HTMLFrom: "https://www.un.org/en/global-issues",
 *     audio: "path/to/speech.mp3",
 *     image: "path/to/protest.jpg",
 *     video: "path/to/event.mp4",
 *     pdf: "path/to/report.pdf",
 *     text: "path/to/notes.txt",
 *     returnJson: true,
 *   },
 * );
 * console.log(multiFileSummary);
 *
 * // Use a clean and test function to process and validate the AI's output.
 * const europeanCountries = await askAI(
 *   `Give me a list of three countries in Northern Europe.`,
 *   {
 *     returnJson: true,
 *     clean: (response: unknown) => {
 *       // Example: Trim whitespace from each country name in the array
 *       if (Array.isArray(response)) {
 *         return response.map(item => typeof item === 'string' ? item.trim() : item);
 *       }
 *       return response;
 *     },
 *     test: (response) => {
 *       if (!Array.isArray(response)) {
 *         throw new Error("Response is not an array.");
 *       }
 *       if (response.length !== 3) {
 *         throw new Error("Response does not contain exactly three items.");
 *       }
 *       console.log("Test passed: The response is a valid list of three countries.");
 *     },
 *   },
 * );
 * console.log(europeanCountries);
 * ```
 * @example
 * ```ts
 * // Track cumulative metrics across multiple AI requests.
 * const metrics = {
 *   totalCost: 0,
 *   totalInputTokens: 0,
 *   totalOutputTokens: 0,
 *   totalRequests: 0,
 * };
 *
 * await askAI("What is the capital of France?", { metrics });
 * await askAI("What is the population of Paris?", { metrics });
 *
 * console.log("Total cost:", metrics.totalCost);
 * console.log("Total input tokens:", metrics.totalInputTokens);
 * console.log("Total output tokens:", metrics.totalOutputTokens);
 * console.log("Total requests:", metrics.totalRequests);
 * ```
 * @example
 * ```ts
 * // Get detailed metadata including tokens, cost, and duration.
 * const result = await askAI("What is the capital of France?", {
 *   detailedResponse: true
 * });
 *
 * console.log("Response:", result.response);
 * console.log("Model:", result.model);
 * // Result includes: response, prompt, promptTokenCount, outputTokenCount, totalTokens,
 * // tokensPerSecond, estimatedCost (for Google models), durationMs, model, thoughts, and more
 *
 * // Access specific fields
 * console.log(`Used ${result.totalTokens} tokens in ${result.durationMs}ms`);
 * if (result.estimatedCost) {
 *   console.log(`Estimated cost: $${result.estimatedCost}`);
 * }
 * ```
 * @param prompt - The primary text input for the AI model.
 * @param options - A comprehensive set of options.
 *   @param options.systemPrompt - An optional system prompt to provide additional context or instructions to the AI model. This can help guide the AI's response in a specific direction or tone.
 *   @param options.model - The specific AI model to use (e.g., 'gemini-1.5-flash'). Defaults to the `AI_MODEL` environment variable.
 *   @param options.apiKey - Your API key for the AI service. Defaults to the `AI_KEY` environment variable.
 *   @param options.vertex - Set to `true` to use Vertex AI for authentication. Auto-enables if `AI_PROJECT` and `AI_LOCATION` are set.
 *   @param options.project - Your Google Cloud project ID. Defaults to the `AI_PROJECT` environment variable.
 *   @param options.location - The Google Cloud location for your project. Defaults to the `AI_LOCATION` environment variable.
 *   @param options.ollama - Set to `true` to use a local Ollama model. Defaults to the `OLLAMA` environment variable. If you want your Ollama instance to be used, you can pass it here too.
 *   @param options.webSearch - (Gemini only) If `true`, enables web search grounding for the AI's responses. Be careful of extra costs. Defaults to `false`.
 *   @param options.HTMLFrom - A URL or an array of URLs to scrape HTML content from. The content is appended to the prompt. JavaScript is not executed.
 *   @param options.screenshotFrom - (Deprecated) A URL or an array of URLs to take a screenshot from for analysis. This feature has been removed. Use the `image` option instead.
 *   @param options.image - A path or GCS URL (or an array of them) to an image file.
 *   @param options.video - A path or GCS URL (or an array of them) to a video file.
 *   @param options.audio - A path or GCS URL (or an array of them) to an audio file.
 *   @param options.pdf - A path or GCS URL (or an array of them) to a PDF file.
 *   @param options.text - A path or GCS URL (or an array of them) to a text file.
 *   @param options.returnJson - If `true`, instructs the AI to return a JSON object. Defaults to `false`.
 *   @param options.parseJson - If `true`, automatically parses the AI's response as JSON. Defaults to `true` if `returnJson` is `true`, otherwise `false`.
 *   @param options.schemaJson - A Zod JSON schema object to enforce structured output. When provided, the AI will return data that conforms to the specified schema. Automatically enables `returnJson` and `parseJson`.
 *   @param options.cache - If `true`, caches the response locally in a `.journalism-cache` directory. Defaults to `false`.
 *   @param options.verbose - If `true`, enables detailed logging, including token usage and estimated costs. Defaults to `false`.
 *   @param options.clean - A function to process and clean the AI's response before it is returned or tested. This function is called after JSON parsing (if `parseJson` is `true`). The response parameter will be the parsed JSON object if `parseJson` is true, or a string otherwise.
 *   @param options.test - A function or an array of functions to validate the AI's response before it's returned.
 *   @param options.contextWindow - An option to specify the context window size for Ollama models. By default, Ollama sets this depending on the model, which can be lower than the actual maximum context window size of the model.
 *   @param options.thinkingBudget - Sets the reasoning token budget: 0 to disable (default, though some models may reason regardless), -1 for a dynamic budget, or > 0 for a fixed budget. For Ollama models, any non-zero value simply enables reasoning, ignoring the specific budget amount. Note: `thinkingLevel` takes precedence over `thinkingBudget` if both are provided.
 *   @param options.thinkingLevel - Sets the thinking level for reasoning: "minimal", "low", "medium", or "high", which some models expect instead of `thinkingBudget`. Takes precedence over `thinkingBudget` if both are provided. For Ollama models, any value enables reasoning.
 *   @param options.includeThoughts - If `true`, includes the AI's reasoning thoughts in the output when using a thinking budget or thinking level. Defaults to `false`.
 *   @param options.temperature - Sets the temperature for response generation, controlling the randomness of the output. A value of 0 (default) makes the output more deterministic, while higher values (e.g., 0.7) increase creativity and variability.`.
 *   @param options.safetyEnabled - Controls whether safety filters are enabled. If set to `true`, filters are active; if `false`, they are disabled. By default, this is `false` when using Vertex AI and `true` otherwise. This setting can be explicitly overridden for any model.
 *   @param options.detailedResponse - If `true`, returns an object containing both the response and metadata (tokens, cost, duration, etc.). Defaults to `false`.
 *   @param options.geminiParameters - Additional parameters to pass to the Gemini `generateContentStream` method. These will be merged with the default parameters, allowing you to override or extend the configuration (e.g., custom safety settings, generation config, system instructions).
 *   @param options.ollamaParameters - Additional parameters to pass to the Ollama `chat` method. These will be merged with the default parameters, allowing you to override or extend the configuration (e.g., custom options, keep_alive settings).
 *   @param options.metrics - An object to track cumulative metrics across multiple AI requests. Pass an object with `totalCost`, `totalInputTokens`, `totalOutputTokens`, and `totalRequests` properties (all initialized to 0). The function will update these values after each request. Note: `totalCost` is only calculated for Google GenAI models, not for Ollama.
 * @return {Promise<unknown>} A Promise that resolves to the AI's response.
 *
 * @category AI
 */
export default function askAI(prompt: string, options: {
    systemPrompt?: string;
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    ollama?: boolean | any;
    webSearch?: boolean;
    HTMLFrom?: string | string[];
    /** @deprecated Use the `image` option instead. */
    screenshotFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    text?: string | string[];
    returnJson?: boolean;
    parseJson?: boolean;
    schemaJson?: unknown;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
    clean?: (response: unknown) => unknown;
    contextWindow?: number;
    thinkingBudget?: number;
    thinkingLevel?: "minimal" | "low" | "medium" | "high";
    includeThoughts?: boolean;
    temperature?: number;
    safetyEnabled?: boolean;
    detailedResponse: true;
    geminiParameters?: any;
    ollamaParameters?: any;
    metrics?: {
        totalCost: number;
        totalInputTokens: number;
        totalOutputTokens: number;
        totalRequests: number;
    };
}): Promise<{
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
}>;
/**
 * Interacts with a Large Language Model (LLM) to perform a wide range of tasks, from answering questions to analyzing multimedia content. This function serves as a versatile interface to various AI models, including Google's Gemini and local models via Ollama.
 *
 * The function is designed to be highly configurable, allowing you to specify the AI model, credentials, and various input types such as text, images, audio, video, and even web pages. It also includes features for caching responses to improve performance and reduce costs, as well as for testing and cleaning the AI's output.
 *
 * **Authentication**:
 * The function can be authenticated using environment variables (`AI_KEY`, `AI_PROJECT`, `AI_LOCATION`, `AI_MODEL`) or by passing credentials directly in the `options` object. Options will always take precedence over environment variables.
 *
 * **Local Models**:
 * To use a local model with Ollama, set the `OLLAMA` environment variable to `true` and ensure that Ollama is running on your machine. You will also need to specify the model name using the `AI_MODEL` environment variable or the `model` option. If you want your Ollama instance to be used, you can pass an instance of the `Ollama` class as the `ollama` option.
 *
 * **Caching**:
 * Caching is a powerful feature that saves the AI's response to a local directory (`.journalism-cache`). When the same request is made again, the cached response is returned instantly, saving time and API costs. To enable caching, set the `cache` option to `true`.
 *
 * **File Handling**:
 * The function can process both local files and files stored in Google Cloud Storage (GCS). Simply provide the file path or the `gs://` URL. Note that Ollama only supports local files.
 *
 * **Web Search Grounding**:
 * For Gemini models, you can enable web search grounding by setting `webSearch` to `true`. This allows the AI to search the web for current information and ground its responses in real-time data. Note that this feature incurs additional API costs.
 *
 * Temperature is set at 0 by default to encourage more deterministic responses. Safety filters are enabled by default (default is `true`), but they are disabled by default when using Vertex AI (default is `false`). Users can always override this default with the `safetyEnabled` option.
 *
 * @example
 * ```ts
 * // Basic usage: Get a simple text response from the AI.
 * // Assumes credentials are set in environment variables.
 * const capital = await askAI("What is the capital of France?");
 * console.log(capital); // "Paris"
 * ```
 *
 * @example
 * ```ts
 * // Enable caching to save the response and avoid repeated API calls.
 * // A .journalism-cache directory will be created.
 * const cachedCapital = await askAI("What is the capital of France?", { cache: true });
 * ```
 *
 * @example
 * ```ts
 * // Pass API credentials directly as options.
 * const response = await askAI("What is the capital of France?", {
 *   apiKey: "your_api_key",
 *   model: "gemini-1.5-flash",
 * });
 *
 * // Use Vertex AI for authentication.
 * const vertexResponse = await askAI("What is the capital of France?", {
 *   vertex: true,
 *   project: "your_project_id",
 *   location: "us-central1",
 * });
 * ```
 *
 * @example
 * ```ts
 * // Combine web search with other features for fact-checking.
 * const factCheck = await askAI(
 *   `Based on current web sources, verify the following claim and provide supporting evidence: "Renewable energy now accounts for over 30% of global electricity generation."`,
 *   {
 *     webSearch: true,
 *   },
 * );
 * console.log(factCheck);
 * ```
 *
 * @example
 * ```ts
 * // Return a response that conforms to a specific JSON schema.
 * import * as z from "zod";
 *
 * const schema = z.toJSONSchema(
 *   z.array(z.object({
 *     name: z.string(),
 *     age: z.number(),
 *     gender: z.enum(["man", "woman"]),
 *   })),
 * );
 *
 * await askAI("Give me 10 random people.", {
 *   verbose: true,
 *   cache: true,
 *   schemaJson: schema,
 * });
 * ```
 *
 * @example
 * ```ts
 * // Scrape and analyze HTML content from a URL.
 * const orders = await askAI(
 *   `From the following HTML, extract the executive order titles, their dates (in yyyy-mm-dd format), and their URLs. Return the data as a JSON array of objects.`,
 *   {
 *     HTMLFrom: "https://www.whitehouse.gov/presidential-actions/executive-orders/",
 *     returnJson: true,
 *   },
 * );
 * console.table(orders);
 *
 * @example
 * ```ts
 * // Analyze a local image file.
 * const personInfo = await askAI(
 *   `Analyze the provided image and return a JSON object with the following details:
 *   - name: The name of the person if they are a recognizable public figure.
 *   - description: A brief description of the image.
 *   - isPolitician: A boolean indicating if the person is a politician.`,
 *   {
 *     image: "./path/to/your_image.jpg",
 *     returnJson: true,
 *   },
 * );
 * console.log(personInfo);
 *
 * // Analyze an image from Google Cloud Storage.
 * const gcsImageInfo = await askAI(
 *   `Describe the scene in this image.`,
 *   {
 *     image: "gs://your-bucket/your_image.jpg",
 *   },
 * );
 * console.log(gcsImageInfo);
 *
 * // Transcribe an audio file.
 * const speechDetails = await askAI(
 *   `Transcribe the speech in this audio file. If possible, identify the speaker and the approximate date of the speech.`,
 *   {
 *     audio: "./path/to/speech.mp3",
 *     returnJson: true,
 *   },
 * );
 * console.log(speechDetails);
 *
 * // Analyze a video file.
 * const videoAnalysis = await askAI(
 *   `Create a timeline of events from this video. For each event, provide a timestamp, a short description, and identify the main people involved.`,
 *   {
 *     video: "./path/to/your_video.mp4",
 *     returnJson: true,
 *   },
 * );
 * console.table(videoAnalysis);
 * ```
 * @example
 * ```ts
 * // Extract structured data from a PDF document.
 * const caseSummary = await askAI(
 *   `This is a Supreme Court decision. Provide a list of objects with a date and a brief summary for each important event of the case's merits, sorted chronologically.`,
 *   {
 *     pdf: "./path/to/decision.pdf",
 *     returnJson: true,
 *   },
 * );
 * console.table(caseSummary);
 *
 * // Summarize a local text file.
 * const summary = await askAI(
 *   `Analyze the content of this CSV file and provide a summary of its key findings.`,
 *   {
 *     text: "./path/to/data.csv",
 *   },
 * );
 * console.log(summary);
 * ```
 * @example
 * ```ts
 * // Process multiple files of different types in a single call.
 * const multiFileSummary = await askAI(
 *   `Provide a brief summary for each file I've provided.`,
 *   {
 *     HTMLFrom: "https://www.un.org/en/global-issues",
 *     audio: "path/to/speech.mp3",
 *     image: "path/to/protest.jpg",
 *     video: "path/to/event.mp4",
 *     pdf: "path/to/report.pdf",
 *     text: "path/to/notes.txt",
 *     returnJson: true,
 *   },
 * );
 * console.log(multiFileSummary);
 *
 * // Use a clean and test function to process and validate the AI's output.
 * const europeanCountries = await askAI(
 *   `Give me a list of three countries in Northern Europe.`,
 *   {
 *     returnJson: true,
 *     clean: (response: unknown) => {
 *       // Example: Trim whitespace from each country name in the array
 *       if (Array.isArray(response)) {
 *         return response.map(item => typeof item === 'string' ? item.trim() : item);
 *       }
 *       return response;
 *     },
 *     test: (response) => {
 *       if (!Array.isArray(response)) {
 *         throw new Error("Response is not an array.");
 *       }
 *       if (response.length !== 3) {
 *         throw new Error("Response does not contain exactly three items.");
 *       }
 *       console.log("Test passed: The response is a valid list of three countries.");
 *     },
 *   },
 * );
 * console.log(europeanCountries);
 * ```
 * @example
 * ```ts
 * // Track cumulative metrics across multiple AI requests.
 * const metrics = {
 *   totalCost: 0,
 *   totalInputTokens: 0,
 *   totalOutputTokens: 0,
 *   totalRequests: 0,
 * };
 *
 * await askAI("What is the capital of France?", { metrics });
 * await askAI("What is the population of Paris?", { metrics });
 *
 * console.log("Total cost:", metrics.totalCost);
 * console.log("Total input tokens:", metrics.totalInputTokens);
 * console.log("Total output tokens:", metrics.totalOutputTokens);
 * console.log("Total requests:", metrics.totalRequests);
 * ```
 * @example
 * ```ts
 * // Get detailed metadata including tokens, cost, and duration.
 * const result = await askAI("What is the capital of France?", {
 *   detailedResponse: true
 * });
 *
 * console.log("Response:", result.response);
 * console.log("Model:", result.model);
 * // Result includes: response, prompt, promptTokenCount, outputTokenCount, totalTokens,
 * // tokensPerSecond, estimatedCost (for Google models), durationMs, model, thoughts, and more
 *
 * // Access specific fields
 * console.log(`Used ${result.totalTokens} tokens in ${result.durationMs}ms`);
 * if (result.estimatedCost) {
 *   console.log(`Estimated cost: $${result.estimatedCost}`);
 * }
 * ```
 * @param prompt - The primary text input for the AI model.
 * @param options - A comprehensive set of options.
 *   @param options.systemPrompt - An optional system prompt to provide additional context or instructions to the AI model. This can help guide the AI's response in a specific direction or tone.
 *   @param options.model - The specific AI model to use (e.g., 'gemini-1.5-flash'). Defaults to the `AI_MODEL` environment variable.
 *   @param options.apiKey - Your API key for the AI service. Defaults to the `AI_KEY` environment variable.
 *   @param options.vertex - Set to `true` to use Vertex AI for authentication. Auto-enables if `AI_PROJECT` and `AI_LOCATION` are set.
 *   @param options.project - Your Google Cloud project ID. Defaults to the `AI_PROJECT` environment variable.
 *   @param options.location - The Google Cloud location for your project. Defaults to the `AI_LOCATION` environment variable.
 *   @param options.ollama - Set to `true` to use a local Ollama model. Defaults to the `OLLAMA` environment variable. If you want your Ollama instance to be used, you can pass it here too.
 *   @param options.webSearch - (Gemini only) If `true`, enables web search grounding for the AI's responses. Be careful of extra costs. Defaults to `false`.
 *   @param options.HTMLFrom - A URL or an array of URLs to scrape HTML content from. The content is appended to the prompt. JavaScript is not executed.
 *   @param options.screenshotFrom - (Deprecated) A URL or an array of URLs to take a screenshot from for analysis. This feature has been removed. Use the `image` option instead.
 *   @param options.image - A path or GCS URL (or an array of them) to an image file.
 *   @param options.video - A path or GCS URL (or an array of them) to a video file.
 *   @param options.audio - A path or GCS URL (or an array of them) to an audio file.
 *   @param options.pdf - A path or GCS URL (or an array of them) to a PDF file.
 *   @param options.text - A path or GCS URL (or an array of them) to a text file.
 *   @param options.returnJson - If `true`, instructs the AI to return a JSON object. Defaults to `false`.
 *   @param options.parseJson - If `true`, automatically parses the AI's response as JSON. Defaults to `true` if `returnJson` is `true`, otherwise `false`.
 *   @param options.schemaJson - A Zod JSON schema object to enforce structured output. When provided, the AI will return data that conforms to the specified schema. Automatically enables `returnJson` and `parseJson`.
 *   @param options.cache - If `true`, caches the response locally in a `.journalism-cache` directory. Defaults to `false`.
 *   @param options.verbose - If `true`, enables detailed logging, including token usage and estimated costs. Defaults to `false`.
 *   @param options.clean - A function to process and clean the AI's response before it is returned or tested. This function is called after JSON parsing (if `parseJson` is `true`). The response parameter will be the parsed JSON object if `parseJson` is true, or a string otherwise.
 *   @param options.test - A function or an array of functions to validate the AI's response before it's returned.
 *   @param options.contextWindow - An option to specify the context window size for Ollama models. By default, Ollama sets this depending on the model, which can be lower than the actual maximum context window size of the model.
 *   @param options.thinkingBudget - Sets the reasoning token budget: 0 to disable (default, though some models may reason regardless), -1 for a dynamic budget, or > 0 for a fixed budget. For Ollama models, any non-zero value simply enables reasoning, ignoring the specific budget amount. Note: `thinkingLevel` takes precedence over `thinkingBudget` if both are provided.
 *   @param options.thinkingLevel - Sets the thinking level for reasoning: "minimal", "low", "medium", or "high", which some models expect instead of `thinkingBudget`. Takes precedence over `thinkingBudget` if both are provided. For Ollama models, any value enables reasoning.
 *   @param options.includeThoughts - If `true`, includes the AI's reasoning thoughts in the output when using a thinking budget or thinking level. Defaults to `false`.
 *   @param options.temperature - Sets the temperature for response generation, controlling the randomness of the output. A value of 0 (default) makes the output more deterministic, while higher values (e.g., 0.7) increase creativity and variability.`.
 *   @param options.safetyEnabled - Controls whether safety filters are enabled. If set to `true`, filters are active; if `false`, they are disabled. By default, this is `false` when using Vertex AI and `true` otherwise. This setting can be explicitly overridden for any model.
 *   @param options.detailedResponse - If `true`, returns an object containing both the response and metadata (tokens, cost, duration, etc.). Defaults to `false`.
 *   @param options.geminiParameters - Additional parameters to pass to the Gemini `generateContentStream` method. These will be merged with the default parameters, allowing you to override or extend the configuration (e.g., custom safety settings, generation config, system instructions).
 *   @param options.ollamaParameters - Additional parameters to pass to the Ollama `chat` method. These will be merged with the default parameters, allowing you to override or extend the configuration (e.g., custom options, keep_alive settings).
 *   @param options.metrics - An object to track cumulative metrics across multiple AI requests. Pass an object with `totalCost`, `totalInputTokens`, `totalOutputTokens`, and `totalRequests` properties (all initialized to 0). The function will update these values after each request. Note: `totalCost` is only calculated for Google GenAI models, not for Ollama.
 * @return {Promise<unknown>} A Promise that resolves to the AI's response.
 *
 * @category AI
 */
export default function askAI(prompt: string, options?: {
    systemPrompt?: string;
    model?: string;
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    ollama?: boolean | any;
    webSearch?: boolean;
    HTMLFrom?: string | string[];
    /** @deprecated Use the `image` option instead. */
    screenshotFrom?: string | string[];
    image?: string | string[];
    video?: string | string[];
    audio?: string | string[];
    pdf?: string | string[];
    text?: string | string[];
    returnJson?: boolean;
    parseJson?: boolean;
    schemaJson?: unknown;
    verbose?: boolean;
    cache?: boolean;
    test?: ((response: unknown) => void) | ((response: unknown) => void)[];
    clean?: (response: unknown) => unknown;
    contextWindow?: number;
    thinkingBudget?: number;
    thinkingLevel?: "minimal" | "low" | "medium" | "high";
    includeThoughts?: boolean;
    temperature?: number;
    safetyEnabled?: boolean;
    detailedResponse?: false;
    geminiParameters?: any;
    ollamaParameters?: any;
    metrics?: {
        totalCost: number;
        totalInputTokens: number;
        totalOutputTokens: number;
        totalRequests: number;
    };
}): Promise<unknown>;
//# sourceMappingURL=askAI.d.ts.map