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
	<title>Login</title>
</svelte:head>

<h1 class="font-bold text-4xl text-white">Login</h1>
<p class="text-gray-400">Welcome back! Please enter your details.</p>

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
		errorMessage={form?.username?.message || form?.identity?.message}
		value={form?.username?.value || form?.identity?.value || ""}
		filterPattern={/[^a-z0-9]+/g}
		forceToLowercase={true}
	/>
	<InputPassword
		name="password"
		label="Password"
		placeholder="Something that no one knows."
		autocomplete="current-password"
		required={true}
		errorMessage={form?.password?.message}
	/>
	<SubmitButton>Login</SubmitButton>

	{#if form?.message}
		<FormError message={form?.message} usePrefix={true} />
	{/if}
</form>

<p class="mt-8 text-sm text-gray-400">
	Don't have an account? <a class="text-white underline" href="/register"
		>Register hero</a
	>
</p>
