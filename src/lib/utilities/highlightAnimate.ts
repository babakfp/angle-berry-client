export function highlightAnimate(
    element: HTMLElement,
    interval: number | undefined,
) {
    if (interval) clearInterval(interval)

    if (!element) return

    element.style.opacity = "1"
    interval = setInterval(() => {
        element.style.opacity = (
            parseFloat(element.style.opacity) - 0.05
        ).toString()
        if (element.style.opacity === "0") {
            clearInterval(interval)
        }
    }, 100)

    return interval
}
