<script>
    import Input from "./Input.svelte"

    export let value = ""
    export let error = ""
</script>

<Input
    bind:value
    name="username"
    label="Username"
    placeholder="A unique username"
    autocomplete="username"
    {...$$restProps}
    {error}
/>
