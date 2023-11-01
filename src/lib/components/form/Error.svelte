<script lang="ts">
    export let message = ""
    export let _class = ""
    export { _class as class }
</script>

{#if message}
    <p class="{_class} text-xs text-red-400">
        {message}
    </p>
{/if}
