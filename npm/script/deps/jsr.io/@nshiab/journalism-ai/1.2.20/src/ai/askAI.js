"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = askAI;
const node_fs_1 = require("node:fs");
const node_process_1 = __importDefault(require("node:process"));
const genai_1 = require("@google/genai");
const index_js_1 = require("../../../../journalism-format/1.1.7/src/index.js");
const node_crypto_1 = __importDefault(require("node:crypto"));
const ollama_1 = __importStar(require("ollama"));
// Implementation
async function askAI(prompt, options = {}) {
    if (options.screenshotFrom) {
        throw new Error("The 'screenshotFrom' option has been removed to reduce dependencies. Please take a screenshot yourself and pass it via the 'image' option.");
    }
    const start = Date.now();
    let client;
    const ollamaVar = options.ollama === true ||
        options.ollama instanceof ollama_1.Ollama || node_process_1.default.env.OLLAMA;
    const defaults = {
        returnJson: options.returnJson || options.schemaJson ? true : false,
        parseJson: options.returnJson || options.schemaJson ? true : false,
    };
    options = { ...defaults, ...options };
    // Initialize detailed response tracking
    const detailedResponse = {
        response: undefined,
        prompt: prompt,
        rawResponse: undefined,
        fromCache: false,
        model: "",
        promptTokenCount: 0,
        outputTokenCount: 0,
        totalTokens: 0,
        tokensPerSecond: 0,
        durationMs: 0,
        thoughts: "",
        thoughtsTokenCount: 0,
    };
    if (ollamaVar) {
        client = options.ollama instanceof ollama_1.Ollama ? options.ollama : ollama_1.default;
    }
    else if (options.vertex || options.apiKey || options.project || options.location) {
        client = new genai_1.GoogleGenAI({
            apiKey: options.apiKey,
            vertexai: options.vertex,
            project: options.project,
            location: options.location,
        });
    }
    else if (node_process_1.default.env.AI_PROJECT && node_process_1.default.env.AI_LOCATION) {
        client = new genai_1.GoogleGenAI({
            vertexai: true,
            project: node_process_1.default.env.AI_PROJECT,
            location: node_process_1.default.env.AI_LOCATION,
        });
    }
    else if (node_process_1.default.env.AI_KEY) {
        client = new genai_1.GoogleGenAI({
            apiKey: node_process_1.default.env.AI_KEY,
        });
    }
    if (!client) {
        throw new Error("No API key or project/location or Ollama found. Please set AI_KEY, AI_PROJECT, AI_LOCATION or OLLAMA in your environment variables or pass them as options.");
    }
    const model = options.model ?? node_process_1.default.env.AI_MODEL;
    if (!model) {
        throw new Error("Model not specified. Use the AI_MODEL environment variable or pass it as an option.");
    }
    detailedResponse.model = model;
    if (options.verbose) {
        if (options.systemPrompt) {
            console.log(`\nSystem prompt:`);
            console.log(options.systemPrompt);
        }
        console.log(`\nPrompt to ${model}:`);
        console.log(prompt);
        if (options.schemaJson) {
            console.log(`JSON schema for response:`);
            console.log(JSON.stringify(options.schemaJson, null, 2));
        }
    }
    // Google GenAI
    const contents = [];
    // Ollama
    const message = {
        role: "user",
        content: "",
    };
    let promptToBeSent = prompt;
    if (options.HTMLFrom) {
        const urls = Array.isArray(options.HTMLFrom)
            ? options.HTMLFrom
            : [options.HTMLFrom];
        for (const url of urls) {
            try {
                const start = options.verbose ? new Date() : null;
                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                    },
                });
                const fullHtml = await response.text();
                const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                const html = bodyMatch ? bodyMatch[1] : fullHtml;
                promptToBeSent += `\n\nHTML content from ${url}:\n${html}`;
                if (start) {
                    console.log(`\nRetrieved body HTML from ${url} in ${(0, index_js_1.prettyDuration)(start)}`);
                }
            }
            catch (error) {
                console.log(`Problem retrieving body HTML from ${url}:`, JSON.stringify(error));
            }
        }
    }
    if (options.text) {
        const textFiles = Array.isArray(options.text)
            ? options.text
            : [options.text];
        for (const textFile of textFiles) {
            if (textFile.startsWith("gs://")) {
                if (!ollamaVar) {
                    contents.push({
                        fileData: {
                            fileUri: textFile,
                            mimeType: "text/plain",
                        },
                    });
                }
                else {
                    throw new Error("Ollama does not support Google Cloud Storage files. Please use local file paths.");
                }
            }
            else {
                const textContent = (0, node_fs_1.readFileSync)(textFile, { encoding: "utf-8" });
                promptToBeSent += `\n\nContent from ${textFile}:\n${textContent}`;
            }
        }
    }
    if (ollamaVar) {
        message.content = promptToBeSent;
    }
    else {
        contents.push(promptToBeSent);
    }
    if (options.audio) {
        if (ollamaVar) {
            throw new Error("Ollama does not support audio files.");
        }
        else {
            const audioFiles = Array.isArray(options.audio)
                ? options.audio
                : [options.audio];
            for (const audioFile of audioFiles) {
                if (audioFile.startsWith("gs://")) {
                    contents.push({
                        fileData: {
                            fileUri: audioFile,
                            mimeType: "audio/mp3",
                        },
                    });
                }
                else {
                    const base64Audio = (0, node_fs_1.readFileSync)(audioFile, {
                        encoding: "base64",
                    });
                    contents.push({
                        inlineData: { data: base64Audio, mimeType: "audio/mp3" },
                    });
                }
            }
        }
    }
    if (options.video) {
        if (ollamaVar) {
            throw new Error("Ollama does not support video files.");
        }
        else {
            const videoFiles = Array.isArray(options.video)
                ? options.video
                : [options.video];
            for (const videoFile of videoFiles) {
                if (videoFile.startsWith("gs://")) {
                    contents.push({
                        fileData: {
                            fileUri: videoFile,
                            mimeType: "video/mp4",
                        },
                    });
                }
                else {
                    const base64Video = (0, node_fs_1.readFileSync)(videoFile, {
                        encoding: "base64",
                    });
                    contents.push({
                        inlineData: { data: base64Video, mimeType: "video/mp4" },
                    });
                }
            }
        }
    }
    if (options.pdf) {
        if (ollamaVar) {
            throw new Error("Ollama does not support PDF files.");
        }
        else {
            const pdfFiles = Array.isArray(options.pdf) ? options.pdf : [options.pdf];
            for (const pdfFile of pdfFiles) {
                if (pdfFile.startsWith("gs://")) {
                    contents.push({
                        fileData: {
                            fileUri: pdfFile,
                            mimeType: "application/pdf",
                        },
                    });
                }
                else {
                    const base64Pdf = (0, node_fs_1.readFileSync)(pdfFile, { encoding: "base64" });
                    contents.push({
                        inlineData: { data: base64Pdf, mimeType: "application/pdf" },
                    });
                }
            }
        }
    }
    if (options.image) {
        const imageFiles = Array.isArray(options.image)
            ? options.image
            : [options.image];
        if (ollamaVar) {
            message.images = imageFiles.map((imageFile) => (0, node_fs_1.readFileSync)(imageFile, {
                encoding: "base64",
            }));
        }
        else {
            for (const imageFile of imageFiles) {
                if (imageFile.startsWith("gs://")) {
                    contents.push({
                        fileData: {
                            fileUri: imageFile,
                            mimeType: "image/jpeg",
                        },
                    });
                }
                else {
                    const base64Image = (0, node_fs_1.readFileSync)(imageFile, {
                        encoding: "base64",
                    });
                    contents.push({
                        inlineData: { data: base64Image, mimeType: "image/jpeg" },
                    });
                }
            }
        }
    }
    // Update the prompt in detailedResponse to reflect what was actually sent
    detailedResponse.prompt = promptToBeSent;
    const safetyEnabled = options.safetyEnabled ??
        (options.vertex ? false : true);
    const safetySettings = safetyEnabled === false
        ? [
            {
                category: genai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: genai_1.HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: genai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: genai_1.HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: genai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: genai_1.HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: genai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: genai_1.HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: genai_1.HarmCategory.HARM_CATEGORY_UNSPECIFIED,
                threshold: genai_1.HarmBlockThreshold.BLOCK_NONE,
            },
        ]
        : undefined;
    // Just everything here
    const params = {
        model,
        contents: contents,
        messages: [message],
        system: options.systemPrompt,
        format: options.schemaJson
            ? options.schemaJson
            : options.returnJson
                ? "json"
                : undefined,
        temperature: options.temperature ?? 0,
        config: {
            systemInstruction: options.systemPrompt,
            safetySettings,
            temperature: options.temperature ?? 0,
            responseMimeType: options.returnJson ? "application/json" : undefined,
            responseJsonSchema: options.schemaJson,
            thinkingConfig: options.thinkingLevel
                ? {
                    thinkingLevel: genai_1.ThinkingLevel[options.thinkingLevel.toUpperCase()],
                    includeThoughts: options.includeThoughts,
                }
                : typeof options.thinkingBudget === "number"
                    ? {
                        thinkingBudget: options.thinkingBudget ?? 0,
                        includeThoughts: options.includeThoughts,
                    }
                    : {
                        thinkingBudget: 0,
                        includeThoughts: options.includeThoughts,
                    },
            tools: options.webSearch
                ? [
                    {
                        googleSearch: {},
                    },
                ]
                : undefined,
        },
    };
    if (safetyEnabled === false) {
        delete params.config?.safetySettings;
    }
    let cacheFileJSON;
    let cacheFileText;
    if (options.cache) {
        const cachePath = "./.journalism-cache";
        if (!(0, node_fs_1.existsSync)(cachePath)) {
            (0, node_fs_1.mkdirSync)(cachePath);
        }
        const hash = node_crypto_1.default
            .createHash("sha256")
            // Passing clean too because cleaned data is cached
            .update(JSON.stringify({ ...params, clean: options.clean }))
            .digest("hex");
        cacheFileJSON = `${cachePath}/askAI-${hash}.json`;
        cacheFileText = `${cachePath}/askAI-${hash}.txt`;
        if ((0, node_fs_1.existsSync)(cacheFileJSON)) {
            const cachedResponse = JSON.parse((0, node_fs_1.readFileSync)(cacheFileJSON, "utf-8"));
            if (options.verbose) {
                console.log("\nReturning cached JSON response.");
            }
            if (options.test) {
                if (Array.isArray(options.test)) {
                    options.test.forEach((test) => test(cachedResponse));
                }
                else {
                    options.test(cachedResponse);
                }
            }
            if (options.verbose) {
                console.log("\nResponse:");
                console.log(cachedResponse);
            }
            if (options.detailedResponse) {
                return {
                    response: cachedResponse,
                    rawResponse: undefined,
                    fromCache: true,
                    prompt: prompt,
                    model: model,
                    promptTokenCount: 0,
                    outputTokenCount: 0,
                    totalTokens: 0,
                    tokensPerSecond: 0,
                    durationMs: 0,
                };
            }
            return cachedResponse;
        }
        else if ((0, node_fs_1.existsSync)(cacheFileText)) {
            const cachedResponse = (0, node_fs_1.readFileSync)(cacheFileText, "utf-8");
            if (options.verbose) {
                console.log("\nReturning cached text response.");
            }
            if (options.test) {
                if (Array.isArray(options.test)) {
                    options.test.forEach((test) => test(cachedResponse));
                }
                else {
                    options.test(cachedResponse);
                }
            }
            if (options.verbose) {
                console.log("\nResponse:");
                console.log(cachedResponse);
            }
            if (options.detailedResponse) {
                return {
                    response: cachedResponse,
                    rawResponse: undefined,
                    fromCache: true,
                    prompt: prompt,
                    model: model,
                    promptTokenCount: 0,
                    outputTokenCount: 0,
                    totalTokens: 0,
                    tokensPerSecond: 0,
                    durationMs: 0,
                };
            }
            return cachedResponse;
        }
        else {
            if (options.verbose) {
                console.log("\nCache missed. Generating new response...");
            }
        }
    }
    const response = client instanceof genai_1.GoogleGenAI
        ? await client.models.generateContentStream({
            ...params,
            ...(options.geminiParameters ?? {}),
        })
        : await client.chat({
            model,
            messages: options.systemPrompt
                ? [{ role: "system", content: options.systemPrompt }, message]
                : [message],
            format: params.format,
            options: {
                temperature: 0,
                num_ctx: options.contextWindow,
            },
            think: options.thinkingLevel === "minimal"
                ? "low"
                : options.thinkingLevel ?? (options.thinkingBudget ?? 0) > 0,
            ...(options.ollamaParameters ?? {}),
            stream: true,
        });
    let thoughts = "";
    let returnedResponse = "";
    let finalUsageMetadata = null;
    let finalOllamaResponse = null;
    try {
        for await (const chunk of response) {
            if (chunk instanceof genai_1.GenerateContentResponse) {
                const candidate = chunk.candidates?.at(0);
                const parts = candidate?.content?.parts ?? [];
                // Capture usage metadata from the final chunk
                if (chunk.usageMetadata) {
                    finalUsageMetadata = chunk.usageMetadata;
                }
                for (const p of parts) {
                    if (!p.text) {
                        continue;
                    }
                    else if (p.thought) {
                        if (options.verbose || options.detailedResponse) {
                            if (options.verbose && !thoughts) {
                                node_process_1.default.stdout.write("\nThoughts:\n");
                            }
                            if (options.verbose) {
                                node_process_1.default.stdout.write(p.text);
                            }
                            thoughts += p.text;
                        }
                    }
                    else {
                        if (options.verbose) {
                            if (!returnedResponse) {
                                node_process_1.default.stdout.write("\nResponse:\n");
                            }
                            node_process_1.default.stdout.write(p.text);
                        }
                        returnedResponse += p.text;
                    }
                }
            }
            else {
                // This is an Ollama response chunk
                finalOllamaResponse = chunk; // Keep updating with the latest chunk to get final metadata
                if (chunk.message.thinking) {
                    if (options.verbose || options.detailedResponse) {
                        if (options.verbose && !thoughts) {
                            node_process_1.default.stdout.write("\nThoughts:\n");
                        }
                        if (options.verbose) {
                            node_process_1.default.stdout.write(chunk.message.thinking);
                        }
                        thoughts += chunk.message.thinking;
                    }
                }
                else if (chunk.message.content) {
                    if (options.verbose) {
                        if (!returnedResponse) {
                            node_process_1.default.stdout.write("\nResponse:\n");
                        }
                        node_process_1.default.stdout.write(chunk.message.content);
                    }
                    returnedResponse += chunk.message.content;
                }
            }
        }
    }
    finally {
        // Ensure the response stream is properly closed for Ollama streaming responses
        if ("abort" in response && typeof response.abort === "function") {
            response.abort();
        }
        if (options.verbose) {
            node_process_1.default.stdout.write("\n");
        }
    }
    if (options.parseJson) {
        try {
            if (typeof returnedResponse === "string") {
                returnedResponse = JSON.parse(returnedResponse);
            }
        }
        catch (error) {
            const displayResponse = returnedResponse === ""
                ? "[empty string]"
                : returnedResponse;
            throw new Error(`Failed to parse response as JSON: ${error}.\nResponse: ${displayResponse}`);
        }
        if (options.verbose) {
            console.log("\nParsed JSON response:");
            console.log(returnedResponse);
        }
    }
    let cleanedResponse = returnedResponse;
    // Store raw response before cleaning
    detailedResponse.rawResponse = returnedResponse;
    if (options.clean) {
        cleanedResponse = options.clean(returnedResponse);
    }
    else {
        cleanedResponse = returnedResponse;
    }
    if (options.test) {
        if (Array.isArray(options.test)) {
            options.test.forEach((test) => test(cleanedResponse));
        }
        else {
            options.test(cleanedResponse);
        }
    }
    if (options.cache && options.parseJson && cacheFileJSON) {
        (0, node_fs_1.writeFileSync)(cacheFileJSON, JSON.stringify(cleanedResponse));
        options.verbose && console.log("\nResponse cached as JSON.");
    }
    else if (options.cache && cacheFileText) {
        (0, node_fs_1.writeFileSync)(cacheFileText, JSON.stringify(cleanedResponse));
        options.verbose && console.log("\nResponse cached as text.");
    }
    if (options.verbose && options.clean) {
        console.log("\nCleaned response:");
        console.log(cleanedResponse, "\n");
    }
    // Store cleaned response
    detailedResponse.response = cleanedResponse;
    if (detailedResponse.rawResponse === detailedResponse.response) {
        // If no cleaning was done, avoid duplication
        detailedResponse.rawResponse = undefined;
    }
    // Calculate metrics and token usage
    if ((options.verbose || options.metrics || options.detailedResponse) &&
        finalUsageMetadata) {
        // Google GenAI streaming response
        const hasAudio = options.audio ? true : false;
        const pricing = [
            {
                model: "gemini-3-pro",
                tiers: [
                    { threshold: 200_000, input: 2.00, output: 12.00 },
                    { threshold: Infinity, input: 4.00, output: 18.00 },
                ],
            },
            {
                model: "gemini-3-flash",
                input: hasAudio ? 1.00 : 0.50,
                output: 3.00,
            },
            {
                model: "gemini-3-pro-preview",
                tiers: [
                    { threshold: 200_000, input: 2.00, output: 12.00 },
                    { threshold: Infinity, input: 4.00, output: 18.00 },
                ],
            },
            {
                model: "gemini-3-flash-preview",
                input: hasAudio ? 1.00 : 0.50,
                output: 3.00,
            },
            {
                model: "gemini-2.5-pro",
                tiers: [
                    { threshold: 200_000, input: 1.25, output: 10.00 },
                    { threshold: Infinity, input: 2.50, output: 15.00 },
                ],
            },
            {
                model: "gemini-2.5-flash",
                input: hasAudio ? 1.00 : 0.30,
                output: 2.50,
            },
            {
                model: "gemini-2.5-flash-lite",
                input: hasAudio ? 0.30 : 0.10,
                output: 0.40,
            },
            {
                model: "gemini-2.0-flash",
                input: hasAudio ? 0.70 : 0.10,
                output: 0.40,
            },
            {
                model: "gemini-2.0-flash-lite",
                input: 0.075,
                output: 0.30,
            },
            {
                model: "gemini-1.5-pro",
                tiers: [
                    { threshold: 128_000, input: 1.25, output: 5.00 },
                    { threshold: Infinity, input: 2.50, output: 10.00 },
                ],
            },
            {
                model: "gemini-1.5-flash",
                tiers: [
                    { threshold: 128_000, input: 0.075, output: 0.30 },
                    { threshold: Infinity, input: 0.15, output: 0.60 },
                ],
            },
        ];
        const modelPricing = pricing.find((p) => p.model === model);
        if (!modelPricing) {
            if (options.verbose) {
                console.log(`\nModel ${model} not found in pricing list.`);
            }
        }
        else {
            const promptTokenCount = finalUsageMetadata.promptTokenCount ?? 0;
            const outputTokenCount = finalUsageMetadata.candidatesTokenCount ?? 0;
            const thoughtsTokenCount = finalUsageMetadata.thoughtsTokenCount ?? 0;
            let inputRate;
            let outputRate;
            if ("tiers" in modelPricing && modelPricing.tiers) {
                // Find the appropriate tier based on prompt token count
                const tier = modelPricing.tiers.find((t) => promptTokenCount <= t.threshold) || modelPricing.tiers[modelPricing.tiers.length - 1];
                inputRate = tier.input;
                outputRate = tier.output;
                if (options.verbose) {
                    const tierDescription = tier.threshold === Infinity
                        ? `> ${(0, index_js_1.formatNumber)(modelPricing.tiers[0].threshold)} tokens`
                        : `≤ ${(0, index_js_1.formatNumber)(tier.threshold)} tokens`;
                    console.log(`\nPricing tier: ${tierDescription}${hasAudio ? " (audio pricing applied)" : ""}`);
                }
            }
            else if ("input" in modelPricing && "output" in modelPricing) {
                inputRate = modelPricing.input;
                outputRate = modelPricing.output;
            }
            else {
                if (options.verbose) {
                    console.log(`\nInvalid pricing structure for model ${model}.`);
                }
                // Still populate basic metadata
                const durationMs = Date.now() - start;
                const totalTokens = promptTokenCount + outputTokenCount +
                    thoughtsTokenCount;
                const tokensPerSecond = totalTokens / (durationMs / 1000);
                detailedResponse.promptTokenCount = promptTokenCount;
                detailedResponse.outputTokenCount = outputTokenCount;
                detailedResponse.totalTokens = totalTokens;
                detailedResponse.tokensPerSecond = tokensPerSecond;
                detailedResponse.durationMs = durationMs;
                detailedResponse.thoughts = thoughts;
                detailedResponse.thoughtsTokenCount = thoughtsTokenCount;
                if (options.detailedResponse) {
                    return detailedResponse;
                }
                else {
                    return cleanedResponse;
                }
            }
            const promptTokenCost = (promptTokenCount / 1_000_000) * inputRate;
            const outputTokenCost = (outputTokenCount / 1_000_000) * outputRate;
            const estimatedCost = promptTokenCost + outputTokenCost;
            const totalTokens = promptTokenCount + outputTokenCount +
                thoughtsTokenCount;
            const durationMs = Date.now() - start;
            const durationSeconds = durationMs / 1000;
            const tokensPerSecond = totalTokens / durationSeconds;
            // Always populate metadata
            detailedResponse.promptTokenCount = promptTokenCount;
            detailedResponse.outputTokenCount = outputTokenCount;
            detailedResponse.totalTokens = totalTokens;
            detailedResponse.tokensPerSecond = tokensPerSecond;
            detailedResponse.estimatedCost = estimatedCost;
            detailedResponse.durationMs = durationMs;
            detailedResponse.thoughts = thoughts;
            detailedResponse.thoughtsTokenCount = thoughtsTokenCount;
            if (options.metrics) {
                options.metrics.totalCost += estimatedCost;
                options.metrics.totalInputTokens += promptTokenCount;
                options.metrics.totalOutputTokens += outputTokenCount;
                options.metrics.totalRequests += 1;
            }
            if (options.verbose) {
                console.log(`\n\nTokens in:`, (0, index_js_1.formatNumber)(detailedResponse.promptTokenCount), "/", "Tokens out:", (0, index_js_1.formatNumber)(detailedResponse.outputTokenCount), "/", "Thinking tokens:", (0, index_js_1.formatNumber)(detailedResponse.thoughtsTokenCount), "/", "Tokens per second:", (0, index_js_1.formatNumber)(detailedResponse.tokensPerSecond, {
                    significantDigits: 1,
                }), "/", `Estimated cost${options.webSearch ? " (web search excluded)" : ""}:`, (0, index_js_1.formatNumber)(detailedResponse.estimatedCost, {
                    prefix: "$",
                    significantDigits: 1,
                    suffix: " USD",
                }));
            }
        }
    }
    else if ((options.verbose || options.metrics || options.detailedResponse) &&
        finalOllamaResponse) {
        // Ollama streaming response
        const promptTokenCount = finalOllamaResponse.prompt_eval_count;
        const outputTokenCount = finalOllamaResponse.eval_count;
        const totalTokens = promptTokenCount + outputTokenCount;
        const durationMs = Date.now() - start;
        const durationSeconds = durationMs / 1000;
        const tokensPerSecond = totalTokens / durationSeconds;
        // Always populate metadata
        detailedResponse.promptTokenCount = promptTokenCount;
        detailedResponse.outputTokenCount = outputTokenCount;
        detailedResponse.totalTokens = totalTokens;
        detailedResponse.tokensPerSecond = tokensPerSecond;
        detailedResponse.durationMs = durationMs;
        detailedResponse.thoughts = thoughts;
        if (options.metrics) {
            options.metrics.totalInputTokens += promptTokenCount;
            options.metrics.totalOutputTokens += outputTokenCount;
            options.metrics.totalRequests += 1;
        }
        if (options.verbose) {
            console.log(`\n\nTokens in:`, (0, index_js_1.formatNumber)(detailedResponse.promptTokenCount), "/", "Tokens out:", (0, index_js_1.formatNumber)(detailedResponse.outputTokenCount), "/", "Thinking tokens:", "N/A", "/", "Tokens per second:", (0, index_js_1.formatNumber)(detailedResponse.tokensPerSecond, {
                significantDigits: 1,
            }));
        }
    }
    else if (options.detailedResponse) {
        // No token metadata available, just populate duration
        detailedResponse.durationMs = Date.now() - start;
        detailedResponse.thoughts = thoughts;
    }
    if (options.verbose) {
        console.log("Execution time:", (0, index_js_1.prettyDuration)(start), "\n");
    }
    if (options.detailedResponse) {
        return detailedResponse;
    }
    else {
        return cleanedResponse;
    }
}
