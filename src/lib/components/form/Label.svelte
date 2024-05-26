<script lang="ts">
    export let for_: string | undefined = undefined
    export { for_ as for }
    export let label: string
    export let required = false
    export let class_ = ""
    export { class_ as class }
</script>

<label class="{class_} text-sm" for={for_}>
    <span>{label}</span>

    {#if required}
        <span class="text-gray-500">*</span>
    {/if}
</label>
