<script>
    import Input from "./Input.svelte"
    import InputTextButtonToggleable from "./InputTextButtonToggleable.svelte"

    export let value = ""
    export let autocomplete = ""
    export let error = ""

    let isPasswordVisible = false
</script>

<Input
    type={isPasswordVisible ? "text" : "password"}
    bind:value
    name="password"
    label="Password"
    placeholder="Something that no one knows"
    {autocomplete}
    {...$$restProps}
    {error}
>
    <svelte:fragment slot="buttons">
        {#if value}
            <InputTextButtonToggleable
                isActive={isPasswordVisible}
                activeText="Show"
                inActiveText="Hide"
                on:click={() => (isPasswordVisible = !isPasswordVisible)}
            />
        {/if}
    </svelte:fragment>
</Input>
