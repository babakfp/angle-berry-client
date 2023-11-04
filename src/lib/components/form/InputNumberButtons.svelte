<script lang="ts">
    import IconPlusCircle from "$icons/IconPlusCircle.svelte"
    import IconMinusCircle from "$icons/IconMinusCircle.svelte"

    export let value: number
    export let min: number | undefined = undefined
    export let max: number | undefined = undefined

    $: {
        if (max && value >= max) {
            value = max
        }
        if (min && value <= min) {
            value = min
        }
    }

    function incrementNumber() {
        if (max) {
            if (value < max) {
                value += 1
            }
        } else {
            value += 1
        }
    }

    function decrementNumber() {
        if (min || min === 0) {
            if (value > min) {
                value = value - 1
            }
        } else {
            value = value - 1
        }
    }
</script>

<button
    class="h-full pl-1 pr-0.5 text-gray-500 duration-200 outline-inset hover:text-gray-300"
    type="button"
    on:click={incrementNumber}
>
    <IconPlusCircle class="text-lg" />
</button>

<button
    class="-mr-2 h-full pl-0.5 pr-2 text-gray-500 duration-200 outline-inset hover:text-gray-300"
    type="button"
    on:click={decrementNumber}
>
    <IconMinusCircle class="text-lg" />
</button>
