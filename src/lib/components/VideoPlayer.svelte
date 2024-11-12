<script lang="ts">
    let {
        src,
    }: {
        src: string
    } = $props()

    // When 1 video player volume changes, make other video player volume change too.
    const handleVolumeChange = (e: Event) => {
        document.querySelectorAll("video").forEach((videoElement) => {
            videoElement.volume = (e.target as HTMLVideoElement).volume
        })
    }

    const handleLoadStart = (e: Event) => {
        ;(e.target as HTMLVideoElement).volume = 0.25
    }
</script>

<video
    onvolumechange={handleVolumeChange}
    class="aspect-video w-full rounded"
    {src}
    controls
    onloadstart={handleLoadStart}
    controlsList="noplaybackrate"
    disablePictureInPicture
></video>
