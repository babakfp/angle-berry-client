<script lang="ts">
    import toast from "svelte-french-toast"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "@/components/form/Form.svelte"
    import PasswordField from "@/components/form/PasswordField.svelte"
    import UsernameField from "@/components/form/UsernameField.svelte"
    import { schema } from "../(lib)/schema"
    import Wrapper from "../(lib)/Wrapper.svelte"

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
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<Wrapper title="Register" description="Welcome, please enter your details.">
    <Form
        message={form?.message}
        submitButtonText="Register"
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("Registered successfully!", {
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
            autocomplete="new-password"
            error={$errors?.password?.[0] ?? form?.pb?.password?.message}
            {...$constraints.password}
        />
    </Form>
</Wrapper>
