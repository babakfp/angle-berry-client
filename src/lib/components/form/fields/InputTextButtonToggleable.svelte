<script>
    import InputTextButton from "./InputTextButton.svelte"

    export let isActive = false
    export let activeText = ""
    export let inActiveText = ""
</script>

<InputTextButton class="overflow-hidden" on:click>
    <span
        class="mt-0.5 duration-100
            {isActive && '-translate-y-4 scale-50 hide'}"
    >
        {activeText}
    </span>
    <span
        class="absolute mt-0.5 duration-100
            {!isActive && 'translate-y-4 scale-50 hide'}"
    >
        {inActiveText}
    </span>
</InputTextButton>
