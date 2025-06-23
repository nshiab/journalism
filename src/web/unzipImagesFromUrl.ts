import { unzip } from "fflate";

/**
 * Fetches a ZIP archive from a URL, extracts all files, and returns their object URLs.
 *
 * Each file in the ZIP is converted to a Blob and a corresponding object URL is created.
 * The returned array contains the object URLs in the order they appear in the archive.
 *
 * @example
 * ```ts
 * const urls = await zipToUrls('https://example.com/files.zip');
 * // You can use the URLs as image sources, download links, etc.
 * const img = document.createElement('img');
 * img.src = urls[0];
 * document.body.appendChild(img);
 * ```
 *
 * @param url - The URL of the ZIP file to download and extract.
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
