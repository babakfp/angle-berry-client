<script lang="ts">
    import { page } from "$app/stores"
    import { superForm } from "sveltekit-superforms/client"
    import { schema } from "../(lib)/schema"
    import Wrapper from "../(lib)/Wrapper.svelte"
    import Form from "@/lib/components/form/Form.svelte"
    import UsernameField from "@/lib/components/form/UsernameField.svelte"
    import PasswordField from "@/lib/components/form/PasswordField.svelte"
    import toast from "svelte-french-toast"

    export let data
    export let form

    const {
        form: formData,
        capture,
        restore,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema })
    export const snapshot = { capture, restore }

    $: {
        const demoUsername = $page.url.searchParams.get("username")
        const demoPassword = $page.url.searchParams.get("password")

        if (demoUsername && demoPassword) {
            $formData.username = demoUsername
            $formData.password = demoPassword
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<Wrapper title="Login" description="Welcome back! Please enter your details.">
    <Form
        message={form?.message}
        submitButtonText="Login"
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("Logged in successfully!", {
                position: "bottom-right",
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
            autocomplete="current-password"
            error={$errors?.password?.[0] ?? form?.pb?.password?.message}
            {...$constraints.password}
        />
    </Form>
</Wrapper>
