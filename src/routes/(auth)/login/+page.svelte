<script lang="ts">
    import { page } from "$app/stores"
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

    if (
        $page.url.searchParams.get("username") &&
        $page.url.searchParams.get("password")
    ) {
        $_form.username = $page.url.searchParams.get("username")
        $_form.password = $page.url.searchParams.get("password")
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
        method="post"
        message={form?.message}
        submitButtonText="Login"
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
            autocomplete="current-password"
            error={$errors?.password
                ? $errors?.password[0]
                : form?.data?.password?.message}
            {...$constraints.password}
        />
    </Form>
</AuthWrapper>
