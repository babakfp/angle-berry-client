export default () => {
	window.addEventListener("keydown", e => {
		if (
			(e.ctrlKey && (e.key.toLowerCase() === "p" || e.code === "KeyP")) ||
			(e.ctrlKey &&
				e.shiftKey &&
				(e.key.toLowerCase() === "i" || e.code === "KeyI"))
		) {
			e.preventDefault()
		}
	})
}
