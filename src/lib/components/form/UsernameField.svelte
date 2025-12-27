<script lang="ts">
    import Input, { type InputProps } from "./Input.svelte"

    let {
        value = $bindable(""),
        ...rest
    }: Omit<InputProps, "type" | "buttons"> = $props()
</script>

<Input
    bind:value
    name="username"
    label="Username"
    placeholder="A unique username"
    autocomplete="username"
    {...rest}
/>
