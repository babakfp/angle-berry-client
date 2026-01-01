<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { fade } from "svelte/transition"
    import { goto } from "$app/navigation"
    import { resolve } from "$app/paths"
    import { PUBLIC_PB_URL } from "$env/static/public"
    import Form from "$lib/components/form/Form.svelte"
    import Input from "$lib/components/form/Input.svelte"
    import Select from "$lib/components/form/Select.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import { capitalizeFirstLetter } from "$lib/utilities/capitalizeFirstLetter"
    import { TIERS_RECORD_VISIBILITY_OPTIONS } from "$lib/utilities/pb"
    import {
        useIssue,
        useSnapshot,
        validateOnBlur,
        validateOnInput,
    } from "$lib/utilities/remote-functions/form"
    import VideoGalleryItem from "../VideoGalleryItem.svelte"
    import { deleteTier, updateTier } from "./data.remote"

    let { data } = $props()

    updateTier.fields.name.set((() => data.tier.name)())
    updateTier.fields.price.set((() => data.tier.price)())
    updateTier.fields.invites.set((() => data.tier.invites)())
    updateTier.fields.videos.set((() => data.tier.videos)())

    let selectedVideos = $derived(
        data.videos.filter((v) =>
            updateTier.fields.videos.value()?.includes(v.id),
        ),
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
        updateTier.fields.visibility.set(selectedVisibility.value)
    })

    let isGalleryPopupOpen = $state(false)

    const REDIRECT_MESSAGE = "Updated successfully!"

    export const snapshot = useSnapshot(updateTier)

    const updateTierIssue = $derived(useIssue(updateTier))

    const deleteTierIssue = $derived(useIssue(deleteTier))
</script>

<svelte:head>
    <title>Tier : {data.tier.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-sm">
    <Form
        form={updateTier}
        enhance={async ({ submit }) => {
            await updateTier.validate()

            if (updateTier.fields.allIssues()?.length) {
                return
            }

            await submit()

            if (updateTierIssue) {
                toast.error(updateTierIssue)
                return
            }

            if (updateTier.result?.redirect) {
                toast.success(REDIRECT_MESSAGE)
                goto(resolve(updateTier.result.redirect))
            }
        }}
        message={updateTier.result?.redirect ?
            REDIRECT_MESSAGE
        :   updateTierIssue}
        submitButtonText="Update"
    >
        <Input
            {...updateTier.fields.name.as("text")}
            error={updateTier.fields.name.issues()?.[0]?.message}
            onblur={() => validateOnBlur(updateTier)}
            oninput={() => validateOnInput(updateTier)}
            label="Name"
            placeholder={data.tier.name}
        />
        <Input
            {...updateTier.fields.price.as("number")}
            error={updateTier.fields.price.issues()?.[0]?.message}
            onblur={() => validateOnBlur(updateTier)}
            oninput={() => validateOnInput(updateTier)}
            label="Price"
            placeholder={`${data.tier.price}`}
        />
        <Input
            {...updateTier.fields.invites.as("number")}
            error={updateTier.fields.invites.issues()?.[0]?.message}
            onblur={() => validateOnBlur(updateTier)}
            oninput={() => validateOnInput(updateTier)}
            label="Invites"
            placeholder={`${data.tier.invites}`}
        />
        <!-- TODO:
            onblur={() => validateOnBlur(updateTier)}
            oninput={() => validateOnInput(updateTier)}
        -->
        <Select
            {...updateTier.fields.visibility.as("select")}
            error={updateTier.fields.visibility.issues()?.[0]?.message}
            label="Visibility"
            placeholder="Select visibility"
            options={visibilityOptions}
            bind:selectedOption={selectedVisibility}
            isMultiple={false}
        />
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each selectedVideos as video (video.id)}
                <li transition:fade>
                    <VideoGalleryItem
                        {...updateTier.fields.videos.as("checkbox", video.id)}
                        src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
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

        <Modal
            title="Videos gallery"
            bind:isOpen={isGalleryPopupOpen}
            isFullSize={true}
        >
            <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {#each data.videos as video (video.id)}
                    <li>
                        <VideoGalleryItem
                            {...updateTier.fields.videos.as(
                                "checkbox",
                                video.id,
                            )}
                            src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
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
    </Form>

    <hr class="my-4 border-gray-700" />

    <Form
        form={deleteTier}
        enhance={async ({ submit }) => {
            await deleteTier.validate()

            if (deleteTier.fields.allIssues()?.length) {
                return
            }

            await submit()

            if (updateTierIssue) {
                toast.error(updateTierIssue)
                return
            }

            if (deleteTier.result?.redirect) {
                toast.success("Deleted successfully!")
                goto(resolve(deleteTier.result.redirect))
            }
        }}
        message={deleteTier.result?.redirect ?
            "Deleted successfully!"
        :   deleteTierIssue}
        submitButtonText="Delete"
        submitButtonClass="btn-danger"
    />
</div>
