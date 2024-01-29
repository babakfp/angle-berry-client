<script lang="ts">
    import { page } from "$app/stores"
</script>

<svelte:head>
    <title>Angle Berry - {$page.status}</title>
</svelte:head>

<div
    class="mx-auto grid h-screen max-w-xs content-center items-center text-center"
>
    <h1 class="text-8xl font-bold text-white">
        {$page.status}
    </h1>

    <div class="text-gray-400">
        {#if $page.status === 404}
            {#if $page.error?.message}
                <p>{$page.error.message}</p>
            {:else}
                <p>The page that you are looking for couldn't be found!</p>
            {/if}
        {:else if $page.error}
            <p>{$page.error.message}</p>
        {/if}

        {#if $page.status === 404 || $page.status === 401}
            <a class="btn btn-gray-light mt-4" href="/">Go home</a>
        {/if}
    </div>
</div>
