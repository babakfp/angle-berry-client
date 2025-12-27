<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import LoginWithoutRegistering from "./(lib)/LoginWithoutRegistering.svelte"
    import { login } from "./login.remote"

    export const snapshot = {
        capture: () => login.fields.value(),
        restore: (data: ReturnType<typeof login.fields.value>) => {
            return login.fields.set(data)
        },
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<Wrapper
    title="Login"
    description="Welcome back! Please enter your details."
    footerText="Don't have an account?"
    footerLinkText="Register here"
    footerLinkHref="/register"
>
    <Form
        message={form?.message}
        submitButtonText="Login"
        {errors}
        {validateForm}
        onRedirect={() => {
            toast.success("Logged in successfully!")
        }}
    >
        <LoginWithoutRegistering />

        <UsernameField
            bind:value={$formData.username}
            error={$errors?.username?.[0]}
            {...$constraints.username}
        />
        <PasswordField
            bind:value={$formData.password}
            autocomplete="current-password"
            error={$errors?.password?.[0]}
            {...$constraints.password}
        />
    </Form>
</Wrapper>
