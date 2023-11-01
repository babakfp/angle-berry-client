<script lang="ts">
    export let _class = ""
    export { _class as class }
</script>

<div class="{_class} group relative inline-block">
    <slot />
</div>
