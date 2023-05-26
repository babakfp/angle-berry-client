export default () => {
    window.addEventListener("keydown", e => {
        if (
            e.ctrlKey &&
            e.shiftKey &&
            (e.key.toLowerCase() === "i" ||
                e.code === "KeyI" ||
                e.key.toLowerCase() === "j" ||
                e.code === "KeyJ")
        ) {
            e.preventDefault()
        }
    })
}
