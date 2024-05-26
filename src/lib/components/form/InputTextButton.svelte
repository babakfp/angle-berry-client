<script lang="ts">
    export let class_ = ""
    export { class_ as class }
    export let text = ""
</script>

<button type="button" class="btn btn-gray-light h-7 text-2xs {class_}" on:click>
    {#if $$slots.default}
        <slot />
    {:else}
        {text}
    {/if}
</button>
