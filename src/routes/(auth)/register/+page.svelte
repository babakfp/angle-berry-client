<script>
	import { enhance } from "$app/forms"
	import Input from "$lib/Form/Input.svelte"
	import InputPassword from "$lib/Form/InputPassword.svelte"
	import SubmitButton from "$lib/Form/SubmitButton.svelte"
	import FormError from "$lib/Form/FormError.svelte"
	import {
		minUsernameLength,
		maxUsernameLength,
	} from "$lib/Form/formValidation.js"

	export let form

	let isRegistering = false
	function handleRegistering() {
		isRegistering = true
		return async ({ update }) => {
			isRegistering = false
			update()
		}
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<h1 class="font-bold text-4xl text-white">Register</h1>
<p class="text-gray-400">Welcome, please enter your details.</p>

<form
	class="mt-8 grid gap-4 {isRegistering && 'pointer-events-none'}"
	method="POST"
	use:enhance={handleRegistering}
>
	<Input
		type="text"
		name="username"
		label="Username"
		placeholder="Only lowercase letters and numbers."
		autocomplete="username"
		minlength={minUsernameLength}
		maxlength={maxUsernameLength}
		required={true}
		errorMessage={form?.username?.message}
		value={form?.username?.value || ""}
		filterPattern={/[^a-z0-9]+/g}
		forceToLowercase={true}
	/>
	<InputPassword
		name="password"
		label="Password"
		placeholder="Something that no one knows."
		autocomplete="new-password"
		required={true}
		errorMessage={form?.password?.message}
	/>
	<SubmitButton disabled={isRegistering}>
		{#if isRegistering}
			<!-- prettier-ignore -->
			<svg class="text-2xl animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
			</svg>
		{:else}
			Register & login
		{/if}
	</SubmitButton>

	{#if form?.message}
		<FormError message={form?.message} usePrefix={true} />
	{/if}
</form>

<p class="mt-8 text-sm text-gray-400">
	Already have an account? <a class="text-white underline" href="/login"
		>Login hero</a
	>
</p>
