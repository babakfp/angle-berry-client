<script>
	export let className = ""
	export { className as class }
</script>

<div class="{className} group relative inline-block">
	<slot />
</div>
