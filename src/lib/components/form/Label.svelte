<script lang="ts">
    let {
        for: for_,
        label,
        required,
        class: class_,
    }: {
        for?: string
        label: string
        required?: boolean
        class?: string
    } = $props()
</script>

<label class="{class_} text-sm" for={for_}>
    <span>{label}</span>

    {#if required}
        <span class="text-gray-500">*</span>
    {/if}
</label>
