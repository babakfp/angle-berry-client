<script lang="ts">
    import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte"
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import IconXSquareRegular from "phosphor-icons-svelte/IconXSquareRegular.svelte"
    import OutClick from "svelte-outclick"
    import Description from "$lib/components/form/Description.svelte"

    type Option = { value: string; label: string }

    export let label: string
    export let options: Option[] = []
    export let selectedOptionValue: Option["value"] | undefined = undefined
    export let selectedOption: Option | undefined = undefined
    export let selectedOptions: Option[] = []
    export let error = ""
    export let isMultiple = true
    export let readonly = false
    export let class_ = ""
    export { class_ as class }

    let trigger: HTMLButtonElement
    let isOpen = false

    $: if (selectedOption) {
        selectedOptionValue = selectedOption.value
    }

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
    on:scroll={handleTriggerClose}
    on:keydown={handleMenuCloseOnEsxape}
/>
<svelte:document on:mouseleave={handleTriggerClose} />

<div class="relative grid gap-2 {class_}">
    <button
        type="button"
        bind:this={trigger}
        class="z-30 flex h-11 w-full items-center justify-between rounded bg-gray-700 px-4 hover:bg-gray-600 {readonly
            ? 'pointer-events-none opacity-50'
            : ''}"
        on:click={handleTriggerToggle}
    >
        {#if selectedOption?.value}
            <span>{selectedOption.label}</span>
        {:else}
            <span>{label}</span>
        {/if}
        <IconCaretDownRegular class="text-gray-500" />
    </button>

    <OutClick on:outclick={handleTriggerClose} excludeElements={trigger}>
        <div
            class="absolute top-11 z-20 w-full -translate-y-2 duration-150
            {isOpen ? '!translate-y-2' : 'hide'}"
        >
            {#if options.length}
                <ul>
                    {#each options as option}
                        <li class="group">
                            <button
                                type="button"
                                class="flex w-full items-center gap-2 bg-gray-700 px-4 py-2 text-sm outline-inset hover:bg-gray-600 group-first:rounded-t group-first:pt-4 group-last:rounded-b group-last:pb-4"
                                on:click={() => {
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
                                        <IconCheckSquareRegular
                                            class="text-xl"
                                        />
                                    {:else}
                                        <IconSquareRegular class="text-xl" />
                                    {/if}
                                {:else}
                                    <IconCheckCircleRegular
                                        class="text-xl {!isSingleSelected(
                                            option.value,
                                            selectedOption,
                                        ) && 'hide'}"
                                    />
                                {/if}
                                <span>{option.label}</span>
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>No options to select!</p>
            {/if}
        </div>
    </OutClick>

    {#if selectedOptions.length && isMultiple}
        <ul class="flex flex-wrap gap-2">
            {#each selectedOptions as option}
                <li class="flex items-center rounded bg-gray-700">
                    <button
                        type="button"
                        class="flex p-1 text-gray-500 duration-150 outline-inset hover:text-gray-50 {readonly
                            ? 'pointer-events-none opacity-50'
                            : ''}"
                        on:click={() => handleDeselect(option.value)}
                    >
                        <IconXSquareRegular />
                    </button>
                    <span class="pr-2 text-xs">{option.label}</span>
                </li>
            {/each}
        </ul>
    {/if}

    {#if error}
        <Description class="mt-1" type="error" text={error} />
    {/if}
</div>
