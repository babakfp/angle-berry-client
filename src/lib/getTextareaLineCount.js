export function getTextareaLineCount(textareaElement) {
	const scrollHeight = textareaElement.scrollHeight
	const style = getComputedStyle(textareaElement)
	const lineHeight = parseInt(style.lineHeight)
	const paddingTop = parseInt(style.paddingTop)
	const paddingBottom = parseInt(style.paddingBottom)
	const pureScrollHeight = scrollHeight - paddingTop - paddingBottom
	const lineCount = pureScrollHeight / lineHeight
	return lineCount
}
