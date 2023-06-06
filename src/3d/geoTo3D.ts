interface options {
    nbDecimals?: number
    toArray?: boolean
}

interface mergedOptions {
    nbDecimals: number
    toArray: boolean
}

export default function geoTo3D(
    lat: number,
    lon: number,
    radius: number,
    options: options = {}
): { x: number; y: number; z: number } | [number, number, number] {
    const mergedOptions: mergedOptions = {
        nbDecimals: 5,
        toArray: false,
        ...options,
    }

    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (90 - lon) * (Math.PI / 180)

    const x = parseFloat(
        (radius * Math.sin(phi) * Math.cos(theta)).toFixed(
            mergedOptions.nbDecimals
        )
    )
    const y = parseFloat(
        (radius * Math.cos(phi)).toFixed(mergedOptions.nbDecimals)
    )
    const z = parseFloat(
        (radius * Math.sin(phi) * Math.sin(theta)).toFixed(
            mergedOptions.nbDecimals
        )
    )

    if (mergedOptions.toArray) {
        return [x, y, z]
    } else {
        return { x, y, z }
    }
}
