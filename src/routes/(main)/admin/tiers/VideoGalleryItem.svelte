<script lang="ts">
    import Checkbox from "@/lib/components/form/Checkbox.svelte"
    import VideoPlayer from "@/lib/components/VideoPlayer.svelte"

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
