<script lang="ts">
    const collections = ["Tiers", "Users", "Videos"]
</script>

<svelte:head>
    <title>Admin</title>
</svelte:head>

<ul class="mx-auto grid w-full max-w-xs gap-2">
    {#each collections as item}
        <li>
            <a
                class="link btn btn-gray-light-outline w-full"
                href="/admin/{item.toLowerCase()}">{item}</a
            >
        </li>
    {/each}
</ul>
