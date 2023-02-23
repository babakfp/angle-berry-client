<script>
	import { onMount } from "svelte"
	import { fade, fly } from "svelte/transition"
	import { page } from "$app/stores"
	import { pageTransitionValues } from "$lib/pageTransitionValues.js"
	import { persisted } from "svelte-local-storage-store"
	import { beforeNavigate } from "$app/navigation"

	let video
	let isVideoDownloaded = false
	$: if (video) setVideoSize()

	function setVideoSize() {
		if (video?.style) {
			const bodyWdithHeightSum =
				document.body.clientWidth + document.body.clientHeight
			video.style.minWidth = `${bodyWdithHeightSum}px`
			video.style.minHeight = `${bodyWdithHeightSum}px`
		}
	}

	let showBackground = false
	onMount(() => (showBackground = true))

	const previusRandomInt = persisted("previusRandomInt", 0)
	let videoNameIndex = getRandomIntInclusiveNoRepeat(1, 5)
	$: if (videoNameIndex === videoNameIndex) {
		isVideoDownloaded = false
	}
	beforeNavigate(() => (videoNameIndex = getRandomIntInclusiveNoRepeat(1, 5)))

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
	}

	function getRandomIntInclusiveNoRepeat(min, max) {
		const randomInt = getRandomIntInclusive(min, max)
		if (
			($previusRandomInt || $previusRandomInt === 0) &&
			$previusRandomInt === randomInt
		) {
			return getRandomIntInclusiveNoRepeat(min, max)
		}
		$previusRandomInt = randomInt
		return randomInt
	}
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
	{#key videoNameIndex}
		<video
			class="absolute object-cover duration-1000 hide inset-center
			{isVideoDownloaded && 'show'}"
			bind:this={video}
			src="/auth-background-video-{videoNameIndex}.mp4"
			autoplay
			loop
			muted
			preload="none"
			transition:fade
			on:loadeddata={e => {
				isVideoDownloaded = !!e.target.readyState
			}}
		/>
	{/key}
	<div class="absolute -inset-full bg-gray-800/95" />
</div>
