<script>
	import Form from "$lib/Form/Form.svelte"
	import Input from "$lib/Form/Input.svelte"
	import InputPassword from "$lib/Form/InputPassword.svelte"
	import {
		minUsernameLength,
		maxUsernameLength,
	} from "$lib/Form/formValidation.js"

	export let form

	let formData = {
		username: form?.username?.value || form?.identity?.value || "",
		password: "",
	}

	export const snapshot = {
		capture: () => formData,
		restore: value => (formData = value),
	}

	let isSubmitting = false
	function handleFormSubmit() {
		isSubmitting = true
		return async ({ update }) => {
			isSubmitting = false
			update()
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1 class="text-4xl font-bold text-white">Login</h1>
<p class="text-gray-400">Welcome back! Please enter your details.</p>

<Form
	method="POST"
	{form}
	{isSubmitting}
	{handleFormSubmit}
	submitButtonText="Login"
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
		errorMessage={form?.username?.message || form?.identity?.message}
		bind:value={formData.username}
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
		bind:value={formData.password}
	/>
</Form>

<p class="mt-8 text-sm text-gray-400">
	Don't have an account? <a class="text-white underline" href="/register">
		Register hero
	</a>
</p>
