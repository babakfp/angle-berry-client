<script>
    /**
     * @param {KeyboardEvent} e
     * @param {string} keyLetter
     */
    const isKey = (e, keyLetter) => {
        return (
            e.key.toLowerCase() === keyLetter ||
            e.code === `Key${keyLetter.toUpperCase()}`
        )
    }
</script>

<svelte:window
    on:contextmenu={e => {
        if (process.env.NODE_ENV !== "production") return
        e.preventDefault()
    }}
    on:keydown={e => {
        if (process.env.NODE_ENV !== "production") return

        const isTryingToOpenDevTools =
            e.ctrlKey && e.shiftKey && (isKey(e, "i") || isKey(e, "j"))
        const isTryingToSavePage = e.ctrlKey && isKey(e, "s")
        const isTryingToPrint =
            (e.ctrlKey && isKey(e, "p")) ||
            (e.ctrlKey && e.shiftKey && isKey(e, "i"))
        const isTryingToOpenSourceView = e.ctrlKey && isKey(e, "u")

        if (
            isTryingToOpenDevTools ||
            isTryingToSavePage ||
            isTryingToPrint ||
            isTryingToOpenSourceView
        ) {
            e.preventDefault()
        }
    }}
/>
