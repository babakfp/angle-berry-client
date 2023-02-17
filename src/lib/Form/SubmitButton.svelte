<script>
	export let className = null
	export { className as class }
</script>

<button
	class="{className} block h-14 w-full rounded bg-white text-gray-800 outline-4"
>
	<slot />
</button>
