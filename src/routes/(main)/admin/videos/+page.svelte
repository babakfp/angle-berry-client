<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { PUBLIC_PB_URL } from "$env/static/public"
    import DropZone from "$lib/components/form/DropZone.svelte"
    import Form from "$lib/components/form/Form.svelte"
    import FormBase from "$lib/components/form/FormBase.svelte"
    import FloatingActions from "$lib/components/table/FloatingActions.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { deleteVideos, uploadVideos } from "./data.remote"
    import { formats } from "./schema"

    let { data } = $props()

    const uploadVideosIssue = $derived(
        uploadVideos.fields.allIssues()?.find((issue) => {
            return !issue.path.length
        })?.message,
    )

    const deleteVideosIssue = $derived(
        deleteVideos.fields.allIssues()?.find((issue) => {
            return !issue.path.length
        })?.message,
    )
</script>

<svelte:head>
    <title>Videos</title>
</svelte:head>

<Form
    form={uploadVideos}
    enhance={async ({ submit }) => {
        await uploadVideos.validate()

        if (uploadVideos.fields.allIssues()?.length) {
            return
        }

        await submit()

        if (uploadVideosIssue) {
            toast.error(uploadVideosIssue)
            return
        }

        uploadVideos.fields.videos.set([])
        toast.success("Uploaded successfully!")
    }}
    class="mb-8"
    message={uploadVideosIssue}
    allowUpload={true}
    submitButtonText="Upload"
>
    <DropZone
        {...uploadVideos.fields.videos.as("file multiple")}
        error={uploadVideos.fields.videos.issues()?.[0]?.message}
        accept={formats.map((format) => `.${format}`).join(",")}
    />
</Form>

<FormBase
    form={deleteVideos}
    enhance={async ({ submit }) => {
        await deleteVideos.validate()

        if (deleteVideos.fields.allIssues()?.length) {
            return
        }

        await submit()

        if (deleteVideosIssue) {
            toast.error(deleteVideosIssue)
            return
        }

        deleteVideos.fields.videos.set([])
        toast.success("Deleted successfully!")
    }}
>
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.videos as video}
            <li>
                <VideoGalleryItem
                    {...deleteVideos.fields.videos.as("checkbox", video.id)}
                    src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                />
            </li>
        {/each}
    </ul>

    <FloatingActions
        itemsLength={deleteVideos.fields.videos.value()?.length}
        onClear={() => deleteVideos.fields.videos.set([])}
    />
</FormBase>
