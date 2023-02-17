<script>
	import FormError from "$lib/Form/FormError.svelte"

	export let type
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

	function handleInput(e) {
		// In here, you can switch on type and implement whatever behaviour you need
		if (type.match(/^(number|range)$/)) {
			value = +e.target.value
		} else {
			value = e.target.value
			if (forceToLowercase) {
				value = value.toLowerCase()
			}
			if (filterPattern) {
				value = value.replace(filterPattern, "")
			}
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
		<input
			class="{className} block h-12 w-full rounded bg-gray-700 px-4 placeholder:text-xs placeholder:text-gray-500"
			{type}
			{name}
			{value}
			{placeholder}
			{minlength}
			{maxlength}
			{autocomplete}
			{required}
			{readonly}
			on:input={handleInput}
		/>
		<slot name="under-input" />
	</div>

	{#if errorMessage}
		<FormError message={errorMessage} />
	{/if}
</label>
