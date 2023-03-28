export function goToMessage(messageId, intervalId, timeoutId) {
	if (intervalId) clearInterval(intervalId)
	if (timeoutId) clearTimeout(timeoutId)

	const messageElement = document.getElementById(messageId)
	if (!messageElement) return

	messageElement.scrollIntoView({
		behavior: "smooth",
		block:
			messageElement.clientHeight >
			document.getElementById("messages-wrapper").clientHeight
				? "start"
				: "center",
	})

	const messageHighlightElement =
		messageElement.querySelector(".reply-highlight")

	messageHighlightElement.style.opacity = 1
	intervalId = setInterval(() => {
		messageHighlightElement.style.opacity =
			messageHighlightElement.style.opacity - 0.05
	}, 100)

	timeoutId = setTimeout(() => clearInterval(intervalId), 2000)

	return { intervalId, timeoutId }
}
