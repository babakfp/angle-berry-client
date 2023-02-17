<script>
	import FormError from "$lib/Form/FormError.svelte"

	export let name
	export let label = null
	export let value = null
	export let placeholder = null
	export let autocomplete = null
	export let minlength = null
	export let maxlength = null
	export let required = false
	export let readonly = false
	export let filterPattern = null
	export let forceToLowercase = false
	export let className = null
	export { className as class }
	export let errorMessage = null
	export let element = null

	function handleInput(e) {
		value = e.target.value
		if (forceToLowercase) {
			value = value.toLowerCase()
		}
		if (filterPattern) {
			value = value.replace(filterPattern, "")
		}
	}
</script>

<label>
	{#if label}
		<span class="relative inline-block">
			{label}
			{#if required}
				<span class="absolute -right-2.5 top-px text-gray-500">*</span>
			{/if}
		</span>
	{/if}
	<div class="relative">
		<textarea
			bind:this={element}
			class="{className} block max-h-64 min-h-14 w-full resize-none rounded bg-gray-700 p-4 placeholder:text-gray-500"
			rows="1"
			{name}
			bind:value
			{placeholder}
			{autocomplete}
			{minlength}
			{maxlength}
			{required}
			{readonly}
		/>
	</div>

	{#if errorMessage}
		<FormError message={errorMessage} />
	{/if}
</label>
