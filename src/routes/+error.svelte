<script>
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div
	class="mx-auto grid h-screen max-w-xs content-center items-center text-center"
>
	<h1 class="font-bold text-4xl text-white">
		{$page.status}
	</h1>

	<div class="text-gray-400">
		{#if $page.status === 404}
			<p>Sorry, the page that you are looking for couldn't be found!</p>
			<div class="mt-2">
				<a class="btn btn-light" href="/">Go home</a>
			</div>
		{:else}
			<p>{$page.error.message}</p>
		{/if}
	</div>
</div>
