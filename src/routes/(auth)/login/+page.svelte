<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { goto } from "$app/navigation"
    import { resolve } from "$app/paths"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import LoginWithoutRegistering from "./(lib)/LoginWithoutRegistering.svelte"
    import { login } from "./login.remote"

    const REDIRECT_MESSAGE = "Logged in successfully!"

    type Fields = ReturnType<typeof login.fields.value>

    export const snapshot = {
        capture: () => login.fields.value(),
        restore: (fields: Fields) => login.fields.set(fields),
    }

    const formIssue = $derived(
        login.fields.allIssues()?.find((issue) => {
            return !issue.path.length
        })?.message,
    )
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

            await submit()

            if (formIssue) {
                toast.error(formIssue)
            }

            if (login.result?.redirect) {
                toast.success(REDIRECT_MESSAGE)
                goto(resolve(login.result.redirect))
            }
        }}
        message={login.result?.redirect ? REDIRECT_MESSAGE : formIssue}
        isRedirecting={!!login.result?.redirect}
        submitButtonText="Login"
    >
        <LoginWithoutRegistering />

        <!-- TODO: constraints lost after switching away from sveltekit-superforms -->
        <UsernameField
            {...login.fields.username.as("text")}
            error={login.fields.username.issues()?.[0]?.message}
            onblur={() => {
                if (!!login.result) return
                login.validate()
            }}
            oninput={() => {
                if (!!login.result) return
                if (!login.fields.allIssues()?.length) return
                login.validate()
            }}
        />

        <PasswordField
            {...login.fields.password.as("password")}
            error={login.fields.password.issues()?.[0]?.message}
            autocomplete="current-password"
            onblur={() => {
                if (!!login.result) return
                login.validate()
            }}
            oninput={() => {
                if (!!login.result) return
                if (!login.fields.allIssues()?.length) return
                login.validate()
            }}
        />
    </Form>
</Wrapper>
