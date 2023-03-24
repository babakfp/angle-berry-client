export const goToRepliedMessage = (messageId, intervalId, timeoutId) => {
	// console.log(intervalId)
	if (intervalId) clearInterval(intervalId)
	if (timeoutId) clearTimeout(timeoutId)

	const messageElementThatWeAreReplyingTo = document.getElementById(messageId)
	if (!messageElementThatWeAreReplyingTo) return

	messageElementThatWeAreReplyingTo.scrollIntoView({
		behavior: "smooth",
		block:
			messageElementThatWeAreReplyingTo.clientHeight >
			document.getElementById("messages-wrapper").clientHeight
				? "start"
				: "center",
	})

	const replyHighlightElement =
		messageElementThatWeAreReplyingTo.querySelector(".reply-highlight")

	replyHighlightElement.style.opacity = 1
	intervalId = setInterval(() => {
		replyHighlightElement.style.opacity =
			replyHighlightElement.style.opacity - 0.05
		console.log(replyHighlightElement.style.opacity)
	}, 100)

	timeoutId = setTimeout(() => clearInterval(intervalId), 2000)

	return { intervalId, timeoutId }
}
