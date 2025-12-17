<script lang="ts">
    import IconUploadSimpleRegular from "phosphor-icons-svelte/IconUploadSimpleRegular.svelte"
    import type { DragEventHandler } from "svelte/elements"
    import Description from "$lib/components/form/Description.svelte"
    import { formatBytes } from "$lib/utilities/formatBytes"

    let {
        name,
        accept,
        multiple,
        error,
        files = $bindable(),
        ondragover,
    }: {
        name: string
        accept: string
        multiple?: boolean
        error?: string
        files?: FileList
        ondragover?: DragEventHandler<HTMLLabelElement>
    } = $props()
</script>

<div>
    <label
        for={name}
        class="grid justify-center justify-items-center gap-2 rounded border-2 border-dashed border-gray-600 bg-gray-700/20 px-4 py-6 text-center text-gray-400"
        ondragover={(e) => {
            e.preventDefault()
            ondragover?.(e)
        }}
        ondrop={(e) => {
            e.preventDefault()
            files = e.dataTransfer?.files
        }}
    >
        <IconUploadSimpleRegular class="text-2xl" />

        <p class="mt-2 text-sm">
            <b>Click</b>
            or
            <b>Drag</b>
            and
            <b>Drop</b>
            to
            <b>Upload</b>
        </p>
        <p class="text-xs sm:text-sm">
            {accept.split(",").join(", ")}
        </p>

        {#if files}
            <ul class="mt-2 space-y-2 text-left text-xs break-all text-gray-50">
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

    {#if error}
        <Description class="mt-1" type="error">{error}</Description>
    {/if}
</div>
