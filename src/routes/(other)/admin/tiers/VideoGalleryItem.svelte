<script lang="ts">
    import VideoPlayer from "$components/VideoPlayer.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let src: string
    export let checked: boolean
    export let group: string[]
    export let value: string
    export let name: string | undefined = undefined
</script>

<div class="grid gap-1">
    <VideoPlayer {src} />
    <Checkbox
        class="btn {checked ? 'btn-gray' : 'btn-gray-outline'}"
        {checked}
        bind:group
        {value}
        {name}
        label={checked ? "Selected" : ""}
    />
</div>
