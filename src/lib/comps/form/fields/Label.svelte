<script>
    export let label = ""
    export let required = false
</script>

{#if label}
    <div>
        <span>{label}</span>

        {#if required}
            <span class="text-gray-500">*</span>
        {/if}
    </div>
{/if}
