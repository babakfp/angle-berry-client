<script lang="ts">
    export let class_ = ""
    export { class_ as class }
</script>

<thead class="{class_} border-b border-white/5 text-xs uppercase">
    <slot />
</thead>

<style lang="postcss">
    thead :global(th) {
        @apply py-3 pt-3.5;
    }
</style>
