<script lang="ts">
    import IconUpload from "$icons/IconUpload.svelte"
    import { formatBytes } from "$utilities/formatBytes"

    export let name: string
    export let accept: string
    export let multiple = false

    let files: FileList
</script>

<label
    for={name}
    class="grid cursor-pointer justify-center justify-items-center gap-2 rounded border-2 border-dashed border-gray-600 bg-gray-700/20 p-4 text-center"
>
    <IconUpload class="text-2xl" />

    <p class="text-sm text-gray-500">
        <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500">
        {accept.split(",").join(", ")}
    </p>

    {#if files}
        <ul class="space-y-2 break-all text-left text-xs">
            {#each files as file}
                <li>
                    {file.name} ({formatBytes(file.size)})
                </li>
            {/each}
        </ul>
    {/if}

    <input
        class="hidden"
        id={name}
        {name}
        type="file"
        {accept}
        {multiple}
        bind:files
    />
</label>
