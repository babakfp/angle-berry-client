<script lang="ts">
    import { Toaster } from "svelte-french-toast"
    import { LoadingBar } from "svelte-loading-bar"
    import PreventSomeDefaultEvents from "$components/PreventSomeDefaultEvents.svelte"
    import "../app.postcss"
</script>

<PreventSomeDefaultEvents />
<LoadingBar />
<slot />
<Toaster />
