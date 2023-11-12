<script lang="ts">
    import VideoPlayer from "$components/VideoPlayer.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let src: string
    export let checked: boolean
    export let group: string[]
    export let value: string
</script>

<div class="grid gap-1">
    <VideoPlayer {src} preload="none" />
    <Checkbox
        class="btn btn-gray-glass-outline"
        {checked}
        bind:group
        {value}
        name="videos"
        label={checked ? "Selected" : ""}
    />
</div>
