<script lang="ts">
    import type { EventHandler, MouseEventHandler } from "svelte/elements"

    let {
        src,
    }: {
        src: string
    } = $props()

    // When 1 video player volume changes, make other video player volume change too.
    const handleVolumeChange: EventHandler<Event, HTMLVideoElement> = (e) => {
        document.querySelectorAll("video").forEach((videoElement) => {
            videoElement.volume = (e.target as HTMLVideoElement).volume
        })
    }

    const handleLoadStart: EventHandler<Event, HTMLVideoElement> = (e) => {
        e.currentTarget.volume = 0.25
    }

    const handleContextMenu: MouseEventHandler<HTMLVideoElement> = (e) => {
        e.preventDefault()
    }
</script>

<video
    onvolumechange={handleVolumeChange}
    class="aspect-video w-full rounded"
    {src}
    controls
    onloadstart={handleLoadStart}
    controlsList="noplaybackrate nodownload"
    disablePictureInPicture
    oncontextmenu={handleContextMenu}
></video>
