<script>
    import Label from "./Label.svelte"
    import Error from "../Error.svelte"

    export let label = ""
    export let required = false

    export let type = "text"
    export let name = ""
    export let value = ""
    export let placeholder = ""
    export let autocomplete = ""
    export let minlength = ""
    export let maxlength = ""
    export let readonly = false

    export let className = ""
    export { className as class }

    export let message = ""

    function fixDynamicTypeTwoWayBindingOfTheValue(e) {
        // In here, you can switch on type and implement whatever behaviour you need
        if (type.match(/^(number|range)$/)) {
            value = +e.target.value
        } else {
            value = e.target.value
        }
    }
</script>

<label class="group">
    <Label {label} {required} />

    <div class="relative">
        <input
            class="{className} block h-12 w-full rounded bg-gray-700 px-4 placeholder:text-xs placeholder:text-gray-500 [&:focus+div]:show"
            {type}
            {value}
            {name}
            {placeholder}
            {minlength}
            {maxlength}
            {autocomplete}
            {required}
            {readonly}
            on:input={fixDynamicTypeTwoWayBindingOfTheValue}
        />

        {#if $$slots.buttons}
            <div
                class="absolute right-0 flex h-full items-center rounded-r px-3 duration-100 ease-in-out hide inset-y-center focus-within:show group-hover:show"
            >
                <slot name="buttons" />
            </div>
        {/if}
    </div>

    <Error class="mt-2" {message} />
</label>
