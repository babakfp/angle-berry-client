<script lang="ts">
    export let _class = ""
    export { _class as class }
    export let text = ""
</script>

<button type="button" class="btn btn-gray-light h-7 text-2xs {_class}" on:click>
    {#if $$slots.default}
        <slot />
    {:else}
        {text}
    {/if}
</button>
