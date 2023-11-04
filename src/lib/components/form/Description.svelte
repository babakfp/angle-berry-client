<script lang="ts">
    export let _class = ""
    export { _class as class }
    export let text: string
    export let type: "error" | "success"
</script>

<p
    class="{_class} text-xs"
    class:text-red-400={type === "error"}
    class:text-green-400={type === "success"}
>
    {text}
</p>
