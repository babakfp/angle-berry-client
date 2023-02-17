<script>
	import { onMount } from "svelte"
	import { fly } from "svelte/transition"
	import { page } from "$app/stores"
	import { pageTransitionValues } from "$lib/pageTransitionValues.js"

	let video
	$: if (video) setVideoSize()

	function setVideoSize() {
		const bodyWdithHeightSum =
			document.body.clientWidth + document.body.clientHeight
		video.style.minWidth = `${bodyWdithHeightSum}px`
		video.style.minHeight = `${bodyWdithHeightSum}px`
	}

	let showBackground = false
	onMount(() => (showBackground = true))
</script>

<svelte:window on:resize={() => setVideoSize()} />

{#key $page.url.pathname}
	<div
		class="min-h-dscreen mx-auto grid w-full max-w-xs content-center items-center py-12"
		in:fly={pageTransitionValues}
	>
		<slot />
	</div>
{/key}

<div
	class="h-dscreen pointer-events-none fixed left-0 top-0 -z-1 w-[100dvw] blur duration-1000 hide
	{showBackground && 'show'}"
>
	<video
		class="absolute object-cover inset-center"
		bind:this={video}
		src="/auth-background-video.mp4"
		autoplay
		loop
		muted
		preload="none"
	/>
	<div class="absolute -inset-full bg-gray-800/95" />
</div>
