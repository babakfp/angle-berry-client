<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { superForm } from "sveltekit-superforms/client"
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import Form from "$lib/components/form/Form.svelte"
    import Input from "$lib/components/form/Input.svelte"
    import Select from "$lib/components/form/Select.svelte"
    import { isUserACreatedBeforeUserB } from "$lib/utilities/isUserACreatedBeforeUserB"
    import { schema } from "./schema"

    let { data, form } = $props()

    const {
        form: formData,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema })

    if (!$formData.isAdmin) $formData.isAdmin = data.targetUser.isAdmin
    if (!$formData.retainedTiers.length)
        $formData.retainedTiers = data.targetUser.retainedTiers

    let selectedRetainedTiers = $state(
        data.tiers
            .filter((tier) => $formData.retainedTiers.includes(tier.id))
            .map((tier) => ({ value: tier.id, label: tier.name })),
    )

    $effect(() => {
        $formData.retainedTiers = selectedRetainedTiers.map(
            (tier) => tier.value,
        )
    })
</script>

<svelte:head>
    <title>User : {data.targetUser.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-sm">
    <Form
        class="mt-4"
        message={form?.message}
        submitButtonText="Update"
        submitButtonClass={(
            data.loggedInUser.id !== data.targetUser.id
            && data.targetUser.isAdmin
            && !isUserACreatedBeforeUserB(data.loggedInUser, data.targetUser)
        ) ?
            "btn-brand pointer-events-none opacity-50"
        :   ""}
        {errors}
        {validateForm}
        onRedirect={() => {
            toast.success("Updated successfully!")
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
            error={$errors?.retainedTiers?.[0]
                ?? form?.pb?.retainedTiers?.message}
            name="retainedTiers"
            readonly={data.loggedInUser.id !== data.targetUser.id
                && data.targetUser.isAdmin
                && !isUserACreatedBeforeUserB(
                    data.loggedInUser,
                    data.targetUser,
                )}
        />

        <Checkbox
            class="justify-self-start"
            bind:checked={$formData.isAdmin}
            name="isAdmin"
            {...$constraints.isAdmin}
            label="Role admin"
            error={$errors?.isAdmin?.[0] ?? form?.pb?.isAdmin?.message}
            readonly={data.loggedInUser.id === data.targetUser.id
                || (data.targetUser.isAdmin
                    && !isUserACreatedBeforeUserB(
                        data.loggedInUser,
                        data.targetUser,
                    ))}
        />
    </Form>
</div>
