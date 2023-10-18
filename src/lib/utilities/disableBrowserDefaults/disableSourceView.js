export default () => {
    window.addEventListener("keydown", e => {
        if (e.ctrlKey && (e.key.toLowerCase() === "u" || e.code === "KeyU")) {
            e.preventDefault()
        }
    })
}
