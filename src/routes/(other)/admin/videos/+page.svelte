<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import { deleteSchema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import DropZone from "$components/form/DropZone.svelte"
    import VideoPlayer from "$components/VideoPlayer.svelte"

    export let data
    export let form

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: deleteSchema })

    $: console.log("$_form.videos", $_form.videos)
</script>

<div class="flex gap-4">
    {#if $_form.videos.length}
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
    {/if}
</div>

<form method="post" enctype="multipart/form-data" action="?/upload">
    <DropZone name="videos" accept=".mp4,.avi,.mkv" multiple />
    <button type="submit">Submit</button>
</form>

<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.videos as video}
        <li>
            <VideoPlayer
                src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
            />
        </li>
    {/each}
</ul>
