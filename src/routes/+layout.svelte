<script>
    import { onMount } from "svelte"
    import disablePageSave from "$utils/disableBrowserDefaults/disablePageSave.js"
    import disableContextMenu from "$utils/disableBrowserDefaults/disableContextMenu.js"
    import disableDevTools from "$utils/disableBrowserDefaults/disableDevTools.js"
    import disablePrint from "$utils/disableBrowserDefaults/disablePrint.js"
    import disableSourceView from "$utils/disableBrowserDefaults/disableSourceView.js"
    import { LoadingBar } from "svelte-loading-bar"
    import "../app.postcss"

    onMount(() => {
        if (process.env.NODE_ENV === "production") {
            disablePageSave()
            disableContextMenu()
            disableDevTools()
            disablePrint()
            disableSourceView()
        }
    })
</script>

<LoadingBar />

<slot />
