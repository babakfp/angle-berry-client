<script lang="ts">
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import type { HTMLInputAttributes } from "svelte/elements"
    import Description from "./Description.svelte"

    let {
        class: class_,
        checked = $bindable(),
        value = "on",
        group = $bindable(),
        disabled,
        readonly,
        name,
        label,
        error,
        onchange,
        ...rest
    }: Omit<HTMLInputAttributes, "group"> & {
        value?: string
        group?: string[]
        label?: string
        error?: string
    } = $props()

    const handleGroup = (checked: boolean) => {
        if (!group) {
            group = []
        }

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

    $effect(() => {
        handleGroup(!!checked)
    })
</script>

<div class="grid">
    <label
        class={[
            class_,
            "inline-flex items-center gap-2 hover:text-gray-50",
            { "pointer-events-none opacity-50": disabled || readonly },
        ]}
    >
        <div
            class="inline-flex [&:has(input:focus-visible)]:outline-2 [&:has(input:focus-visible)]:outline-[orange]"
        >
            <input
                class="pointer-events-none absolute opacity-0"
                type="checkbox"
                bind:checked
                {onchange}
                {value}
                {disabled}
                {name}
                {...rest}
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
        <Description class="mt-1" type="error">{error}</Description>
    {/if}
</div>
