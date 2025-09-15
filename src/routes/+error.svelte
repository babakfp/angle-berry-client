<script lang="ts">
    import { page } from "$app/state"
</script>

<svelte:head>
    <title>{page.status}</title>
</svelte:head>

<main class="mx-auto grid h-screen max-w-xs content-center gap-4 text-center">
    <h1 class="text-8xl font-bold text-gray-50">
        {page.status}
    </h1>

    {#if page.status === 404}
        {#if page.error?.message}
            <p class="text-gray-400">{page.error.message}</p>
        {:else}
            <p class="text-gray-400">
                The page that you are looking for couldn't be found!
            </p>
        {/if}
    {:else if page.error}
        <p class="text-gray-400">{page.error.message}</p>
    {/if}

    {#if page.status === 404 || page.status === 401}
        <a class="link btn btn-gray-light-glass" href="/">Go home</a>
    {/if}
</main>
