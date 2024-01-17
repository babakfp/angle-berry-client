<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { deleteSchema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import Form from "$components/form/Form.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { videoFormats } from "./schema"
    import { shrinkHeight } from "$utilities/shrinkHeight"

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
>
    <DropZone
        bind:files={data.uploadForm.videos}
        name="videos"
        accept={videoFormats}
        multiple
    />
</Form>

<div class="sticky top-header z-1 -mt-4 bg-gray-800">
    {#if $deleteForm.videos.length}
        <div class="flex items-end gap-4 py-4" transition:shrinkHeight>
            <form method="post" action="?/delete">
                <button class="btn btn-danger" type="submit">
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
                class="btn btn-gray-light"
                on:click={() => ($deleteForm.videos = [])}
            >
                Clear selection
            </button>
        </div>
    {/if}
</div>

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
