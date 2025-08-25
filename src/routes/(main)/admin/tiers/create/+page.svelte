<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { fade } from "svelte/transition"
    import { superForm } from "sveltekit-superforms/client"
    import { PUBLIC_PB_URL } from "$env/static/public"
    import Form from "$lib/components/form/Form.svelte"
    import Input from "$lib/components/form/Input.svelte"
    import Select from "$lib/components/form/Select.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import { capitalizeFirstLetter } from "$lib/utilities/capitalizeFirstLetter"
    import { TIERS_RECORD_VISIBILITY_OPTIONS } from "$lib/utilities/pb"
    import { schema } from "../schema"
    import VideoGalleryItem from "../VideoGalleryItem.svelte"

    let { data, form } = $props()

    const {
        form: formData,
        errors,
        constraints,
        validateForm,
    } = superForm(data.form, { validators: schema.create })

    let isGalleryPopupOpen = $state(false)
</script>

<svelte:head>
    <title>Tier / Create</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        message={form?.message}
        submitButtonText="Create"
        {errors}
        {validateForm}
        on:redirect={() => {
            toast.success("Created successfully!", {
                position: "bottom-end",
            })
        }}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$formData.name}
            error={$errors?.name?.[0] ?? form?.pb?.name?.message}
            {...$constraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$formData.price}
            error={$errors?.price?.[0] ?? form?.pb?.price?.message}
            {...$constraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$formData.invites}
            error={$errors?.invites?.[0] ?? form?.pb?.invites?.message}
            {...$constraints.invites}
        />
        <Select
            label="Visibility"
            placeholder="Select visibility"
            options={Object.values(TIERS_RECORD_VISIBILITY_OPTIONS).map(
                (value) => ({
                    value,
                    label: capitalizeFirstLetter(value),
                }),
            )}
            bind:selectedOptionValue={$formData.visibility}
            isMultiple={false}
            error={$errors?.visibility?.[0] ?? form?.pb?.visibility?.message}
            {...$constraints.visibility}
            name="visibility"
        />
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each $formData.videos as id (id)}
                {@const video = data.videos.filter(
                    (video) => video.id === id,
                )[0]}
                <li transition:fade>
                    <VideoGalleryItem
                        src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        checked={$formData.videos.includes(video.id)}
                        bind:group={$formData.videos}
                        value={video.id}
                        name="videos"
                    />
                </li>
            {/each}
            <button
                type="button"
                class="btn btn-gray sticky bottom-2"
                onclick={() => (isGalleryPopupOpen = true)}
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
                    src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                    checked={$formData.videos.includes(video.id)}
                    bind:group={$formData.videos}
                    value={video.id}
                />
            </li>
        {/each}
    </ul>
    {#snippet actions()}
        <button
            type="button"
            class="btn btn-gray"
            onclick={() => (isGalleryPopupOpen = false)}
        >
            Close
        </button>
    {/snippet}
</Modal>
