<script lang="ts">
    export let _class = ""
    export { _class as class }
</script>

<th class="{_class} px-6">
    <slot />
</th>
