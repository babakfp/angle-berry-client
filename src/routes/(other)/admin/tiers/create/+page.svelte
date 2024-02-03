<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import Input from "$components/form/Input.svelte"
    import { formSchemaCreateTier } from "../schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Modal from "$components/Modal.svelte"
    import VideoGalleryItem from "../VideoGalleryItem.svelte"
    import { fade } from "svelte/transition"
    import Select from "$components/Select.svelte"
    import { TiersVisibilityOptions } from "$utilities/pb/types"
    import { capitalizeFirstLetter } from "$utilities/capitalizeFirstLetter"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: formSchemaCreateTier })

    let isGalleryPopupOpen = false
</script>

<svelte:head>
    <title>Create tier</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form message={form?.message} submitButtonText="Create" {errors} {validate}>
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$_form.name}
            error={$errors?.name?.[0] ?? form?.pb?.name?.message}
            {...$constraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$_form.price}
            error={$errors?.price?.[0] ?? form?.pb?.price?.message}
            {...$constraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$_form.invites}
            error={$errors?.invites?.[0] ?? form?.pb?.invites?.message}
            {...$constraints.invites}
        />
        <Select
            label="Select visibility"
            options={Object.values(TiersVisibilityOptions).map(value => ({
                value,
                label: capitalizeFirstLetter(value),
            }))}
            bind:selectedOptionValue={$_form.visibility}
            isMultiple={false}
            error={$errors?.visibility?.[0] ?? form?.pb?.visibility?.message}
        />
        <div class="hidden">
            <Input
                type="text"
                name="visibility"
                value={$_form.visibility}
                {...$constraints.visibility}
            />
        </div>
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each $_form.videos as id (id)}
                {@const video = data.videos.filter(video => video.id === id)[0]}
                <li transition:fade>
                    <VideoGalleryItem
                        src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        checked={$_form.videos.includes(video.id)}
                        bind:group={$_form.videos}
                        value={video.id}
                    />
                </li>
            {/each}
            <button
                type="button"
                class="btn btn-gray sticky bottom-2"
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
        {#each data.videos as video (video.id)}
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
            type="button"
            class="btn btn-gray"
            on:click={() => (isGalleryPopupOpen = false)}>Close</button
        >
    </svelte:fragment>
</Modal>
