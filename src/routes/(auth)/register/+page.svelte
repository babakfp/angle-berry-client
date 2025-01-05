<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import { schema } from "../(lib)/schema"
    import Wrapper from "../(lib)/Wrapper.svelte"

    let { data, form } = $props()

    const {
        form: formData,
        capture,
        restore,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema })
    export const snapshot = { capture, restore }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<Wrapper
    title="Register"
    description="Welcome, please enter your details."
    footerText="Already have an account?"
    footerLinkText="Login here"
    FooterLinkHref="/login"
>
    <Form
        message={form?.message}
        submitButtonText="Register"
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("Registered successfully!", {
                position: "bottom-end",
            })
        }}
    >
        <UsernameField
            bind:value={$formData.username}
            error={$errors?.username?.[0] ?? form?.pb?.username?.message}
            {...$constraints.username}
        />
        <PasswordField
            bind:value={$formData.password}
            autocomplete="new-password"
            error={$errors?.password?.[0] ?? form?.pb?.password?.message}
            {...$constraints.password}
        />
    </Form>
</Wrapper>
