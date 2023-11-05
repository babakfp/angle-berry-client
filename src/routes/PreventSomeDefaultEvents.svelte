<script lang="ts">
    import { onMount } from "svelte"

    onMount(() => {
        if (process.env.NODE_ENV !== "production") return

        window.addEventListener("contextmenu", e => e.preventDefault())

        window.addEventListener("keydown", e => {
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
            )
                e.preventDefault()
        })
    })

    /**
     * @param {KeyboardEvent} e
     * @param {string} keyLetter
     */
    const isKey = (e: KeyboardEvent, keyLetter: string) => {
        return (
            e.key.toLowerCase() === keyLetter ||
            e.code === `Key${keyLetter.toUpperCase()}`
        )
    }
</script>
