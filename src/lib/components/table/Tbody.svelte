<script>
    export let _class = ""
    export { _class as class }
</script>

<tbody class={_class}>
    <slot />
</tbody>
