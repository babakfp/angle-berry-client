<script lang="ts">
    export let _for: string | undefined
    export { _for as for }
    export let label: string
    export let required = false
</script>

<label for={_for}>
    <span>{label}</span>

    {#if required}
        <span class="text-gray-500">*</span>
    {/if}
</label>
