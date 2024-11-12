<script lang="ts">
    import type { FullAutoFill } from "svelte/elements"
    import Input from "./Input.svelte"
    import InputTextButtonToggleable from "./InputTextButtonToggleable.svelte"

    let {
        value = $bindable(""),
        autocomplete,
        error,
        ...rest
    }: {
        value?: string
        autocomplete: FullAutoFill
        error?: string
        [key: string]: any
    } = $props()

    let isPasswordVisible = $state(false)
</script>

<Input
    type={isPasswordVisible ? "text" : "password"}
    bind:value
    name="password"
    label="Password"
    placeholder="A secret that remains undiscovered"
    {autocomplete}
    {...rest}
    {error}
>
    {#snippet buttons()}
        {#if value}
            <InputTextButtonToggleable
                isActive={isPasswordVisible}
                activeText="Show"
                inActiveText="Hide"
                onclick={() => (isPasswordVisible = !isPasswordVisible)}
            />
        {/if}
    {/snippet}
</Input>
