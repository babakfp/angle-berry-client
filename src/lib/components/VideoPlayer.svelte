<script lang="ts">
    export let src: string

    // When 1 video player volume changes, make other video player volume change too.
    const handleVolumeChange = (e: Event) => {
        document.querySelectorAll("video").forEach(videoElement => {
            videoElement.volume = (e.target as HTMLVideoElement).volume
        })
    }

    const handleLoadStart = (e: Event) => {
        ;(e.target as HTMLVideoElement).volume = 0.25
    }
</script>

<video
    on:volumechange={handleVolumeChange}
    class="aspect-video w-full rounded"
    {src}
    controls
    on:loadstart={handleLoadStart}
    controlsList="noplaybackrate"
    disablePictureInPicture
/>
