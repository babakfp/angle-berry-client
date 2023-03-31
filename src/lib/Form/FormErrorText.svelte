<script>
	export let message
	export let usePrefix = false
</script>

{#if message}
	<p class="mt-2 text-xs text-red-500">
		{usePrefix ? "Error: " : ""}{message}
	</p>
{/if}
