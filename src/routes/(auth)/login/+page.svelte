<script>
	import {
		minUsernameLength,
		maxUsernameLength,
	} from "$lib/Form/formValidation.js"
	import AuthWrapper from "../AuthWrapper.svelte"
	import Form from "$lib/Form/Form.svelte"
	import Input from "$lib/Form/Input.svelte"
	import InputPassword from "$lib/Form/InputPassword.svelte"

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

<AuthWrapper
	title="Login"
	description="Welcome back! Please enter your details."
	otherAuthPageTitle="Don't have an account?"
	otherAuthPageLinkTitle="Register hero"
	otherAuthPageLink="/register"
>
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
</AuthWrapper>
