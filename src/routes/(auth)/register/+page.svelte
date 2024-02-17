<script lang="ts">
    import { superForm } from "sveltekit-superforms/client"
    import { schema } from "../schema"
    import AuthWrapper from "../AuthWrapper.svelte"
    import Form from "$components/form/Form.svelte"
    import UsernameField from "$components/form/UsernameField.svelte"
    import PasswordField from "$components/form/PasswordField.svelte"
    import toast from "svelte-french-toast"

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
    otherAuthPageLinkTitle="Login here"
    otherAuthPageLink="/login"
>
    <Form
        message={form?.message}
        submitButtonText="Register & Login"
        {errors}
        {validate}
        on:redirect={() => {
            toast.success("You have registered successfully!", {
                position: "bottom-right",
            })
        }}
    >
        <UsernameField
            bind:value={$_form.username}
            error={$errors?.username?.[0] ?? form?.pb?.username?.message}
            {...$constraints.username}
        />
        <PasswordField
            bind:value={$_form.password}
            autocomplete="new-password"
            error={$errors?.password?.[0] ?? form?.pb?.password?.message}
            {...$constraints.password}
        />
    </Form>
</AuthWrapper>
