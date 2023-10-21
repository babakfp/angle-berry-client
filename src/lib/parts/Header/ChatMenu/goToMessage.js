import { highlightAnimate } from "$utilities/highlightAnimate.js"

/**
 * Scrolls to the message with the specified ID and highlights it.
 * @param {string} messageId - The ID of the message to scroll to.
 * @param {number | undefined} interval - The ID of the current interval (if any).
 */
export function goToMessage(messageId, interval) {
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

    return highlightAnimate(
        messageElement.querySelector(".reply-highlight"),
        interval,
    )
}
