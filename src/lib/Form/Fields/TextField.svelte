<script>
	import Label from "./Label.svelte"
	import Error from "./Error.svelte"

	export let label = ""
	export let required = false

	export let name = ""
	export let value = ""
	export let placeholder = ""
	export let autocomplete = ""
	export let minlength = ""
	export let maxlength = ""
	export let readonly = false

	export let className = ""
	export { className as class }

	export let message = ""
</script>

<label class="group">
	<Label {label} {required} />

	<div class="relative">
		<input
			class="{className || ''} block h-12 w-full rounded bg-gray-700 px-4
				placeholder:text-xs placeholder:text-gray-500
				[&:focus+div]:show
			"
			type="text"
			bind:value
			{name}
			{placeholder}
			{minlength}
			{maxlength}
			{autocomplete}
			{required}
			{readonly}
		/>

		{#if $$slots.buttons}
			<div
				class="absolute right-0 flex h-full items-center rounded-r bg-gray-700/50 px-4 backdrop-blur duration-100 ease-in-out hide inset-y-center focus-within:show group-hover:show"
			>
				<slot name="buttons" />
			</div>
		{/if}
	</div>

	<Error {message} />
</label>
