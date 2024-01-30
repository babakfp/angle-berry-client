<script lang="ts">
    export let disabled = false
    export let _class = ""
    export { _class as class }
</script>

<button
    type="submit"
    class="{_class || 'btn-brand'} btn h-14 w-full active:scale-95"
    {disabled}
>
    <slot />
</button>
