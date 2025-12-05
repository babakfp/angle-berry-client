<script module lang="ts">
    let volume = $state(0.25)
    let playingVideo = $state<HTMLVideoElement>()
</script>

<script lang="ts">
    let {
        src,
    }: {
        src: string
    } = $props()

    let currentVideo = $state<HTMLVideoElement>()

    $effect(() => {
        if (!currentVideo) {
            return
        }
        if (!playingVideo) {
            return
        }
        if (playingVideo === currentVideo) {
            return
        }
        currentVideo.pause()
    })
</script>

<video
    bind:this={currentVideo}
    class="aspect-video w-full rounded"
    {src}
    controls
    controlsList="noplaybackrate nodownload"
    disablePictureInPicture
    oncontextmenu={(e) => e.preventDefault()}
    bind:volume
    onplay={() => (playingVideo = currentVideo)}
></video>
