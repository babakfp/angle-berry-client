<script lang="ts">
    import PreventSomeDefaultEvents from "./PreventSomeDefaultEvents.svelte"
    import { LoadingBar } from "svelte-loading-bar"
    import "../app.postcss"
    import { Toaster } from "svelte-french-toast"
</script>

<PreventSomeDefaultEvents />
<LoadingBar />
<slot />
<Toaster />
