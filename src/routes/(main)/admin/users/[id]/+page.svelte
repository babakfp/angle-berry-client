<script lang="ts">
    import { schema } from "./schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "@/lib/components/form/Form.svelte"
    import Checkbox from "@/lib/components/form/Checkbox.svelte"
    import Input from "@/lib/components/form/Input.svelte"
    import Select from "@/lib/components/form/Select.svelte"
    import toast from "svelte-french-toast"
    import { isUserACreatedBeforeUserB } from "@/lib/utilities/isUserACreatedBeforeUserB"

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
    <title>User : {data.userToEdit.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        class="mt-4"
        message={form?.message}
        submitButtonText="Update"
        submitButtonClass={data.user.id !== data.userToEdit.id &&
        data.userToEdit.isAdmin &&
        !isUserACreatedBeforeUserB(data.user, data.userToEdit)
            ? "btn-brand pointer-events-none opacity-50"
            : ""}
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("Updated successfully!", {
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
            readonly={data.user.id !== data.userToEdit.id &&
                data.userToEdit.isAdmin &&
                !isUserACreatedBeforeUserB(data.user, data.userToEdit)}
        />

        <Checkbox
            class="justify-self-start"
            bind:checked={$_form.isAdmin}
            name="isAdmin"
            {...$constraints.isAdmin}
            label="Role admin"
            error={$errors?.isAdmin?.[0] ?? form?.pb?.isAdmin?.message}
            readonly={data.user.id === data.userToEdit.id ||
                (data.userToEdit.isAdmin &&
                    !isUserACreatedBeforeUserB(data.user, data.userToEdit))}
        />
    </Form>
</div>
