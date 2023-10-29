<script>
    export let _class = ""
    export { _class as class }
</script>

<thead class="{_class} bg-white/5 text-xs uppercase">
    <slot />
</thead>

<style lang="postcss">
    thead :global(th) {
        @apply py-3 pt-3.5;
    }
</style>
