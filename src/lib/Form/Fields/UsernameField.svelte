<script>
	import TextField from "./TextField.svelte"
	import {
		minUsernameLength,
		maxUsernameLength,
	} from "$lib/Form/formValidation.js"

	export let value = ""
	export let message = ""

	$: {
		value = value.toLowerCase()
		value = value.replace(/[^a-z0-9]+/g, "")
	}
</script>

<TextField
	bind:value
	name="username"
	label="Username"
	placeholder="Only lowercase letters and numbers."
	autocomplete="username"
	minlength={minUsernameLength}
	maxlength={maxUsernameLength}
	required={true}
	{message}
/>
