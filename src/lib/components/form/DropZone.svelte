<script lang="ts">
    import IconUploadSimpleRegular from "phosphor-icons-svelte/IconUploadSimpleRegular.svelte"
    import Description from "$lib/components/form/Description.svelte"
    import { formatBytes } from "$lib/utilities/formatBytes"

    export let name: string
    export let accept: string
    export let multiple = false
    export let error = ""
    export let files: FileList | undefined
</script>

<div>
    <label
        for={name}
        class="grid cursor-pointer justify-center justify-items-center gap-2 rounded border-2 border-dashed border-gray-600 bg-gray-700/20 px-4 py-6 text-center text-gray-400"
        on:dragover|preventDefault
        on:drop|preventDefault={(e) => {
            files = e.dataTransfer?.files
        }}
    >
        <IconUploadSimpleRegular class="text-2xl" />

        <p class="mt-2 text-sm">
            <b>Click</b> or <b>Drag</b> and <b>Drop</b> to <b>Upload</b>
        </p>
        <p class="text-xs sm:text-sm">
            {accept.split(",").join(", ")}
        </p>

        {#if files}
            <ul class="mt-2 space-y-2 break-all text-left text-xs text-gray-50">
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
        <Description class="mt-1" type="error" text={error} />
    {/if}
</div>
