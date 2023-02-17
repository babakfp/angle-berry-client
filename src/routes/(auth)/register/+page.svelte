<script>
	import Input from "$lib/Form/Input.svelte"
	import InputPassword from "$lib/Form/InputPassword.svelte"
	import SubmitButton from "$lib/Form/SubmitButton.svelte"
	import FormError from "$lib/Form/FormError.svelte"
	import {
		minUsernameLength,
		maxUsernameLength,
	} from "$lib/Form/formValidation.js"

	export let form
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<h1 class="font-bold text-4xl text-white">Register</h1>
<p class="text-gray-400">Welcome, please enter your details.</p>

<form class="mt-8 grid gap-4" method="POST">
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
	<SubmitButton>Register & login</SubmitButton>

	{#if form?.message}
		<FormError message={form?.message} usePrefix={true} />
	{/if}
</form>

<p class="mt-8 text-sm text-gray-400">
	Already have an account? <a class="text-white underline" href="/login"
		>Login hero</a
	>
</p>
