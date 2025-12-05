<script module lang="ts">
    let volume = $state(0.25)
</script>

<script lang="ts">
    let {
        src,
    }: {
        src: string
    } = $props()
</script>

<video
    class="aspect-video w-full rounded"
    {src}
    controls
    controlsList="noplaybackrate nodownload"
    disablePictureInPicture
    oncontextmenu={(e) => e.preventDefault()}
    bind:volume
></video>
