import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import getEmbedding from "../../src/ai/getEmbedding.ts";

const aiKey = Deno.env.get("AI_KEY");
if (typeof aiKey === "string" && aiKey !== "") {
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
