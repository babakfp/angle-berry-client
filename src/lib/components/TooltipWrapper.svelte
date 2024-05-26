<script lang="ts">
    export let class_ = ""
    export { class_ as class }
</script>

<div class="{class_} group relative inline-block">
    <slot />
</div>
