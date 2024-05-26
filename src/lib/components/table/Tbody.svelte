<script lang="ts">
    export let class_ = ""
    export { class_ as class }
</script>

<tbody class={class_}>
    <slot />
</tbody>
