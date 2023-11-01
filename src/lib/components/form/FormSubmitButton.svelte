<script lang="ts">
    export let disabled = false
</script>

<button class="btn btn-brand h-14 w-full active:scale-95" {disabled}>
    <slot />
</button>
