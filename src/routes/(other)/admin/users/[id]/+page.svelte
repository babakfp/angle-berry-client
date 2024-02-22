<script lang="ts">
    import { schema } from "./schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"
    import Input from "$components/form/Input.svelte"
    import Select from "$components/form/Select.svelte"
    import toast from "svelte-french-toast"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema })

    if (!$_form.isAdmin) $_form.isAdmin = data.userToEdit.isAdmin
    if (!$_form.retainedTiers.length)
        $_form.retainedTiers = data.userToEdit.retainedTiers

    let selectedRetainedTiers = data.tiers
        .filter((tier) => $_form.retainedTiers.includes(tier.id))
        .map((tier) => ({ value: tier.id, label: tier.name }))

    $: $_form.retainedTiers = selectedRetainedTiers.map((tier) => tier.value)
</script>

<svelte:head>
    <title>User: {data.userToEdit.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        class="mt-4"
        message={form?.message}
        submitButtonText="Update"
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("User updated successfully!", {
                position: "bottom-right",
            })
        }}
    >
        <Input
            label="Username"
            value={data.userToEdit.username}
            readonly={true}
        />

        <Select
            label="Tiers"
            placeholder="Select tiers"
            options={data.tiers.map((tier) => ({
                value: tier.id,
                label: tier.name,
            }))}
            bind:selectedOptions={selectedRetainedTiers}
            error={$errors?.retainedTiers?.[0] ??
                form?.pb?.retainedTiers?.message}
            name="retainedTiers"
        />

        <Checkbox
            class="justify-self-start"
            bind:checked={$_form.isAdmin}
            name="isAdmin"
            {...$constraints.isAdmin}
            label="Role admin"
            error={$errors?.isAdmin?.[0] ?? form?.pb?.isAdmin?.message}
            readonly={data.userToEdit.isAdmin}
        />
    </Form>
</div>
