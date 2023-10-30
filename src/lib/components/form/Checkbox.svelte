<script>
    import IconSquare from "$icons/IconSquare.svelte"
    import IconCheckSquare from "$icons/IconCheckSquare.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
</script>

<label class="inline-flex text-xl {_class}">
    <input class="hidden" type="checkbox" bind:checked on:change />

    {#if checked}
        <IconCheckSquare />
    {:else}
        <IconSquare />
    {/if}
</label>
