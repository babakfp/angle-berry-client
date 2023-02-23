<script>
	import { fly } from "svelte/transition"
	import { page } from "$app/stores"
	import { pageTransitionValues } from "$lib/pageTransitionValues.js"
</script>

{#key $page.url.pathname}
	<div
		class="min-h-dscreen mx-auto grid w-full max-w-xs content-center items-center py-12"
		in:fly={pageTransitionValues}
	>
		<slot />
	</div>
{/key}
