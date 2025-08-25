export const preventSomeDefaultEvents = () => {
    if (process.env.NODE_ENV === "development") return

    window.addEventListener("contextmenu", (e) => e.preventDefault())

    window.addEventListener("keydown", (e) => {
        if (
            isTryingToOpenDevTools(e)
            || isTryingToSavePage(e)
            || isTryingToPrint(e)
            || isTryingToOpenSourceView(e)
        ) {
            e.preventDefault()
        }
    })
}

const isTryingToOpenDevTools = (e: KeyboardEvent) => {
    return e.ctrlKey && e.shiftKey && (e.code === "KeyI" || e.code === "KeyJ")
}

const isTryingToSavePage = (e: KeyboardEvent) => {
    return e.ctrlKey && e.code === "KeyS"
}

const isTryingToPrint = (e: KeyboardEvent) => {
    return (
        (e.ctrlKey && e.code === "KeyP")
        || (e.ctrlKey && e.shiftKey && e.code === "KeyI")
    )
}

const isTryingToOpenSourceView = (e: KeyboardEvent) => {
    return e.ctrlKey && e.code === "KeyU"
}
