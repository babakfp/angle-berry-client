<script lang="ts">
    import Label from "@/lib/components/form/Label.svelte"
    import Description from "@/lib/components/form/Description.svelte"

    export let label = ""
    export let required = false
    export let for_ = ""
    export { for_ as for }
    export let error = ""
</script>

<div class="group grid">
    {#if label}
        <Label class="justify-self-start" {label} {required} for={for_} />
    {/if}

    <div class="relative mt-0.5">
        <slot />

        {#if $$slots.buttons}
            <div
                class="absolute bottom-0.5 right-0.5 top-0.5 flex h-[calc(calc(100%-4px))] items-center rounded-r bg-body-bg px-2 duration-200 hide inset-y-center focus-within:show group-hover:show peer-focus:show"
            >
                <slot name="buttons" />
            </div>
        {/if}
    </div>

    {#if error}
        <Description class="mt-2" type="error" text={error} />
    {/if}
</div>
