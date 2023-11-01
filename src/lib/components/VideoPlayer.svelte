<script lang="ts">
    export let src
    export let preload = "metadata"

    // When 1 video player volume changes, make other video player volume change too.
    function handleVolumeChange(e) {
        document.querySelectorAll("video").forEach(videoElement => {
            videoElement.volume = e.target.volume
        })
    }
</script>

<div class="relative">
    <video
        on:volumechange={handleVolumeChange}
        class="aspect-video w-full rounded"
        {src}
        controls
        {preload}
        onloadstart="this.volume=0.25"
        controlsList="noplaybackrate"
        disablePictureInPicture
    />
</div>
