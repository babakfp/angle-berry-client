<script>
	import MessageActionPreview from "./MessageActionPreview.svelte"
	import { isReplying, replyTargetMessage } from "./replyMessage.js"
</script>

<MessageActionPreview
	title="Replying to {$replyTargetMessage.expand.user.username}"
	content={$replyTargetMessage.content}
	messageId={$replyTargetMessage.id}
	on:close={() => isReplying.set(false)}
	bind:isOpen={$isReplying}
>
	<!--  -->
</MessageActionPreview>
