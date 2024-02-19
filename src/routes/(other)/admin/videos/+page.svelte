<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import Form from "$components/form/Form.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { schema, formats } from "./schema"
    import toast from "svelte-french-toast"
    import FloatingActions from "$components/table/FloatingActions.svelte"

    export let data
    export let form

    const { form: deleteForm } = superForm(data.deleteForm, {
        validators: schema.delete,
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
        accept={formats.map(format => `.${format}`).join(",")}
        multiple
    />
</Form>

<FloatingActions
    bind:selectedItemIds={$deleteForm.videos}
    deleteActionAttribute="?/delete"
    deleteInputNameAttribute="videos"
/>

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
