<script>
    export let _class = ""
    export { _class as class }
    export let text = ""
</script>

<button class="btn-gray-light btn text-2xs {_class}" type="button" on:click>
    {#if $$slots.default}
        <slot />
    {:else}
        {text}
    {/if}
</button>
