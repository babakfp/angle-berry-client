<script lang="ts">
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"
    import Description from "./Description.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
    export let value = "on"
    export let group: string[] = []
    export let disabled = false
    export let readonly = false
    export let name: string | undefined = undefined
    export let label = ""
    export let error = ""

    $: handleGroup(checked)

    const handleGroup = (checked: boolean) => {
        if (checked) {
            if (!group.includes(value)) {
                group = [...group, value]
            }
        } else {
            if (group.includes(value)) {
                group = group.filter((item) => item !== value)
            }
        }
    }
</script>

<div class="grid">
    <label
        class="{_class} inline-flex cursor-pointer items-center gap-2 hover:text-white
    {(disabled || readonly) && 'pointer-events-none opacity-50'}"
    >
        <div
            class="inline-flex [&:has(input:focus-visible)]:outline [&:has(input:focus-visible)]:outline-2 [&:has(input:focus-visible)]:outline-[orange]"
        >
            <input
                class="pointer-events-none absolute opacity-0"
                type="checkbox"
                bind:checked
                on:change
                {value}
                {disabled}
                {name}
                {...$$restProps}
                tabindex={readonly ? -1 : undefined}
            />

            {#if checked}
                <IconCheckSquareRegular class="text-xl" />
            {:else}
                <IconSquareRegular class="text-xl" />
            {/if}
        </div>

        {#if label}
            <span>{label}</span>
        {/if}
    </label>

    {#if error}
        <Description type="error" text={error} />
    {/if}
</div>
