<script lang="ts">
    import IconMinusCircleRegular from "phosphor-icons-svelte/IconMinusCircleRegular.svelte"
    import IconPlusCircleRegular from "phosphor-icons-svelte/IconPlusCircleRegular.svelte"

    export let value: number | string
    export let min: string | number | undefined = undefined
    export let max: string | number | undefined = undefined

    $: {
        if (max && Number(value) > Number(max)) {
            value = max
        }
        if ((min || min === 0) && Number(value) < Number(min)) {
            value = min
        }
    }

    const incrementNumber = () => {
        if (max) {
            if (Number(value) < Number(max)) {
                value = Number(value) + 1
            }
        } else {
            value = Number(value) + 1
        }
    }

    const decrementNumber = () => {
        if (min || min === 0) {
            if (Number(value) > Number(min)) {
                value = Number(value) - 1
            }
        } else {
            value = Number(value) - 1
        }
    }
</script>

<button
    type="button"
    class="h-full pl-1 pr-0.5 text-gray-500 duration-200 outline-inset hover:text-gray-50
        {(min || min === 0) && Number(value) <= Number(min)
        ? 'pointer-events-none text-gray-600'
        : ''}"
    on:click={decrementNumber}
>
    <IconMinusCircleRegular class="text-lg" />
</button>

<button
    type="button"
    class="-mr-2 h-full pl-0.5 pr-2 text-gray-500 duration-200 outline-inset hover:text-gray-50
        {max && Number(value) >= Number(max)
        ? 'pointer-events-none text-gray-600'
        : ''}"
    on:click={incrementNumber}
>
    <IconPlusCircleRegular class="text-lg" />
</button>
