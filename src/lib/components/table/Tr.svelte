<script>
    export let _class = ""
    export { _class as class }
</script>

<tr class={_class}>
    <slot />
</tr>
