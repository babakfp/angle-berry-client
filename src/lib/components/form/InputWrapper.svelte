<script lang="ts">
    import type { Snippet } from "svelte"
    import Description from "$lib/components/form/Description.svelte"
    import Label from "$lib/components/form/Label.svelte"

    let {
        label,
        required,
        for: for_,
        error,
        children,
        buttons,
    }: {
        label?: string
        required?: boolean
        for?: string
        error?: string
        children?: Snippet
        buttons: Snippet
    } = $props()
</script>

<div class="group grid">
    {#if label}
        <Label class="justify-self-start" {label} {required} for={for_} />
    {/if}

    <div class="relative mt-0.5">
        {@render children?.()}

        <div
            class="bg-background hide focus-within:show group-hover:show peer-focus:show absolute top-0.5 right-0.5 bottom-0.5 flex h-[calc(calc(100%-4px))] items-center rounded-r px-1.5 duration-200"
        >
            {@render buttons()}
        </div>
    </div>

    {#if error}
        <Description class="mt-1" type="error" text={error} />
    {/if}
</div>
