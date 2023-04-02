<script>
	export let message = ""
	export let className
	export { className as class }
</script>

{#if message}
	<p class="{className} text-xs text-red-500">
		{message}
	</p>
{/if}
