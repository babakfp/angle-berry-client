<script>
	import Input from "$lib/Form/Input.svelte"
	import {
		minPasswordLength,
		maxPasswordLength,
	} from "$lib/Form/formValidation.js"

	export let name
	export let label = null
	export let value = null
	export let placeholder = null
	export let autocomplete = null
	export let required = false
	export let filterPattern = null
	export let forceToLowercase = false
	export let className = null
	export { className as class }
	export let errorMessage = null

	let isPasswordVisible = false
</script>

<Input
	class="{className} pr-14"
	type={isPasswordVisible ? "text" : "password"}
	{name}
	{label}
	bind:value
	{placeholder}
	{autocomplete}
	minlength={minPasswordLength}
	maxlength={maxPasswordLength}
	{required}
	{filterPattern}
	{forceToLowercase}
	{errorMessage}
>
	<button
		slot="under-input"
		class="absolute inset-y-0 right-0 flex w-14 items-center justify-center rounded bg-gray-700 pt-0.5 text-2xs -outline-offset-2"
		type="button"
		on:click={() => (isPasswordVisible = !isPasswordVisible)}
	>
		<span class="duration-150 {isPasswordVisible && 'scale-50 hide'}">
			Show
		</span>
		<span
			class="absolute duration-150 {!isPasswordVisible &&
				'scale-50 hide'}"
		>
			Hide
		</span>
	</button>
</Input>
