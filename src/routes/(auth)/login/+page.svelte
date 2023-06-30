<script>
    import { page } from "$app/stores"
    import AuthWrapper from "../AuthWrapper.svelte"
    import Form from "$comps/form/Form.svelte"
    import UsernameField from "$comps/form/fields/UsernameField.svelte"
    import PasswordField from "$comps/form/fields/PasswordField.svelte"

    export let form

    let formData = {
        username:
            $page.url.searchParams.get("username") ||
            form?.username?.value ||
            form?.identity?.value ||
            "",
        password: $page.url.searchParams.get("password") || "",
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
        message={form?.message}
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
