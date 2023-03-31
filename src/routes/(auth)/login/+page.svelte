<script>
	import AuthWrapper from "../AuthWrapper.svelte"
	import Form from "$lib/Form/Form.svelte"
	import UsernameField from "$lib/Form/Fields/UsernameField.svelte"
	import PasswordField from "$lib/Form/Fields/PasswordField.svelte"

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
		<UsernameField
			bind:value={formData.username}
			message={form?.username?.message || form?.identity?.message}
		/>
		<PasswordField
			bind:value={formData.password}
			autocomplete="current-password"
			message={form?.password?.message}
		/>
	</Form>
</AuthWrapper>
