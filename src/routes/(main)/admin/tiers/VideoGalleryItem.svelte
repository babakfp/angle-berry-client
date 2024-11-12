<script lang="ts">
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import VideoPlayer from "$lib/components/VideoPlayer.svelte"

    let {
        src,
        checked,
        group = $bindable(),
        value,
        name = undefined,
    }: {
        src: string
        checked: boolean
        group: string[]
        value: string
        name?: string
    } = $props()
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
