export function shrinkHeight(node, { delay = 0, duration = 400 }) {
	node.style.overflow = "hidden"

	const style = getComputedStyle(node)
	const height = parseFloat(style.height)
	const paddingTop = parseFloat(style.paddingTop)
	const paddingBottom = parseFloat(style.paddingBottom)
	const borderTopWidth = parseFloat(style.borderTopWidth)
	const borderBottomWidth = parseFloat(style.borderBottomWidth)

	return {
		delay,
		duration,
		css: t => `
			height: ${t * height}px;
			padding-top: ${t * paddingTop}px;
			padding-bottom: ${t * paddingBottom}px;
			border-top-width: ${t * borderTopWidth}px;
			border-bottom-width: ${t * borderBottomWidth}px;
		`,
	}
}
