<script>
    import Label from "./Label.svelte"
    import Error from "../Error.svelte"
    import IconPlusCircle from "$icons/IconPlusCircle.svelte"
    import IconMinusCircle from "$icons/IconMinusCircle.svelte"

    export let label = ""
    export let required = false

    export let type = "text"
    export let name = ""
    export let value = ""
    export let placeholder = ""
    /** @type {string | null} */
    export let autocomplete = null
    /** @type {string | null} */
    export let minlength = null
    /** @type {string | null} */
    export let maxlength = null
    /** @type {number | null} */
    export let min = null
    /** @type {number | null} */
    export let max = null
    export let readonly = false
    export let pattern = null

    export let _class = ""
    export { _class as class }

    export let error = ""

    /**
     * @param {InputEvent} e
     */
    function bindValue(e) {
        if (type.match(/^(number|range)$/)) {
            value = +e.target.value
        } else {
            value = e.target.value
        }
    }

    $: if (type === "number") {
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
                value -= 1
            }
        } else {
            value -= 1
        }
    }
</script>

<div class="group grid">
    <Label {label} {required} for={name} />

    <div class="relative">
        <input
            class="{_class} reset-autofill-input block h-11 w-full rounded border-2 border-gray-700 bg-transparent px-4 placeholder:text-xs placeholder:text-gray-500 [&:focus+div]:show
                {type === 'number' ? 'reset-number-input' : ''}"
            {type}
            {value}
            {name}
            id={name}
            {placeholder}
            {minlength}
            {maxlength}
            {autocomplete}
            {required}
            {readonly}
            {pattern}
            {min}
            {max}
            on:input={bindValue}
        />

        {#if $$slots.buttons || type === "number"}
            <div
                class="absolute right-0 flex h-full items-center rounded-r px-3 duration-100 ease-in-out hide inset-y-center focus-within:show group-hover:show"
            >
                {#if $$slots.buttons}
                    <slot name="buttons" />
                {/if}

                {#if type === "number"}
                    <button
                        class="h-full px-1"
                        type="button"
                        on:click={incrementNumber}
                    >
                        <IconPlusCircle class="text-lg" />
                    </button>
                    <button
                        class="-mr-1 h-full px-1"
                        type="button"
                        on:click={decrementNumber}
                    >
                        <IconMinusCircle class="text-lg" />
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    {#if error}
        <Error class="mt-2" message={error} />
    {/if}
</div>

<style lang="postcss">
    .reset-autofill-input {
        -webkit-background-clip: text;
        -webkit-text-fill-color: theme(colors.body.text);
        box-shadow: inset 0 0 0 9999px theme(colors.body.bg);
    }
</style>
