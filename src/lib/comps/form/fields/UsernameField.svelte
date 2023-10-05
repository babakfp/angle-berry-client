<script>
    import Input from "./Input.svelte"

    export let value = ""
    export let error = ""
</script>

<Input
    bind:value
    name="username"
    label="Username"
    placeholder="Only lowercase Latin letters"
    autocomplete="username"
    {...$$restProps}
    {error}
/>
