import { unzip } from "fflate";

/**
 * Fetches a ZIP archive from a given URL, extracts all its contained files, and returns an array of object URLs for each extracted file.
 *
 * Each file within the ZIP archive is converted into a Blob object, and then a corresponding object URL is created.
 *
 * @param url - The URL of the ZIP file to download and extract. This URL must be accessible from the client-side environment where the function is executed.
 * @returns A Promise that resolves to an array of strings, where each string is an object URL for an extracted file.
 *
 * @example
 * ```ts
 * // Fetch a ZIP archive from a URL, extract its contents, and get object URLs for each file.
 * const urls = await zipToUrls('https://example.com/files.zip');
 * console.log(urls);
 *
 * // You can use the URLs as image sources, download links, etc.
 * const img = document.createElement('img');
 * img.src = urls[0];
 * document.body.appendChild(img);
 * ```
 * @category Web
 */
export default async function zipToUrls(url: string): Promise<string[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ZIP: ${res.status} ${res.statusText}`);
  }
  const buf = new Uint8Array(await res.arrayBuffer());

  return new Promise((resolve, reject) => {
    unzip(buf, (unzipped) => {
      if (!unzipped) return reject(new Error("Failed to unzip file"));
      const urls = Object.entries(unzipped).map(([_filename, content]) => {
        const blob = new Blob([content]);
        return URL.createObjectURL(blob);
      });
      resolve(urls);
    });
  });
}
