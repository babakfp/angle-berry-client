<script lang="ts">
    import IconSquare from "$icons/IconSquare.svelte"
    import IconCheckSquare from "$icons/IconCheckSquare.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
    export let value = "on"
    export let group: string[] = []
    export let disabled = false
    export let name = ""
    export let label = ""

    $: handleGroup(checked)

    function handleGroup(checked: boolean) {
        if (checked) {
            if (!group.includes(value)) {
                group = [...group, value]
            }
        } else {
            if (group.includes(value)) {
                group = group.filter(item => item !== value)
            }
        }
    }
</script>

<label
    class="{_class} inline-flex gap-2
        {disabled && 'pointer-events-none opacity-50'}"
>
    <input
        class="hidden"
        type="checkbox"
        bind:checked
        on:change
        {value}
        {disabled}
        name={name || null}
        {...$$restProps}
    />

    {#if checked}
        <IconCheckSquare class="text-xl" />
    {:else}
        <IconSquare class="text-xl" />
    {/if}

    {#if label}
        <span>{label}</span>
    {/if}
</label>
