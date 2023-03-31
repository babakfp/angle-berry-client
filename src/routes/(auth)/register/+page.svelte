<script>
	import AuthWrapper from "../AuthWrapper.svelte"
	import Form from "$lib/Form/Form.svelte"
	import InputPassword from "$lib/Form/InputPassword.svelte"
	import UsernameField from "$lib/Form/Fields/UsernameField.svelte"

	export let form

	let formData = {
		username: form?.username?.value || "",
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
	<title>Register</title>
</svelte:head>

<AuthWrapper
	title="Register"
	description="Welcome, please enter your details."
	otherAuthPageTitle="Already have an account?"
	otherAuthPageLinkTitle="Login hero"
	otherAuthPageLink="/login"
>
	<Form
		method="POST"
		{form}
		{isSubmitting}
		{handleFormSubmit}
		submitButtonText="Register & Login"
	>
		<UsernameField
			bind:value={formData.username}
			message={form?.username?.message}
		/>
		<InputPassword
			name="password"
			label="Password"
			placeholder="Something that no one knows."
			autocomplete="new-password"
			required={true}
			errorMessage={form?.password?.message}
			bind:value={formData.password}
		/>
	</Form>
</AuthWrapper>
