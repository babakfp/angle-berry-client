<script lang="ts">
    import Input from "./Input.svelte"

    let {
        value = $bindable(""),
        error = "",
        ...rest
    }: {
        value?: string
        error?: string
        [key: string]: any
    } = $props()
</script>

<Input
    bind:value
    name="username"
    label="Username"
    placeholder="A unique username"
    autocomplete="username"
    {...rest}
    {error}
/>
