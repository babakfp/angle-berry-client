<script lang="ts">
    import toast from "svelte-french-toast"
    import { superForm } from "sveltekit-superforms/client"
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import DropZone from "@/lib/components/form/DropZone.svelte"
    import Form from "@/lib/components/form/Form.svelte"
    import FloatingActions from "@/lib/components/table/FloatingActions.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { formats, schema } from "./schema"

    export let data
    export let form

    const {
        form: uploadForm,
        errors: uploadFormErrors,
        validateForm: uploadFormValidateForm,
    } = superForm(data.uploadForm, {
        validators: schema.upload,
    })

    const { form: deleteForm } = superForm(data.deleteForm, {
        validators: schema.delete,
    })

    let videos: FileList | undefined

    $: $uploadForm.videos = videos ? Array.from(videos) : []
</script>

<svelte:head>
    <title>Videos</title>
</svelte:head>

<Form
    class="mb-8"
    message={form?.message}
    canUpload={true}
    action="?/upload"
    submitButtonText="Upload"
    errors={uploadFormErrors}
    validateForm={uploadFormValidateForm}
    on:success={() => {
        videos = undefined
        toast.success("Uploaded successfully!", {
            position: "bottom-right",
        })
    }}
>
    <DropZone
        bind:files={videos}
        name="videos"
        accept={formats.map((format) => `.${format}`).join(",")}
        multiple
        error={$uploadFormErrors.videos?._errors?.[0] ||
            $uploadFormErrors.videos?.[0]?.[0] ||
            $uploadFormErrors.videos?.[1]?.[0]}
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
