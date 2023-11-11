<script lang="ts">
    import { schema } from "./schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: schema })

    if (!$_form.isAdmin) $_form.isAdmin = data.user.isAdmin

    // $: selectedVideos = data.videos.filter(v => $_form.videos.includes(v.id))
</script>

<svelte:head>
    <title>User: {data.user.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        method="post"
        message={form?.message}
        submitButtonText="Update"
        {errors}
        {validate}
    >
        <label class="inline-flex gap-2">
            <Checkbox
                bind:checked={$_form.isAdmin}
                name="isAdmin"
                {...$constraints.isAdmin}
            />
            Is admin? {$_form.isAdmin ? "Yes ⚒️" : "No"}
        </label>
    </Form>
</div>
