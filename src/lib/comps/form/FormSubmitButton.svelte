<script>
    export let disabled = false
    export let _class = ""
    export { _class as class }
</script>

<button
    class="{_class} block h-14 w-full rounded bg-white text-gray-700"
    {disabled}
>
    <slot />
</button>
