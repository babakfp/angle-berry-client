<script lang="ts">
    import { onMount } from "svelte"
    import { Toaster } from "svelte-french-toast"
    import { LoadingBar } from "svelte-loading-bar"
    import { preventSomeDefaultEvents } from "$lib/utilities/preventSomeDefaultEvents"
    import "$lib/app.css"

    onMount(() => {
        preventSomeDefaultEvents()
    })
</script>

<LoadingBar />

<slot />

<Toaster />
