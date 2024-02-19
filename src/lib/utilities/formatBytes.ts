export const formatBytes = (sizeInBytes: number) => {
    let size = sizeInBytes
    const units = ["Bytes", "KB", "MB", "GB", "TB"] as const

    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${units[unitIndex] === "Bytes" ? size : size.toFixed(2)} ${units[unitIndex]}`
}
