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
		class="btn btn-inner-input text-2xs"
		type="button"
		on:click={() => (isPasswordVisible = !isPasswordVisible)}
	>
		<span class="duration-100 {isPasswordVisible && 'scale-50 hide'}">
			Show
		</span>
		<span
			class="absolute duration-100
				{!isPasswordVisible && 'scale-50 hide'}
			"
		>
			Hide
		</span>
	</button>
</TextField>
