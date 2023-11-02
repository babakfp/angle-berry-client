<script lang="ts">
    export let message: string
    export let _class = ""
    export { _class as class }
</script>

<p class="{_class} text-xs text-red-400">
    {message}
</p>
