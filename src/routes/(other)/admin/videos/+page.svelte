<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { deleteSchema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import Form from "$components/form/Form.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { videoFormats } from "./schema"
    import { shrinkHeight } from "$utilities/shrinkHeight"
    import toast from "svelte-french-toast"
    import { slide } from "svelte/transition"

    export let data
    export let form

    const { form: deleteForm } = superForm(data.deleteForm, {
        validators: deleteSchema,
    })
</script>

<svelte:head>
    <title>Videos</title>
</svelte:head>

<Form
    class="mb-8"
    message={form?.message}
    doesUpload={true}
    action="?/upload"
    submitButtonText="Upload"
    on:success={() => {
        toast.success("Your files uploaded successfully!", {
            position: "bottom-right",
        })
    }}
>
    <DropZone
        bind:files={data.uploadForm.videos}
        name="videos"
        accept={videoFormats}
        multiple
    />
</Form>

{#if $deleteForm.videos.length}
    <div class="sticky top-header z-1 mb-4 flex gap-4 bg-body-bg">
        <form method="post" action="?/delete">
            <button type="submit" class="btn btn-danger">
                Delete selected
            </button>

            {#each $deleteForm.videos as id}
                <input
                    class="hidden"
                    type="checkbox"
                    name="videos"
                    value={id}
                    checked
                />
            {/each}
        </form>
        <button
            type="button"
            class="btn btn-gray-light"
            on:click={() => ($deleteForm.videos = [])}
        >
            Clear selection
        </button>
    </div>
{/if}

<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.videos as video}
        <li>
            <VideoGalleryItem
                src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                checked={$deleteForm.videos.includes(video.id)}
                bind:group={$deleteForm.videos}
                value={video.id}
            />
        </li>
    {/each}
</ul>
