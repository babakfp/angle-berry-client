<script>
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div
	class="h-dscreen mx-auto grid max-w-xs content-center items-center text-center"
>
	<h1 class="font-bold text-4xl text-white">
		{$page.status}
	</h1>

	<p class="text-gray-400">
		{#if $page.status === 404}
			Sorry, the page that you are looking for couldn't be found!
		{:else}
			{$page.error.message}
		{/if}
	</p>
</div>
