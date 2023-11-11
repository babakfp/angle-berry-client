<script>
    const collections = ["Tiers", "Users", "Videos"]
</script>

<ul class="mx-auto grid w-full max-w-xs gap-2">
    {#each collections as item}
        <li>
            <a
                class="link btn btn-gray-light-glass-outline w-full"
                href="/admin/{item.toLowerCase()}">{item}</a
            >
        </li>
    {/each}
</ul>
