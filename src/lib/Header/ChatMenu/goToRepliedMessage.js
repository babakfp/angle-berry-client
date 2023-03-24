let intervalId = null
let timeoutId = null

export const goToRepliedMessage = messageId => {
	if (intervalId) clearInterval(intervalId)
	if (timeoutId) clearTimeout(timeoutId)

	const messageElementThatWeAreReplyingTo = document.getElementById(messageId)
	messageElementThatWeAreReplyingTo.scrollIntoView({
		behavior: "smooth",
		block: "center",
	})

	const replyHighlightElement =
		messageElementThatWeAreReplyingTo.querySelector(".reply-highlight")

	replyHighlightElement.style.opacity = 1
	intervalId = setInterval(() => {
		replyHighlightElement.style.opacity =
			replyHighlightElement.style.opacity - 0.05
	}, 100)

	timeoutId = setTimeout(() => clearInterval(intervalId), 2000)
}
