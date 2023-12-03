<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { deleteSchema, uploadSchema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import Form from "$components/form/Form.svelte"
    import VideoGalleryItem from "../tiers/VideoGalleryItem.svelte"
    import { videoFormats } from "./schema"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: deleteSchema })

    const {
        form: uploadForm,
        errors: uploadFormErrors,
        constraints: uploadFormConstraints,
        validate: uploadFormValidate,
    } = superForm(data.uploadForm, {
        validators: uploadSchema,
    })
</script>

<Form
    message={form?.message}
    doesUpload={true}
    action="?/upload"
    submitButtonText="Upload"
    errors={uploadFormErrors}
    validate={uploadFormValidate}
>
    <DropZone
        bind:files={$uploadForm.videos}
        name="videos"
        accept={videoFormats}
        multiple
        error={$uploadFormErrors?.videos
            ? $uploadFormErrors?.videos[0]
            : form?.pb?.videos?.message}
    />
</Form>

{#if $_form.videos.length}
    <div class="mt-8 flex gap-4">
        <form method="post" action="?/delete">
            <button class="btn btn-danger" type="submit">
                Delete selected
            </button>

            {#each $_form.videos as id}
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
            on:click={() => ($_form.videos = [])}
        >
            Clear selection
        </button>
    </div>
{/if}

<ul
    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3
    {$_form.videos.length ? 'mt-4' : 'mt-8'}"
>
    {#each data.videos as video}
        <li>
            <VideoGalleryItem
                src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                checked={$_form.videos.includes(video.id)}
                bind:group={$_form.videos}
                value={video.id}
            />
        </li>
    {/each}
</ul>
