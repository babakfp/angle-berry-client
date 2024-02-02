<script lang="ts">
    import IconCaretDownDuotone from "phosphor-icons-svelte/IconCaretDownDuotone.svelte"
    import IconCheckSquareDuotone from "phosphor-icons-svelte/IconCheckSquareDuotone.svelte"
    import IconSquareDuotone from "phosphor-icons-svelte/IconSquareDuotone.svelte"
    import IconXSquareDuotone from "phosphor-icons-svelte/IconXSquareDuotone.svelte"
    import OutClick from "svelte-outclick"

    type Option = { value: string; label: string }

    export let label: string
    export let options: Option[] = []
    export let selectedOptions: Option[] = []
    // export let value: any

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
        <IconCaretDownDuotone class="text-gray-500" />
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
                                    <IconCheckSquareDuotone class="text-lg" />
                                {:else}
                                    <IconSquareDuotone class="text-lg" />
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
                        <IconXSquareDuotone />
                    </button>
                    <span class="pr-2 text-xs">{option.label}</span>
                </li>
            {/each}
        </ul>
    {/if}
</div>
