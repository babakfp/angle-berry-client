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
    <label class="btn flex gap-2 bg-white/5 hover:bg-white/10">
        <Checkbox {checked} bind:group {value} name="videos" />
        {#if checked}
            Selected
        {/if}
    </label>
</div>
