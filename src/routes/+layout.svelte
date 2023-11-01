<script lang="ts">
    import { onMount } from "svelte"
    import disablePageSave from "$utilities/disableBrowserDefaults/disablePageSave.js"
    import disableContextMenu from "$utilities/disableBrowserDefaults/disableContextMenu.js"
    import disableDevTools from "$utilities/disableBrowserDefaults/disableDevTools.js"
    import disablePrint from "$utilities/disableBrowserDefaults/disablePrint.js"
    import disableSourceView from "$utilities/disableBrowserDefaults/disableSourceView.js"
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
