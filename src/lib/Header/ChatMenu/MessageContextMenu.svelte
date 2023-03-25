<script>
	export let user
	export let message
	export let isContextMenuOpen = false
</script>

{#if isContextMenuOpen}
	<ul
		class="MessageContextMenu absolute top-full max-h-56 w-36 -translate-y-5 overflow-y-auto rounded bg-gray-700 p-1 text-xs shadow
		{user.id === message.expand.user.id ? 'right-4' : 'left-4'}
		"
	>
		<slot />
	</ul>
{/if}
