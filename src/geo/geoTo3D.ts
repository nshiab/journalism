export default function geoTo3D(
    lat: number,
    lon: number,
    radius: number,
    options: {
        nbDecimals?: number
        toArray?: boolean
    } = {}
): { x: number; y: number; z: number } | [number, number, number] {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (90 - lon) * (Math.PI / 180)

    let x = radius * Math.sin(phi) * Math.cos(theta)

    let y = radius * Math.cos(phi)

    let z = radius * Math.sin(phi) * Math.sin(theta)

    if (typeof options.nbDecimals === "number") {
        x = parseFloat(x.toFixed(options.nbDecimals))
        y = parseFloat(y.toFixed(options.nbDecimals))
        z = parseFloat(z.toFixed(options.nbDecimals))
    }

    if (options.toArray) {
        return [x, y, z]
    } else {
        return { x, y, z }
    }
}
