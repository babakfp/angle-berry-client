<script lang="ts">
    import toast from "svelte-french-toast"
    import { superForm } from "sveltekit-superforms/client"
    import Checkbox from "@/components/form/Checkbox.svelte"
    import Form from "@/components/form/Form.svelte"
    import Input from "@/components/form/Input.svelte"
    import Select from "@/components/form/Select.svelte"
    import { isUserACreatedBeforeUserB } from "@/utilities/isUserACreatedBeforeUserB"
    import { schema } from "./schema"

    export let data
    export let form

    const {
        form: formData,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema })

    if (!$formData.isAdmin) $formData.isAdmin = data.targetUser.isAdmin
    if (!$formData.retainedTiers.length)
        $formData.retainedTiers = data.targetUser.retainedTiers

    let selectedRetainedTiers = data.tiers
        .filter((tier) => $formData.retainedTiers.includes(tier.id))
        .map((tier) => ({ value: tier.id, label: tier.name }))

    $: $formData.retainedTiers = selectedRetainedTiers.map((tier) => tier.value)
</script>

<svelte:head>
    <title>User : {data.targetUser.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        class="mt-4"
        message={form?.message}
        submitButtonText="Update"
        submitButtonClass={data.loggedInUser.id !== data.targetUser.id &&
        data.targetUser.isAdmin &&
        !isUserACreatedBeforeUserB(data.loggedInUser, data.targetUser)
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
            value={data.targetUser.username}
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
            readonly={data.loggedInUser.id !== data.targetUser.id &&
                data.targetUser.isAdmin &&
                !isUserACreatedBeforeUserB(data.loggedInUser, data.targetUser)}
        />

        <Checkbox
            class="justify-self-start"
            bind:checked={$formData.isAdmin}
            name="isAdmin"
            {...$constraints.isAdmin}
            label="Role admin"
            error={$errors?.isAdmin?.[0] ?? form?.pb?.isAdmin?.message}
            readonly={data.loggedInUser.id === data.targetUser.id ||
                (data.targetUser.isAdmin &&
                    !isUserACreatedBeforeUserB(
                        data.loggedInUser,
                        data.targetUser,
                    ))}
        />
    </Form>
</div>
