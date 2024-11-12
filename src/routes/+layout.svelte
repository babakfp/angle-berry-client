<script lang="ts">
    import { onMount, type Snippet } from "svelte"
    import { Toaster } from "svelte-hot-french-toast"
    import { LoadingBar } from "svelte-loading-bar"
    import { preventSomeDefaultEvents } from "$lib/utilities/preventSomeDefaultEvents"
    import "$lib/app.css"

    let {
        children,
    }: {
        children: Snippet
    } = $props()

    onMount(() => {
        preventSomeDefaultEvents()
    })
</script>

<LoadingBar />

{@render children()}

<Toaster />
