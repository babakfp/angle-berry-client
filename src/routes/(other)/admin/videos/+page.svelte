<script>
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import VideoPlayer from "$components/VideoPlayer.svelte"

    export let data
</script>

<form method="post" enctype="multipart/form-data">
    <label for="file">Choose file to upload</label>
    <input
        type="file"
        name="videos"
        accept=".mp4,.avi,.mkv"
        id="videos"
        multiple
    />
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
