<script>
	import TextField from "./TextField.svelte"
	import {
		minPasswordLength,
		maxPasswordLength,
	} from "$lib/Form/formValidation.js"

	export let value = ""
	export let autocomplete = ""
	export let message = ""

	let isPasswordVisible = false
</script>

<TextField
	type={isPasswordVisible ? "text" : "password"}
	bind:value
	name="password"
	label="Password"
	placeholder="Something that no one knows."
	{autocomplete}
	minlength={minPasswordLength}
	maxlength={maxPasswordLength}
	required={true}
	{message}
>
	<button
		slot="buttons"
		class="btn btn-gray overflow-hidden px-3 text-2xs lowercase"
		type="button"
		on:click={() => (isPasswordVisible = !isPasswordVisible)}
	>
		<span
			class="mt-0.5 duration-100
				{isPasswordVisible && '-translate-y-4 scale-50 hide'}
			"
		>
			Show
		</span>
		<span
			class="absolute mt-0.5 duration-100
				{!isPasswordVisible && 'translate-y-4 scale-50 hide'}
			"
		>
			Hide
		</span>
	</button>
</TextField>
