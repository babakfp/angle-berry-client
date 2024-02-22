<script lang="ts">
    const collections = [
        { name: "Tiers", slug: "tiers" },
        { name: "Users", slug: "users" },
        { name: "Videos", slug: "videos" },
    ]
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<ul class="mx-auto grid w-full max-w-xs gap-2">
    {#each collections as item}
        <li>
            <a
                class="link btn btn-gray-light-outline w-full"
                href="/admin/{item.slug}"
            >
                {item.name}
            </a>
        </li>
    {/each}
</ul>
