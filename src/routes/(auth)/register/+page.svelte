<script>
    import { superForm } from "sveltekit-superforms/client"
    import AuthWrapper from "../AuthWrapper.svelte"
    import Form from "$comps/form/Form.svelte"
    import UsernameField from "$comps/form/fields/UsernameField.svelte"
    import PasswordField from "$comps/form/fields/PasswordField.svelte"

    export let data
    export let form

    const {
        form: _form,
        capture,
        restore,
        errors,
        constraints,
    } = superForm(data.form)
    export const snapshot = { capture, restore }

    let isSubmitting = false
    let isRedirecting = false
    function handleFormSubmit() {
        isSubmitting = true
        return async ({ result, update }) => {
            isSubmitting = false
            if (result.type === "redirect") {
                isRedirecting = true
            }
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
        message={form?.message}
        {isSubmitting}
        {handleFormSubmit}
        submitButtonText={isRedirecting ? "Redirecting..." : "Register & Login"}
    >
        <UsernameField
            bind:value={$_form.username}
            error={$errors?.username
                ? $errors?.username[0]
                : form?.data?.username?.message}
            {...$constraints.username}
        />
        <PasswordField
            bind:value={$_form.password}
            autocomplete="new-password"
            error={$errors?.password
                ? $errors?.password[0]
                : form?.data?.password?.message}
            {...$constraints.password}
        />
    </Form>
</AuthWrapper>
