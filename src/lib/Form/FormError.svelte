<script>
	export let message
	export let usePrefix = false
</script>

<p class="mt-2 text-xs text-error">{usePrefix ? "Error: " : ""}{message}</p>
