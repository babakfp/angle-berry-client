<script>
    import IconSquare from "$icons/IconSquare.svelte"
    import IconCheckSquare from "$icons/IconCheckSquare.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
    export let value = undefined
    export let group = []
    export let disabled = false

    $: handleGroup(checked)

    function handleGroup(checked) {
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
    class="{_class} inline-flex text-xl {disabled
        ? 'pointer-events-none opacity-50'
        : ''}"
>
    <input
        class="hidden"
        type="checkbox"
        bind:checked
        on:change
        {value}
        {disabled}
    />

    {#if checked}
        <IconCheckSquare />
    {:else}
        <IconSquare />
    {/if}
</label>
