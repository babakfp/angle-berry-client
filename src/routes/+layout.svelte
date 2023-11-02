<script lang="ts">
    import PreventSomeDefaultEvents from "./PreventSomeDefaultEvents.svelte"
    import { LoadingBar } from "svelte-loading-bar"
    import "../app.postcss"
</script>

<PreventSomeDefaultEvents />
<LoadingBar />
<slot />
