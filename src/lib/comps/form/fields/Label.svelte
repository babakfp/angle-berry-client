<script>
    export let _for = ""
    export { _for as for }
    export let label = ""
    export let required = false
</script>

{#if label}
    <label for={_for}>
        <span>{label}</span>

        {#if required}
            <span class="text-gray-500">*</span>
        {/if}
    </label>
{/if}
