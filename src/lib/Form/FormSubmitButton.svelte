<script>
	export let disabled = false
	export let className = ""
	export { className as class }
</script>

<button
	class="{className} block h-14 w-full rounded bg-white text-gray-800"
	{disabled}
>
	<slot />
</button>
