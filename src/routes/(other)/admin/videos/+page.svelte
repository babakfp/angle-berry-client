<script>
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import VideoPlayer from "$components/VideoPlayer.svelte"

    export let data
</script>

<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.videos as video}
        <li>
            <VideoPlayer
                src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
            />
        </li>
    {/each}
</ul>
