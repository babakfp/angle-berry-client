import { highlightAnimate } from "$lib/utilities/highlightAnimate"

/**
 * Scrolls to the message with the specified ID and highlights it.
 * @param messageId - The ID of the message to scroll to.
 * @param interval - The ID of the current interval (if any).
 */
export const goToMessage = (
    messageId: string,
    interval: number | undefined,
) => {
    // Get the element with the specified ID.
    const messageElement = document.getElementById(messageId)
    if (!messageElement) return

    // Scroll to the message element.
    messageElement.scrollIntoView({
        behavior: "smooth",
        block:
            (
                messageElement.clientHeight
                > document.getElementById("messages-wrapper")!.clientHeight
            ) ?
                "start"
            :   "center",
    })

    return highlightAnimate(
        messageElement.querySelector(".reply-highlight")!,
        interval,
    )
}
