<script lang="ts">
    import IconPlusCircle from "$icons/IconPlusCircle.svelte"
    import IconMinusCircle from "$icons/IconMinusCircle.svelte"

    export let value: number | string
    export let min: string | number | undefined = undefined
    export let max: string | number | undefined = undefined

    $: {
        if (max && Number(value) >= Number(max)) {
            value = max
        }
        if (min && Number(value) <= Number(min)) {
            value = min
        }
    }

    function incrementNumber() {
        if (max) {
            if (Number(value) < Number(max)) {
                value = Number(value) + 1
            }
        } else {
            value = Number(value) + 1
        }
    }

    function decrementNumber() {
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
    class="h-full pl-1 pr-0.5 text-gray-500 duration-200 outline-inset hover:text-gray-300"
    type="button"
    on:click={decrementNumber}
>
    <IconMinusCircle class="text-lg" />
</button>

<button
    class="-mr-2 h-full pl-0.5 pr-2 text-gray-500 duration-200 outline-inset hover:text-gray-300"
    type="button"
    on:click={incrementNumber}
>
    <IconPlusCircle class="text-lg" />
</button>
