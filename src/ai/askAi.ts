import process from "node:process";
import fs from "node:fs/promises";
import { GoogleGenAI } from "@google/genai";
import { formatNumber, prettyDuration } from "@nshiab/journalism";

export default async function askAI(
  prompt: string,
  model: "gemini-2.0-flash" | "gemini-2.0-flash-lite" | string,
  options: {
    apiKey?: string;
    vertex?: boolean;
    project?: string;
    location?: string;
    HTMLFrom?: string;
    image?: string;
    video?: string;
    audio?: string;
    pdf?: string;
    returnJson?: boolean;
    verbose?: boolean;
  } = {},
) {
  const start = Date.now();
  let client;

  if (process.env.AI_PROJECT && process.env.AI_LOCATION) {
    client = new GoogleGenAI({
      vertexai: true,
      project: process.env.AI_PROJECT,
      location: process.env.AI_LOCATION,
    });
  } else if (process.env.AI_KEY) {
    client = new GoogleGenAI({
      apiKey: process.env.AI_KEY,
    });
  } else {
    client = new GoogleGenAI({
      apiKey: options.apiKey,
      vertexai: options.vertex,
      project: options.project,
      location: options.location,
    });
  }

  let response;
  if (options.HTMLFrom) {
    const res = await fetch(options.HTMLFrom);
    const html = await res.text();
    response = await client.models.generateContent({
      model,
      contents: [`${prompt}\nHere's the HTML code:\n${html}`],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.audio) {
    const base64Audio = await fs.readFile(options.audio, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: {
          data: base64Audio,
          mimeType: "audio/mp3",
        },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.video) {
    const base64Video = await fs.readFile(options.video, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: {
          data: base64Video,
          mimeType: "video/mp4",
        },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.pdf) {
    const base64Pdf = await fs.readFile(options.pdf, { encoding: "base64" });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: {
          data: base64Pdf,
          mimeType: "application/pdf",
        },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else if (options.image) {
    const base64Image = await fs.readFile(options.image, {
      encoding: "base64",
    });
    response = await client.models.generateContent({
      model,
      contents: [prompt, {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      }],
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  } else {
    response = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0,
        responseMimeType: options.returnJson ? "application/json" : undefined,
      },
    });
  }

  if (options.verbose) {
    console.log(
      "\nPrompt: ",
      prompt.length > 50 ? `${prompt.slice(0, 50)}...` : prompt,
    );

    const pricing = [{
      model: "gemini-2.0-flash",
      input: 0.10,
      output: 0.40,
    }, {
      model: "gemini-2.0-flash-lite",
      input: 0.075,
      output: 0.30,
    }];
    const modelPricing = pricing.find((p) => p.model === model);
    if (!modelPricing) {
      console.log("Model not found in pricing list.");
    } else {
      const promptTokenCount = response.usageMetadata?.promptTokenCount ?? 0;
      const promptTokenCountCost = promptTokenCount / 1_000_000 *
        modelPricing.input;
      console.log(
        "Input tokens:",
        promptTokenCount,
      );
      const candidatesTokenCount =
        response.usageMetadata?.candidatesTokenCount ??
          0;
      const candidatesTokenCountCost = candidatesTokenCount / 1_000_000 *
        modelPricing.output;
      console.log(
        "Output tokens:",
        response.usageMetadata?.candidatesTokenCount,
      );
      const estimatedCost = promptTokenCountCost + candidatesTokenCountCost;
      console.log(
        "Estimated cost:",
        formatNumber(
          estimatedCost,
          { prefix: "$", significantDigits: 1, suffix: " USD" },
        ),
      );
    }
    console.log(
      "Execution time: ",
      prettyDuration(start),
    );
  }

  return options.returnJson && response.text
    ? JSON.parse(response.text)
    : response.text;
}
