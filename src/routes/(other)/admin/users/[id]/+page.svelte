<script lang="ts">
    import { schema } from "./schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"
    import Select from "$components/Select.svelte"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: schema })

    if (!$_form.isAdmin) $_form.isAdmin = data.user.isAdmin
    if (!$_form.retainedTiers.length)
        $_form.retainedTiers = data.user.retainedTiers

    let selectedRetainedTiers = data.tiers
        .filter(tier => $_form.retainedTiers.includes(tier.id))
        .map(tier => ({ value: tier.id, label: tier.name }))

    $: $_form.retainedTiers = selectedRetainedTiers.map(tier => tier.value)
</script>

<svelte:head>
    <title>User: {data.user.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form message={form?.message} submitButtonText="Update" {errors} {validate}>
        <Select
            label="Select tiers"
            options={data.tiers.map(tier => ({
                value: tier.id,
                label: tier.name,
            }))}
            bind:selectedOptions={selectedRetainedTiers}
        />

        {#each $_form.retainedTiers as t}
            <input
                class="hidden"
                type="checkbox"
                checked
                name="retainedTiers"
                value={t}
            />
        {/each}

        <Checkbox
            bind:checked={$_form.isAdmin}
            name="isAdmin"
            {...$constraints.isAdmin}
            label="Is admin? {$_form.isAdmin ? 'Yes' : 'No'}"
            disabled={data.user.isAdmin}
        />
    </Form>
</div>
