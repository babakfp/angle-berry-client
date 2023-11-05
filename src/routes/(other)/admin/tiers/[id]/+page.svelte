<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import Input from "$components/form/Input.svelte"
    import { schema } from "../schema"
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

    if (!$_form.name) $_form.name = data.tier.name
    if (!$_form.price) $_form.price = data.tier.price
    if (!$_form.invites) $_form.invites = data.tier.invites
    if (!$_form.videos.length) $_form.videos = data.tier.videos

    $: selectedVideos = data.videos.filter(v => $_form.videos.includes(v.id))
</script>

<svelte:head>
    <title>Tier: {data.tier.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        method="post"
        message={form?.message}
        submitButtonText="Update"
        {errors}
        {validate}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$_form.name}
            placeholder={data.tier.name}
            error={$errors?.name ? $errors?.name[0] : form?.pb?.name?.message}
            {...$constraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$_form.price}
            placeholder={`${data.tier.price}`}
            error={$errors?.price
                ? $errors?.price[0]
                : form?.pb?.price?.message}
            {...$constraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$_form.invites}
            placeholder={`${data.tier.invites}`}
            error={$errors?.invites
                ? $errors?.invites[0]
                : form?.pb?.invites?.message}
            {...$constraints.invites}
        />
        <ul class="grid gap-8 rounded bg-gray-700 p-2">
            {#each selectedVideos as video, i}
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
