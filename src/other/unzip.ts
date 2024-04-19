import AdmZip from "adm-zip"

export default function unzip(zippedFile: string, output: string) {
    const zip = new AdmZip(zippedFile)
    zip.extractAllTo(output, true)
}
