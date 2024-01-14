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
            items={data.tiers.map(tier => ({
                value: tier.id,
                label: tier.name,
            }))}
            value={selectedRetainedTiers}
            multiple={true}
            on:input={e => {
                selectedRetainedTiers = e.detail || []
            }}
            placeholder="Add tiers"
            placeholderAlwaysShow={$_form.retainedTiers.length !==
                data.tiers.length}
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
        />
    </Form>
</div>

<style lang="postcss">
    :global(.multi-item-text) {
        @apply inline-flex items-center text-sm;
    }
    :global(.value-container) {
        @apply !gap-2;
    }
    :global(.svelte-select) {
        --placeholder-color: theme(colors.gray.600);
        --list-empty-color: theme(colors.gray.500);
        --font-size: theme(fontSize.sm);
    }
    :global(.svelte-select .multi-item-clear) {
        @apply cursor-pointer px-1 text-base hover:text-white;
    }
    :global(.svelte-select .multi-item-text) {
        @apply order-2;
    }
</style>
