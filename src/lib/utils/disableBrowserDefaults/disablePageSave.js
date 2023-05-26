export default () => {
    window.addEventListener("keydown", e => {
        if (e.ctrlKey && (e.key.toLowerCase() === "s" || e.code === "KeyS")) {
            e.preventDefault()
        }
    })
}
