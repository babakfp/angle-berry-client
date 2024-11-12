<script lang="ts">
    let {
        class: class_,
        text,
        type,
    }: {
        class?: string
        text: string
        type: "error" | "success"
    } = $props()
</script>

<p
    class="{class_} text-xs"
    class:text-red-400={type === "error"}
    class:text-green-400={type === "success"}
>
    {text}
</p>
