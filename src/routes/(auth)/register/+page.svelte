<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { goto } from "$app/navigation"
    import { resolve } from "$app/paths"
    import Form from "$lib/components/form/Form.svelte"
    import PasswordField from "$lib/components/form/PasswordField.svelte"
    import UsernameField from "$lib/components/form/UsernameField.svelte"
    import {
        useIssue,
        useSnapshot,
        validateOnBlur,
        validateOnInput,
    } from "$lib/utilities/remote-functions/form"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import { register } from "./register.remote"

    export const snapshot = useSnapshot(register)

    const SUCCESSFULL_REGISTER_MESSAGE = "Registered successfully!"
    const formIssue = $derived(useIssue(register))
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
                toast.success(SUCCESSFULL_REGISTER_MESSAGE)
                goto(resolve(register.result.redirect))
            }
        }}
        message={register.result?.redirect ?
            SUCCESSFULL_REGISTER_MESSAGE
        :   formIssue}
        isRedirecting={!!register.result?.redirect}
        submitButtonText="Register"
    >
        <UsernameField
            {...register.fields.username.as("text")}
            error={register.fields.username.issues()?.[0]?.message}
            onblur={() => validateOnBlur(register)}
            oninput={() => validateOnInput(register)}
        />

        <PasswordField
            {...register.fields.password.as("password")}
            error={register.fields.password.issues()?.[0]?.message}
            onblur={() => validateOnBlur(register)}
            oninput={() => validateOnInput(register)}
            autocomplete="new-password"
        />
    </Form>
</Wrapper>
