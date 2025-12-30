<script lang="ts">
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import Video from "$lib/components/Video.svelte"

    let {
        src,
        checked,
        group = $bindable([]),
        value,
        name = undefined,
    }: {
        src: string
        checked?: boolean
        group?: string[]
        value?: string
        name?: string
    } = $props()
</script>

<div class="grid gap-1">
    <Video {src} />
    <Checkbox
        class={["btn", checked ? "btn-brand!" : "btn-gray-outline"]}
        {checked}
        bind:group
        {value}
        {name}
    />
</div>
