import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import askAI from "../../src/ai/askAI.ts";
import { existsSync, rmSync } from "node:fs";

const aiKey = Deno.env.get("AI_KEY");
if (typeof aiKey === "string" && aiKey !== "") {
  if (existsSync("./.journalism-cache")) {
    rmSync("./.journalism-cache", { recursive: true });
  }

  Deno.test("should use a simple prompt", async () => {
    const result = await askAI("What is the capital of France?");
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with a test", async () => {
    const result = await askAI("Give me a list of 3 countries in Europe.", {
      returnJson: true,
      test: (response: unknown) => {
        if (!Array.isArray(response)) {
          throw new Error(
            `Response is not an array: ${JSON.stringify(response)}`,
          );
        }
        if (response.length !== 3) {
          throw new Error(
            `Response does not contain three items: ${
              JSON.stringify(response)
            }`,
          );
        }
      },
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with cache", async () => {
    const result = await askAI("What is the capital of France?", {
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt and return cached data", async () => {
    const result = await askAI("What is the capital of France?", {
      cache: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with cache and json", async () => {
    const result = await askAI("What is the capital of France?", {
      cache: true,
      returnJson: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt and return cached JSON data", async () => {
    const result = await askAI("What is the capital of France?", {
      cache: true,
      returnJson: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with cache and verbose", async () => {
    const result = await askAI("What is the capital of Canada?", {
      cache: true,
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt and return cached data with verbose", async () => {
    const result = await askAI("What is the capital of Canada?", {
      cache: true,
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with cache and verbose and json", async () => {
    const result = await askAI("What is the capital of Canada?", {
      cache: true,
      returnJson: true,
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt and return cached json data with verbose and json", async () => {
    const result = await askAI("What is the capital of Canada?", {
      cache: true,
      returnJson: true,
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should use a simple prompt with the API key passed as an option", async () => {
    const result = await askAI("What is the capital of France?", {
      apiKey: aiKey,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should use a simple prompt and return a json", async () => {
    const result = await askAI("What is the capital of France?", {
      returnJson: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should use a simple prompt and log extra information", async () => {
    const result = await askAI("What is the capital of France?", {
      verbose: true,
    });
    console.log(result);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should scrape a web page", async () => {
    const executiveOrders = await askAI(
      `Here's the page showing presidential executive orders. Extract the executive order/names, dates (yyyy-mm-dd), and urls as an array of objects. Also categorize each executive order based on its name.`,
      {
        HTMLFrom:
          "https://www.whitehouse.gov/presidential-actions/executive-orders/",
        returnJson: true,
        verbose: true,
      },
    );
    console.table(executiveOrders);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should analyze an audio file", async () => {
    const audioResponse = await askAI(
      `Return an object with the name of the person talking and an approximate date of the speech if you recognize it.`,
      {
        audio: "test/data/ai/speech.mp3",
        returnJson: true,
      },
    );
    console.log(audioResponse);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should analyze images", async () => {
    const images = [];
    for await (const dirEntry of Deno.readDir("test/data/ai/pictures")) {
      images.push(`test/data/ai/pictures/${dirEntry.name}`);
    }

    const data = await askAI(
      `Based on the images I send you, I want an array of objects with the following properties:
    - name: the person on the image if it's a human and you can recognize it,
    - description: a very short description of the image,
    - isPolitician: true is if it's a politician and false if it isn't.`,
      {
        image: images,
        verbose: true,
        returnJson: true,
      },
    );
    console.table(data);

    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should analyze a video file", async () => {
    const videoTranscript = await askAI(
      `I want a array of objects, with each object having the following keys: name, timestamp, main emotion, transcript. Each time a new person talks, create a new object.`,
      {
        video: "test/data/ai/The Ontario leaders' debate in 3 minutes 360.mp4",
        returnJson: true,
        verbose: true,
      },
    );
    console.table(videoTranscript);
    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });

  Deno.test("should analyze a pdf file with a specific model", async () => {
    const pdfExtraction = await askAI(
      `This is a supreme court decision. Give me the merits of the case in the document. I want to know what happened and when. Return a list of objects with a date and a brief summary for each important event. Sort them chronologically.`,
      {
        model: "gemini-2.0-flash",
        pdf: "test/data/ai/Piekut-en.pdf",
        returnJson: true,
        verbose: true,
      },
    );
    console.table(pdfExtraction);
    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
  Deno.test("should analyze different files with different formats", async () => {
    const allFiles = await askAI(
      `Give me a short description of each things I give you.`,
      {
        model: "gemini-2.0-flash",
        HTMLFrom:
          "https://www.whitehouse.gov/presidential-actions/executive-orders/",
        audio: "test/data/ai/speech.mp3",
        image: "test/data/ai/pictures/Screenshot 2025-03-21 at 1.36.14 PM.png",
        video: "test/data/ai/The Ontario leaders' debate in 3 minutes 360.mp4",
        pdf: "test/data/ai/Piekut-en.pdf",
        returnJson: true,
        verbose: true,
      },
    );
    console.table(allFiles);
    // Just making sure it doesn't crash for now.
    assertEquals(true, true);
  });
} else {
  console.log("No AI_PROJECT in process.env");
}
