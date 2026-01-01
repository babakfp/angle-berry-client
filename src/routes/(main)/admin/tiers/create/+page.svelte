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
    import { createTier } from "./data.remote"

    let { data } = $props()

    const visibilityOptions = Object.values(
        TIERS_RECORD_VISIBILITY_OPTIONS,
    ).map((value) => ({
        value,
        label: capitalizeFirstLetter(value),
    }))

    let selectedVisibility = $state<(typeof visibilityOptions)[number]>()

    $effect(() => {
        if (!selectedVisibility) return
        createTier.fields.visibility.set(selectedVisibility.value)
    })

    let isGalleryPopupOpen = $state(false)

    const REDIRECT_MESSAGE = "Created successfully!"

    export const snapshot = useSnapshot(createTier)

    const updateTierIssue = $derived(useIssue(createTier))
</script>

<svelte:head>
    <title>Tier / Create</title>
</svelte:head>

<div class="mx-auto w-full max-w-sm">
    <Form
        form={createTier}
        enhance={async ({ submit }) => {
            await createTier.validate()

            if (createTier.fields.allIssues()?.length) {
                return
            }

            await submit()

            if (updateTierIssue) {
                toast.error(updateTierIssue)
                return
            }

            if (createTier.result?.redirect) {
                toast.success(REDIRECT_MESSAGE)
                goto(resolve(createTier.result.redirect))
            }
        }}
        message={createTier.result?.redirect ?
            REDIRECT_MESSAGE
        :   updateTierIssue}
        submitButtonText="Update"
    >
        <Input
            {...createTier.fields.name.as("text")}
            error={createTier.fields.name.issues()?.[0]?.message}
            onblur={() => validateOnBlur(createTier)}
            oninput={() => validateOnInput(createTier)}
            label="Name"
        />
        <Input
            {...createTier.fields.price.as("number")}
            error={createTier.fields.price.issues()?.[0]?.message}
            onblur={() => validateOnBlur(createTier)}
            oninput={() => validateOnInput(createTier)}
            label="Price"
        />
        <Input
            {...createTier.fields.invites.as("number")}
            error={createTier.fields.invites.issues()?.[0]?.message}
            onblur={() => validateOnBlur(createTier)}
            oninput={() => validateOnInput(createTier)}
            label="Invites"
        />
        <!-- TODO:
            onblur={() => validateOnBlur(createTier)}
            oninput={() => validateOnInput(createTier)}
        -->
        <Select
            {...createTier.fields.visibility.as("select")}
            error={createTier.fields.visibility.issues()?.[0]?.message}
            label="Visibility"
            placeholder="Select visibility"
            options={visibilityOptions}
            bind:selectedOption={selectedVisibility}
            isMultiple={false}
        />
        <ul class="grid gap-4 rounded bg-gray-700 p-2">
            {#each createTier.fields.videos.value() as id (id)}
                {@const video = data.videos.filter(
                    (video) => video.id === id,
                )[0]}
                <li transition:fade>
                    <VideoGalleryItem
                        {...createTier.fields.videos.as("checkbox", video.id)}
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
                            {...createTier.fields.videos.as(
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
</div>
