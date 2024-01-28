<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import Input from "$components/form/Input.svelte"
    import { formSchemaUpdateTier, formSchemaDeleteTier } from "../schema"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Modal from "$components/Modal.svelte"
    import VideoGalleryItem from "../VideoGalleryItem.svelte"
    import { fade } from "svelte/transition"

    export let data
    export let form

    const {
        form: formUpdateForm,
        errors: formUpdateErrors,
        constraints: formUpdateConstraints,
        validate: formUpdateValidate,
        formId: formUpdateFormId,
    } = superForm(data.formUpdate, { validators: formSchemaUpdateTier })

    if (!$formUpdateForm.name) $formUpdateForm.name = data.tier.name
    if (!$formUpdateForm.price) $formUpdateForm.price = data.tier.price
    if (!$formUpdateForm.invites) $formUpdateForm.invites = data.tier.invites
    if (!$formUpdateForm.videos.length)
        $formUpdateForm.videos = data.tier.videos

    $: selectedVideos = data.videos.filter(v =>
        $formUpdateForm.videos.includes(v.id),
    )

    let isGalleryPopupOpen = false

    const {
        errors: formDeleteErrors,
        validate: formDeleteValidate,
        formId: formDeleteFormId,
    } = superForm(data.formDelete, { validators: formSchemaDeleteTier })
</script>

<svelte:head>
    <title>Tier: {data.tier.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        action="?/update"
        message={form?.id === $formUpdateFormId && form?.message}
        submitButtonText="Update"
        errors={$formUpdateErrors}
        validate={formUpdateValidate}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$formUpdateForm.name}
            placeholder={data.tier.name}
            error={$formUpdateErrors?.name?.[0] ?? form?.pb?.name?.message}
            {...$formUpdateConstraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$formUpdateForm.price}
            placeholder={`${data.tier.price}`}
            error={$formUpdateErrors?.price?.[0] ?? form?.pb?.price?.message}
            {...$formUpdateConstraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$formUpdateForm.invites}
            placeholder={`${data.tier.invites}`}
            error={$formUpdateErrors?.invites?.[0] ??
                form?.pb?.invites?.message}
            {...$formUpdateConstraints.invites}
        />
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each selectedVideos as video (video.id)}
                <li transition:fade>
                    <VideoGalleryItem
                        src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        checked={$formUpdateForm.videos.includes(video.id)}
                        bind:group={$formUpdateForm.videos}
                        value={video.id}
                    />
                </li>
            {/each}
            <button
                class="btn btn-gray sticky bottom-2"
                type="button"
                on:click={() => (isGalleryPopupOpen = true)}
            >
                Videos gallery
            </button>
        </ul>
    </Form>

    <hr class="my-4 border-gray-700" />

    <Form
        action="?/delete"
        message={form?.id === $formDeleteFormId && form?.message}
        submitButtonText="Delete"
        submitButtonClass="btn-danger"
        errors={$formDeleteErrors}
        validate={formDeleteValidate}
    ></Form>
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
                    checked={$formUpdateForm.videos.includes(video.id)}
                    bind:group={$formUpdateForm.videos}
                    value={video.id}
                />
            </li>
        {/each}
    </ul>
    <svelte:fragment slot="actions">
        <button
            class="btn btn-gray"
            on:click={() => (isGalleryPopupOpen = false)}
        >
            Close
        </button>
    </svelte:fragment>
</Modal>
