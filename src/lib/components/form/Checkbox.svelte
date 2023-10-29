<script>
    import IconSquare from "$icons/IconSquare.svelte"
    import IconCheckSquare from "$icons/IconCheckSquare.svelte"

    export let checked = false
</script>

<label class="flex text-xl">
    <input class="hidden" type="checkbox" bind:checked on:click />

    {#if checked}
        <IconCheckSquare />
    {:else}
        <IconSquare />
    {/if}
</label>
