<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { goto } from "$app/navigation"
    import { resolve } from "$app/paths"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import { register } from "./register.remote"

    const REDIRECT_MESSAGE = "Registered successfully!"

    type Fields = ReturnType<typeof register.fields.value>

    export const snapshot = {
        capture: () => register.fields.value(),
        restore: (fields: Fields) => register.fields.set(fields),
    }

    const formIssue = $derived(
        register.fields.allIssues()?.find((issue) => {
            return !issue.path.length
        })?.message,
    )
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<Wrapper
    title="Register"
    description="Welcome, please enter your details."
    footerText="Already have an account?"
    footerLinkText="Login here"
    footerLinkHref="/login"
>
    <Form
        form={register}
        enhance={async ({ submit }) => {
            await register.validate()

            if (register.fields.allIssues()?.length) {
                return
            }

            await submit()

            if (formIssue) {
                toast.error(formIssue)
            }

            if (register.result?.redirect) {
                toast.success(REDIRECT_MESSAGE)
                goto(resolve(register.result.redirect))
            }
        }}
        message={register.result?.redirect ? REDIRECT_MESSAGE : formIssue}
        isRedirecting={!!register.result?.redirect}
        submitButtonText="Register"
    >
        <UsernameField
            {...register.fields.username.as("text")}
            error={register.fields.username.issues()?.[0]?.message}
            onblur={() => {
                if (!!register.result) return
                register.validate()
            }}
            oninput={() => {
                if (!!register.result) return
                if (!register.fields.allIssues()?.length) return
                register.validate()
            }}
        />

        <PasswordField
            {...register.fields.password.as("password")}
            error={register.fields.password.issues()?.[0]?.message}
            autocomplete="new-password"
            onblur={() => {
                if (!!register.result) return
                register.validate()
            }}
            oninput={() => {
                if (!!register.result) return
                if (!register.fields.allIssues()?.length) return
                register.validate()
            }}
        />
    </Form>
</Wrapper>
