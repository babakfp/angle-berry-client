/**
 * Scrolls to the message with the specified ID and highlights it.
 * @param {string} messageId - The ID of the message to scroll to.
 * @param {number} intervalId - The ID of the current interval (if any).
 * @param {number} timeoutId - The ID of the current timeout (if any).
 * @returns {object | undefined} - An object containing the IDs of the new interval and timeout.
 */
export function goToMessage(messageId, intervalId, timeoutId) {
    // Clear the current interval and timeout (if any).
    if (intervalId) clearInterval(intervalId)
    if (timeoutId) clearTimeout(timeoutId)

    // Get the element with the specified ID.
    const messageElement = document.getElementById(messageId)
    if (!messageElement) return

    // Scroll to the message element.
    messageElement.scrollIntoView({
        behavior: "smooth",
        block:
            messageElement.clientHeight >
            document.getElementById("messages-wrapper").clientHeight
                ? "start"
                : "center",
    })

    // Highlight the message element.
    const messageHighlightElement =
        messageElement.querySelector(".reply-highlight")
    messageHighlightElement.style.opacity = 1
    intervalId = setInterval(() => {
        messageHighlightElement.style.opacity -= 0.05
    }, 100)

    timeoutId = setTimeout(() => clearInterval(intervalId), 2000)

    return { intervalId, timeoutId }
}
