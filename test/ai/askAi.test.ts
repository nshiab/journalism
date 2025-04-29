import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import askAI from "../../src/ai/askAI.ts";

const aiKey = Deno.env.get("AI_KEY");
if (typeof aiKey === "string" && aiKey !== "") {
  Deno.test("should use a simple prompt", async () => {
    const result = await askAI("What is the capital of France?");
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
    const imageData = [];
    for await (const dirEntry of Deno.readDir("test/data/ai/pictures")) {
      const obj = await askAI(
        `Based on the image I send you, I want an object with the following properties:
      - filename: ${dirEntry.name},
      - name: the person on the image if it's a human and you can recognize it,
      - description: a very short description of the image,
      - isPolitician: true is if it's a politician and false if it isn't.
      Return just the object.`,
        {
          image: `test/data/ai/pictures/${dirEntry.name}`,
          verbose: true,
          returnJson: true,
        },
      );
      console.log(obj);
      imageData.push(obj);
    }
    console.table(imageData);
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
} else {
  console.log("No AI_PROJECT in process.env");
}
