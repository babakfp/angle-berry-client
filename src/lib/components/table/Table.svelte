<script lang="ts">
    export let _class = ""
    export { _class as class }
</script>

<div
    class="{_class} overflow-x-auto whitespace-nowrap rounded border border-white/5 shadow-md"
>
    <table class="w-full text-left text-sm text-gray-400">
        <slot />
    </table>
</div>
