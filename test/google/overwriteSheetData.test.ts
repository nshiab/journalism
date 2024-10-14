import "@std/dotenv/load";
import { assertEquals } from "jsr:@std/assert";
import getSheetData from "../../src/google/getSheetData.ts";
import overwriteSheetData from "../../src/google/overwriteSheetData.ts";

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1Ar19cP8oGYEzacfrkLWnSH7ZqImILMUrosBwnZ43EQM/edit#gid=0";

const data = [
  { first: "Nael", last: "Shiab" },
  { first: "Andrew", last: "Ryan" },
];

// Commented tests because too many requests on API.

const email = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const key = Deno.env.get("GOOGLE_PRIVATE_KEY");

if (
  typeof email === "string" &&
  email !== "" &&
  typeof key === "string" &&
  key !== ""
) {
  // Deno.test("should overwrite the data in a sheet", async () => {
  //     await overwriteSheetData(data, sheetUrl)

  //     const csv = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(csv, "first,last\r\nNael,Shiab\r\nAndrew,Ryan")
  // })
  // Deno.test("should overwrite the data in a sheet as raw values", async () => {
  //     await overwriteSheetData(data, sheetUrl, { raw: true })

  //     const csv = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(csv, "first,last\r\nNael,Shiab\r\nAndrew,Ryan")
  // })
  // Deno.test("should overwrite the data in a sheet with a lastUpdate option", async () => {
  //     await overwriteSheetData(data, sheetUrl, { lastUpdate: true })

  //     const csv = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(
  //         (csv as string).replace(
  //             /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
  //             "DATE"
  //         ).replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),,
  //         "Last update:,DATE UTC\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
  //     )
  // })
  // Deno.test("should overwrite the data in a sheet with a lastUpdate option and a specific time zone", async () => {
  //     await overwriteSheetData(data, sheetUrl, {
  //         lastUpdate: true,
  //         timeZone: "Canada/Eastern",
  //     })

  //     const csv = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(
  //         (csv as string).replace(
  //             /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
  //             "DATE"
  //         ).replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),,
  //         "Last update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
  //     )
  // })
  // Deno.test("should overwrite the data in a sheet with a prepended text", async () => {
  //     await overwriteSheetData(data, sheetUrl, {
  //         prepend: "Contact me for more info",
  //     })

  //     const csv = await getSheetData(sheetUrl, { csv: true })

  //     assertEquals(
  //         csv,
  //         "Contact me for more info,\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
  //     )
  // })

  Deno.test("should overwrite the data in a sheet with a prepended text and lastUpdate with a specific time zone", async () => {
    await overwriteSheetData(data, sheetUrl, {
      prepend: "Contact me for more info",
      lastUpdate: true,
      timeZone: "Canada/Eastern",
    });

    const csv = await getSheetData(sheetUrl, { csv: true });

    assertEquals(
      (csv as string)
        .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, "DATE")
        .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),
      "Contact me for more info,\r\nLast update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan",
    );
  });
} else {
  console.log(
    "No GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY in process.env",
  );
}

// const differentEmail = process.env.GG_EMAIL
// const differentKey = process.env.GG_KEY

// if (
//     typeof differentEmail === "string" &&
//     differentEmail !== "" &&
//     typeof differentKey === "string" &&
//     differentKey !== ""
// ) {
//     Deno.test("should overwrite the data in a sheet with a prepended text and lastUpdate with a specific time zone, using a specific apiEmail and apiKey", async () => {
//         await overwriteSheetData(data, sheetUrl, {
//             prepend: "Contact me for more info",
//             lastUpdate: true,
//             timeZone: "Canada/Eastern",
//             apiEmail: "GG_EMAIL",
//             apiKey: "GG_KEY",
//         })

//         const csv = await getSheetData(sheetUrl, {
//             csv: true,
//             apiEmail: "GG_EMAIL",
//             apiKey: "GG_KEY",
//         })

//         assertEquals(
//             (csv as string)
//                 .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, "DATE")
//                 .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "DATE"),
//             "Contact me for more info,\r\nLast update:,DATE ET\r\nfirst,last\r\nNael,Shiab\r\nAndrew,Ryan"
//         )
//     })
// } else {
//     console.log("No GG_EMAIL or GG_KEY in process.env")
// }
