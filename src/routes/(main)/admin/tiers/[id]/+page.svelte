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
        form: updateFormData,
        errors: updateFormErrors,
        constraints: updateFormConstraints,
        validateForm: updateFormValidate,
        formId: updateFormId,
    } = superForm(data.formUpdate, { validators: schema.update })

    if (!$updateFormData.name) $updateFormData.name = data.tier.name
    if (!$updateFormData.price) $updateFormData.price = data.tier.price
    if (!$updateFormData.invites) $updateFormData.invites = data.tier.invites
    if (!$updateFormData.videos.length)
        $updateFormData.videos = data.tier.videos

    let selectedVideos = $derived(
        data.videos.filter((v) => $updateFormData.videos.includes(v.id)),
    )

    const visibilityOptions = Object.values(
        TIERS_RECORD_VISIBILITY_OPTIONS,
    ).map((value) => ({
        value,
        label: capitalizeFirstLetter(value),
    }))

    let selectedVisibility = $state({
        value: data.tier.visibility,
        label: capitalizeFirstLetter(data.tier.visibility),
    })

    $effect(() => {
        $updateFormData.visibility = selectedVisibility.value
    })

    let isGalleryPopupOpen = $state(false)

    const {
        errors: deleteFormErrors,
        validateForm: deleteFormValidate,
        formId: deleteFormId,
    } = superForm(data.formDelete, { validators: schema.delete.single })
</script>

<svelte:head>
    <title>Tier : {data.tier.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-sm">
    <Form
        action="?/update"
        message={form?.id === $updateFormId && form?.message}
        submitButtonText="Update"
        errors={updateFormErrors}
        validateForm={updateFormValidate}
        on:redirect={() => {
            toast.success("Updated successfully!", {
                position: "bottom-end",
            })
        }}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$updateFormData.name}
            placeholder={data.tier.name}
            error={$updateFormErrors?.name?.[0] ?? form?.pb?.name?.message}
            {...$updateFormConstraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$updateFormData.price}
            placeholder={`${data.tier.price}`}
            error={$updateFormErrors?.price?.[0] ?? form?.pb?.price?.message}
            {...$updateFormConstraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$updateFormData.invites}
            placeholder={`${data.tier.invites}`}
            error={$updateFormErrors?.invites?.[0]
                ?? form?.pb?.invites?.message}
            {...$updateFormConstraints.invites}
        />
        <Select
            label="Visibility"
            placeholder="Select visibility"
            options={visibilityOptions}
            bind:selectedOption={selectedVisibility}
            isMultiple={false}
            error={$updateFormErrors?.visibility?.[0]
                ?? form?.pb?.visibility?.message}
            {...$updateFormConstraints.visibility}
            name="visibility"
        />
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each selectedVideos as video (video.id)}
                <li transition:fade>
                    <VideoGalleryItem
                        src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        checked={$updateFormData.videos.includes(video.id)}
                        bind:group={$updateFormData.videos}
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

    <hr class="my-4 border-gray-700" />

    <Form
        action="?/delete"
        message={form?.id === $deleteFormId && form?.message}
        submitButtonText="Delete"
        submitButtonClass="btn-danger"
        errors={deleteFormErrors}
        validateForm={deleteFormValidate}
        on:redirect={() => {
            toast.success("Deleted successfully!", {
                position: "bottom-end",
            })
        }}
    />
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
                    checked={$updateFormData.videos.includes(video.id)}
                    bind:group={$updateFormData.videos}
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
