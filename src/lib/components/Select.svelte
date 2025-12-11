<script lang="ts">
    import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte"
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import IconXSquareRegular from "phosphor-icons-svelte/IconXSquareRegular.svelte"
    import { OutClick } from "svelte-outclick"
    import Description from "$lib/components/form/Description.svelte"

    type Option = { value: string; label: string }

    let {
        label,
        options = [],
        selectedOptionValue = $bindable(),
        selectedOption = $bindable(),
        selectedOptions = $bindable([]),
        error,
        isMultiple = true,
        readonly,
        class: class_,
    }: {
        label: string
        options?: Option[]
        selectedOptionValue?: Option["value"]
        selectedOption?: Option
        selectedOptions?: Option[]
        error?: string
        isMultiple?: boolean
        readonly?: boolean
        class?: string
    } = $props()

    let trigger = $state<HTMLButtonElement>()
    let isOpen = $state(false)

    $effect(() => {
        if (selectedOption) {
            selectedOptionValue = selectedOption.value
        }
    })

    if (selectedOptionValue) {
        selectedOption = options.find(
            (option) => option.value === selectedOptionValue,
        )
    }

    const handleTriggerToggle = () => {
        isOpen = !isOpen
    }

    const handleTriggerClose = () => {
        isOpen = false
    }

    const handleSelect = (value: Option["value"]) => {
        selectedOptions = [
            ...selectedOptions,
            ...options.filter((option) => option.value === value),
        ]
    }

    const handleSingleSelect = (value: Option["value"]) => {
        selectedOption = options.filter((option) => option.value === value)[0]
    }

    const handleDeselect = (value: Option["value"]) => {
        selectedOptions = selectedOptions.filter(
            (option) => option.value !== value,
        )
    }

    const handleSelectToggle = (value: Option["value"]) => {
        if (isSelected(value)) {
            handleDeselect(value)
        } else {
            handleSelect(value)
        }
    }

    const isSelected = (
        value: Option["value"],
        _selectedOptions?: Option[],
    ) => {
        return !!selectedOptions.filter((option) => option.value === value)[0]
    }

    const isSingleSelected = (
        value: Option["value"],
        _selectedOption?: Option,
    ) => {
        return selectedOption?.value === value
    }

    const handleMenuCloseOnEsxape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleTriggerClose()
        }
    }
</script>

<svelte:window
    onscroll={handleTriggerClose}
    onkeydown={handleMenuCloseOnEsxape}
/>
<svelte:document onmouseleave={handleTriggerClose} />

<div class="grid gap-2 {class_}">
    <div class="relative">
        {@render Trigger()}
        {@render SelectOptions()}
    </div>

    {#if selectedOptions.length && isMultiple}
        {@render SelectedOptions()}
    {/if}

    {#if error}
        <Description type="error">{error}</Description>
    {/if}
</div>

{#snippet Trigger()}
    <button
        type="button"
        bind:this={trigger}
        class={[
            "z-2 flex h-11 w-full items-center justify-between rounded bg-gray-700 px-4 hover:bg-gray-600",
            { "pointer-events-none opacity-50": readonly },
        ]}
        onclick={handleTriggerToggle}
    >
        {#if selectedOption?.value}
            <span>{selectedOption.label}</span>
        {:else}
            <span>{label}</span>
        {/if}
        <IconCaretDownRegular class="text-gray-500" />
    </button>
{/snippet}

{#snippet SelectOptions()}
    <OutClick
        onOutClick={handleTriggerClose}
        excludeElements={trigger}
        data-state={isOpen ? "open" : "closed"}
        hidden={!isOpen}
        class={[
            "absolute inset-x-0 top-full z-1 w-full translate-y-2 overflow-hidden rounded-t rounded-b bg-gray-700",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-2",
        ]}
    >
        {#if options.length}
            <ul>
                {#each options as option}
                    {@render SelectOption(option)}
                {/each}
            </ul>
        {:else}
            <p>No options to select!</p>
        {/if}
    </OutClick>
{/snippet}

{#snippet SelectOption(option: Option)}
    <li class="group">
        <button
            type="button"
            class="outline-inset flex w-full items-center gap-2 px-4 py-2 text-sm group-first:pt-4 group-last:pb-4 hover:bg-gray-600"
            onclick={() => {
                if (isMultiple) {
                    handleSelectToggle(option.value)
                } else {
                    handleSingleSelect(option.value)
                    handleTriggerClose()
                }
            }}
        >
            {#if isMultiple}
                {#if isSelected(option.value, selectedOptions)}
                    <IconCheckSquareRegular class="text-xl" />
                {:else}
                    <IconSquareRegular class="text-xl" />
                {/if}
            {:else}
                <IconCheckCircleRegular
                    class={[
                        "text-xl",
                        {
                            hide: !isSingleSelected(
                                option.value,
                                selectedOption,
                            ),
                        },
                    ]}
                />
            {/if}
            <span>{option.label}</span>
        </button>
    </li>
{/snippet}

{#snippet SelectedOptions()}
    <ul class="flex flex-wrap gap-2">
        {#each selectedOptions as option}
            {@render SelectedOption(option)}
        {/each}
    </ul>
{/snippet}

{#snippet SelectedOption(option: Option)}
    <li class="flex items-center rounded bg-gray-700">
        <button
            type="button"
            class="outline-inset flex p-1 text-gray-500 duration-150 hover:text-gray-50 {(
                readonly
            ) ?
                'pointer-events-none opacity-50'
            :   ''}"
            onclick={() => handleDeselect(option.value)}
        >
            <IconXSquareRegular />
        </button>
        <span class="pr-2 text-xs">{option.label}</span>
    </li>
{/snippet}
