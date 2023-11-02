<script lang="ts">
    import { superForm } from "sveltekit-superforms/client"
    import { schema } from "../schema"
    import AuthWrapper from "../AuthWrapper.svelte"
    import Form from "$components/form/Form.svelte"
    import UsernameField from "$components/form/UsernameField.svelte"
    import PasswordField from "$components/form/PasswordField.svelte"

    export let data
    export let form

    const {
        form: _form,
        capture,
        restore,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: schema })
    export const snapshot = { capture, restore }
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
        method="post"
        message={form?.message}
        submitButtonText="Register & Login"
        {errors}
        {validate}
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
