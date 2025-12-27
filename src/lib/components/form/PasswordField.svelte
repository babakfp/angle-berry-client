<script lang="ts">
    import Input, { type InputProps } from "./Input.svelte"
    import InputTextButtonToggleable from "./InputTextButtonToggleable.svelte"

    let {
        value = $bindable(""),
        ...rest
    }: Omit<InputProps, "type" | "buttons"> = $props()

    let isPasswordVisible = $state(false)
</script>

<Input
    type={isPasswordVisible ? "text" : "password"}
    bind:value
    name="password"
    label="Password"
    placeholder="A secret that remains undiscovered"
    {...rest}
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
