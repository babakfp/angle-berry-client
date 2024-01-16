<script lang="ts">
    const collections = ["Tiers", "Users", "Videos"]
</script>

<ul class="mx-auto grid w-full max-w-xs gap-2">
    {#each collections as item}
        <li>
            <a
                class="btn-gray-light-outline link btn w-full"
                href="/admin/{item.toLowerCase()}">{item}</a
            >
        </li>
    {/each}
</ul>
