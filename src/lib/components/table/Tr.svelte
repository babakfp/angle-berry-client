<script lang="ts">
    export let _class = ""
    export { _class as class }
</script>

<tr class="{_class} group/tr">
    <slot />
</tr>
