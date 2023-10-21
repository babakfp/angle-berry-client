/**
 * @param element {HTMLElement}
 * @param {number | undefined} interval - The ID of the current interval
 */
export function highlightAnimate(element, interval) {
    if (interval) clearInterval(interval)

    if (element) {
        element.style.opacity = 1
        interval = setInterval(() => {
            element.style.opacity -= 0.05
            if (element.style.opacity === "0") {
                clearInterval(interval)
            }
        }, 100)
    }

    return interval
}
