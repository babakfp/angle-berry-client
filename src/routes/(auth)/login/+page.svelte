<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { beforeNavigate } from "$app/navigation"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import LoginWithoutRegistering from "./(lib)/LoginWithoutRegistering.svelte"
    import { login } from "./login.remote"

    type Fields = ReturnType<typeof login.fields.value>

    export const snapshot = {
        capture: () => login.fields.value(),
        restore: (data: Fields) => login.fields.set(data),
    }

    const formMessage = $derived(
        login.fields.allIssues()?.find((i) => !i.path.length)?.message,
    )

    beforeNavigate(() => {
        toast.success("Logged in successfully!")
    })
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
    <Form {...login} message={formMessage} submitButtonText="Login">
        <LoginWithoutRegistering />

        <!-- TODO: constraints lost after switching away from sveltekit-superforms -->
        <UsernameField
            {...login.fields.username.as("text")}
            error={login.fields.username.issues()?.[0]?.message}
        />

        <PasswordField
            {...login.fields.password.as("password")}
            error={login.fields.password.issues()?.[0]?.message}
            autocomplete="current-password"
        />
    </Form>
</Wrapper>
