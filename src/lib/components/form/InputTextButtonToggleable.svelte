<script lang="ts">
    import InputTextButton from "./InputTextButton.svelte"

    export let isActive = false
    export let activeText: string
    export let inActiveText: string
</script>

<InputTextButton class="overflow-hidden" on:click>
    <span class="duration-200 {isActive && 'scale-50 hide'}">
        {activeText}
    </span>
    <span class="absolute duration-200 {!isActive && 'scale-50 hide'}">
        {inActiveText}
    </span>
</InputTextButton>
