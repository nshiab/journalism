import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import getEmbedding from "../../src/ai/getEmbedding.ts";
import { Ollama } from "ollama";

const aiKey = Deno.env.get("AI_KEY");
const embeddingModel = Deno.env.get("AI_EMBEDDINGS_MODEL");
if (
  typeof aiKey === "string" && aiKey !== "" &&
  typeof embeddingModel === "string" && embeddingModel !== ""
) {
  Deno.test("should create an embedding", async () => {
    const result = await getEmbedding("What is the capital of France?");
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create an embedding with verbose option", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create an embedding with verbose option and cache", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should retrieve an embedding from cache", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No AI_PROJECT in process.env");
}

const ollama = Deno.env.get("OLLAMA");
if (typeof ollama === "string" && ollama !== "") {
  Deno.test("should create an embedding (ollama)", async () => {
    const result = await getEmbedding("What is the capital of France?");
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create without a specific context window", async () => {
    const result = await getEmbedding(
      "This website is a free, open-source online course on data analysis and visualization using TypeScript. It’s available in English and French. I assume you know nothing about data or code, and I guide you step by step until you’re ready to take off on your own.",
    );
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create with a specific context window", async () => {
    const result = await getEmbedding(
      "This website is a free, open-source online course on data analysis and visualization using TypeScript. It’s available in English and French. I assume you know nothing about data or code, and I guide you step by step until you’re ready to take off on your own.",
      { contextWindow: 32000 },
    );
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create an embedding with a different Ollama instance (ollama)", async () => {
    const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    const result = await getEmbedding("What is the capital of France?", {
      ollama,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create an embedding with verbose option (ollama)", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should create an embedding with verbose option and cache (ollama)", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should retrieve an embedding from cache (ollama)", async () => {
    const result = await getEmbedding("What is the capital of France?", {
      verbose: true,
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No OLLAMA in process.env");
}
