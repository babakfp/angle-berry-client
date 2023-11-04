<script lang="ts">
    import Label from "$components/form/Label.svelte"
    import Description from "$components/form/Description.svelte"
    import InputNumberButtons from "$components/form/InputNumberButtons.svelte"

    export let label = ""
    export let required = false

    export let type = "text"
    export let name = ""
    export let value = ""
    export let placeholder = ""
    export let autocomplete: string | undefined = undefined
    export let minlength: number | undefined = undefined
    export let maxlength: number | undefined = undefined
    export let min: number | undefined = undefined
    export let max: number | undefined = undefined
    export let readonly = false
    export let pattern: string | undefined = undefined

    export let _class = ""
    export { _class as class }

    export let error = ""

    function bindValue(e: InputEvent) {
        if (type.match(/^(number|range)$/)) {
            value = +e.target.value
        } else {
            value = e.target.value
        }
    }
</script>

<div class="group grid">
    {#if label}
        <Label {label} {required} for={name} />
    {/if}

    <div class="relative">
        <input
            class="{_class} peer block h-11 w-full rounded border-2 border-gray-700 bg-transparent px-4 reset-autofill-input placeholder:text-xs placeholder:text-gray-500
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
                class="absolute right-0 flex h-full items-center rounded-r px-2 duration-200 hide inset-y-center focus-within:show group-hover:show peer-focus:show"
            >
                {#if $$slots.buttons}
                    <slot name="buttons" />
                {/if}

                {#if type === "number"}
                    <InputNumberButtons bind:value {min} {max} />
                {/if}
            </div>
        {/if}
    </div>

    {#if error}
        <Description class="mt-2" type="error" text={error} />
    {/if}
</div>
