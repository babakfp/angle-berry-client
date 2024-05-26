<script lang="ts">
    export let class_ = ""
    export { class_ as class }
</script>

<div
    class="{class_} overflow-x-auto whitespace-nowrap rounded border border-white/5 shadow-md"
>
    <table class="w-full text-left text-sm text-gray-400">
        <slot />
    </table>
</div>
