<script lang="ts">
    import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte"
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import IconXSquareRegular from "phosphor-icons-svelte/IconXSquareRegular.svelte"
    import OutClick from "svelte-outclick"
    import Description from "./form/Description.svelte"

    type Option = { value: string; label: string }

    export let label: string
    export let options: Option[] = []
    export let selectedOptions: Option[] = []
    export let error = ""

    let trigger: HTMLButtonElement
    let isOpen = false

    const handleTriggerToggle = () => {
        isOpen = !isOpen
    }

    const handleTriggerClose = () => {
        isOpen = false
    }

    const handleSelect = (value: Option["value"]) => {
        selectedOptions = [
            ...selectedOptions,
            ...options.filter(option => option.value === value),
        ]
    }

    const handleDeselect = (value: Option["value"]) => {
        selectedOptions = selectedOptions.filter(
            option => option.value !== value,
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
        return !!selectedOptions.filter(option => option.value === value)[0]
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

<div class="relative grid gap-2">
    <button
        type="button"
        bind:this={trigger}
        class="z-30 flex h-11 w-full items-center justify-between rounded bg-gray-700 px-4 hover:bg-gray-600"
        on:click={handleTriggerToggle}
    >
        <span>{label}</span>
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
                                class="flex w-full items-center gap-2 bg-gray-700 px-4 py-2 text-sm outline-inset hover:bg-gray-600 group-first:rounded-t group-first:pt-3 group-last:rounded-b group-last:pb-3"
                                on:click={() =>
                                    handleSelectToggle(option.value)}
                            >
                                {#if isSelected(option.value, selectedOptions)}
                                    <IconCheckSquareRegular class="text-lg" />
                                {:else}
                                    <IconSquareRegular class="text-lg" />
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

    {#if selectedOptions.length}
        <ul class="flex flex-wrap gap-2">
            {#each selectedOptions as option}
                <li class="flex items-center rounded bg-gray-700">
                    <button
                        type="button"
                        class="flex p-1 text-gray-500 duration-150 outline-inset hover:text-white"
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
        <Description type="error" text={error} />
    {/if}
</div>
