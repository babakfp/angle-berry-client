<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { goto } from "$app/navigation"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import { allowNonLoggedInOnly } from "$lib/remotes/allowNonLoggedInOnly.remote"
    import {
        useIssue,
        useSnapshot,
        validateOnBlur,
        validateOnInput,
    } from "$lib/utilities/remote-forms"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import LoginWithoutRegistering from "./(lib)/LoginWithoutRegistering.svelte"
    import { login } from "./login.remote"

    await allowNonLoggedInOnly()

    export const snapshot = useSnapshot(login)

    const SUCCESSFULL_LOGIN_MESSAGE = "Logged in successfully!"
    const loginIssue = $derived(useIssue(login))
    let isRedirecting = $state(false)
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
        form={login}
        enhance={async ({ submit }) => {
            await login.validate()

            if (login.fields.allIssues()?.length) {
                return
            }

            // TOOD?: await submit().updates(allowNonLoggedInOnly())
            await submit()

            if (loginIssue) {
                toast.error(loginIssue)
            }

            if (login.result?.redirect) {
                toast.success(SUCCESSFULL_LOGIN_MESSAGE)
                isRedirecting = true
                await goto(login.result.redirect)
                isRedirecting = false
            }
        }}
        message={isRedirecting ? SUCCESSFULL_LOGIN_MESSAGE : loginIssue}
        {isRedirecting}
        submitButtonText="Login"
    >
        <LoginWithoutRegistering />

        <!-- TODO: constraints are lost (for all forms) after migration to remote functions -->
        <UsernameField
            {...login.fields.username.as("text")}
            error={login.fields.username.issues()?.[0]?.message}
            onblur={() => validateOnBlur(login)}
            oninput={() => validateOnInput(login)}
        />

        <PasswordField
            {...login.fields.password.as("password")}
            error={login.fields.password.issues()?.[0]?.message}
            autocomplete="current-password"
            onblur={() => validateOnBlur(login)}
            oninput={() => validateOnInput(login)}
        />
    </Form>
</Wrapper>
