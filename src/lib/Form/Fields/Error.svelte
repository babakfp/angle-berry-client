<script>
	export let message = ""
</script>

{#if message}
	<p class="mt-2 text-xs text-red-500">
		{message}
	</p>
{/if}
