<script lang="ts">
    export let class_ = ""
    export { class_ as class }
    export let text: string
    export let type: "error" | "success"
</script>

<p
    class="{class_} text-xs"
    class:text-red-400={type === "error"}
    class:text-green-400={type === "success"}
>
    {text}
</p>
