<script>
    import IconSquare from "$icons/IconSquare.svelte"
    import IconCheckSquare from "$icons/IconCheckSquare.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
    export let value = undefined
    export let group = []

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

<label class="inline-flex text-xl {_class}">
    <input class="hidden" type="checkbox" bind:checked on:change {value} />

    {#if checked}
        <IconCheckSquare />
    {:else}
        <IconSquare />
    {/if}
</label>
