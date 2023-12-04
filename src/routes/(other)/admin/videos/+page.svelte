<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { deleteSchema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import Form from "$components/form/Form.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { videoFormats } from "./schema"

    export let data
    export let form

    const { form: deleteForm } = superForm(data.deleteForm, {
        validators: deleteSchema,
    })
</script>

<Form
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

{#if $deleteForm.videos.length}
    <div
        class="sticky top-header z-1 mt-8 flex gap-4 bg-gray-800/95 p-4 backdrop-blur"
    >
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

<ul
    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3
    {$deleteForm.videos.length ? 'mt-4' : 'mt-8'}"
>
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
