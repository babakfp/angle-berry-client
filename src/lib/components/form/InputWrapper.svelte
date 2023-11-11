<script lang="ts">
    import Label from "$components/form/Label.svelte"
    import Description from "$components/form/Description.svelte"

    export let label = ""
    export let required = false
    export let _for = ""
    export { _for as for }
    export let error = ""
</script>

<div class="group grid">
    {#if label}
        <Label {label} {required} for={_for} />
    {/if}

    <div class="relative">
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
