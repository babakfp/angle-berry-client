<script lang="ts">
    export let disabled = false
    export let class_ = ""
    export { class_ as class }
</script>

<button
    type="submit"
    class="{class_ ||
        'btn-brand'} btn h-14 w-full will-change-transform active:scale-95"
    {disabled}
>
    <slot />
</button>
