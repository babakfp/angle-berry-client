<script>
	import MessageActionPreview from "./MessageActionPreview.svelte"
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
</script>

<MessageActionPreview
	title="Replying to {$messageThatWeAreReplyingTo.expand.user.username}"
	content={$messageThatWeAreReplyingTo.content}
	messageId={$messageThatWeAreReplyingTo.id}
	on:close={() => isReplying.set(false)}
	bind:isOpen={$isReplying}
>
	<!--  -->
</MessageActionPreview>
