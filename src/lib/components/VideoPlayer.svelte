<script lang="ts">
    export let src: string
    export let preload: "metadata" | "none" = "metadata"

    // When 1 video player volume changes, make other video player volume change too.
    function handleVolumeChange(e: Event) {
        document.querySelectorAll("video").forEach(videoElement => {
            videoElement.volume = (e.target as HTMLVideoElement).volume
        })
    }

    function handleLoadStart(e: Event) {
        ;(e.target as HTMLVideoElement).volume = 0.25
    }
</script>

<video
    on:volumechange={handleVolumeChange}
    class="aspect-video w-full rounded"
    {src}
    controls
    {preload}
    on:loadstart={handleLoadStart}
    controlsList="noplaybackrate"
    disablePictureInPicture
/>
