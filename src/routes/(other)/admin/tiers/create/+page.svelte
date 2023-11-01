<script>
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import Input from "$components/form/Input.svelte"
    import { schema } from "../schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Modal from "$components/Modal.svelte"
    import VideoGalleryItem from "../VideoGalleryItem.svelte"

    export let data
    export let form

    let isGalleryPopupOpen = false

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: schema })
</script>

<svelte:head>
    <title>Create tier</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        method="POST"
        message={form?.message}
        submitButtonText="Create"
        {errors}
        {validate}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$_form.name}
            error={$errors?.name ? $errors?.name[0] : form?.data?.name?.message}
            {...$constraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$_form.price}
            error={$errors?.price
                ? $errors?.price[0]
                : form?.data?.price?.message}
            {...$constraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$_form.invites}
            error={$errors?.invites
                ? $errors?.invites[0]
                : form?.data?.invites?.message}
            {...$constraints.invites}
        />
        <ul class="grid gap-8 rounded bg-gray-700 p-2">
            {#each $_form.videos as video, i}
                <li>
                    <VideoGalleryItem
                        src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        checked={$_form.videos.includes(video.id)}
                        bind:group={$_form.videos}
                        value={video.id}
                    />
                </li>
            {/each}
            <button
                class="btn btn-gray sticky bottom-0"
                type="button"
                on:click={() => (isGalleryPopupOpen = true)}
            >
                Videos gallery
            </button>
        </ul>
    </Form>
</div>

<Modal
    title="Videos gallery"
    bind:isOpen={isGalleryPopupOpen}
    isFullSize={true}
>
    <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.videos as video}
            <li>
                <VideoGalleryItem
                    src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                    checked={$_form.videos.includes(video.id)}
                    bind:group={$_form.videos}
                    value={video.id}
                />
            </li>
        {/each}
    </ul>
    <svelte:fragment slot="actions">
        <button
            class="btn btn-gray"
            on:click={() => (isGalleryPopupOpen = false)}>Close</button
        >
    </svelte:fragment>
</Modal>
