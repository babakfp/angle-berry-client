<script lang="ts">
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import IconCheckSquareRegular from "phosphor-icons-svelte/IconCheckSquareRegular.svelte"

    export let _class = ""
    export { _class as class }
    export let checked = false
    export let value = "on"
    export let group: string[] = []
    export let disabled = false
    export let name = crypto.randomUUID()
    export let label = ""

    $: handleGroup(checked)

    const handleGroup = (checked: boolean) => {
        if (checked) {
            if (!group.includes(value)) {
                group = [...group, value]
            }
        } else {
            if (group.includes(value)) {
                group = group.filter(item => item !== value)
            }
        }
    }
</script>

<label
    class="{_class} inline-flex items-center gap-2
        {disabled && 'pointer-events-none opacity-50'}"
>
    <input
        class="hidden"
        type="checkbox"
        bind:checked
        on:change
        {value}
        {disabled}
        name={name || null}
        {...$$restProps}
    />

    {#if checked}
        <IconCheckSquareRegular class="text-xl" />
    {:else}
        <IconSquareRegular class="text-xl" />
    {/if}

    {#if label}
        <span>{label}</span>
    {/if}
</label>
