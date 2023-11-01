<script>
    import Input from "./Input.svelte"

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
    <button
        slot="buttons"
        class="btn-gray-light btn overflow-hidden px-3 text-2xs lowercase"
        class:hide={!value}
        type="button"
        on:click={() => (isPasswordVisible = !isPasswordVisible)}
    >
        <span
            class="mt-0.5 duration-100
				{isPasswordVisible && '-translate-y-4 scale-50 hide'}
			"
        >
            Show
        </span>
        <span
            class="absolute mt-0.5 duration-100
				{!isPasswordVisible && 'translate-y-4 scale-50 hide'}
			"
        >
            Hide
        </span>
    </button>
</Input>
