<script>
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import VideoPlayer from "$components/VideoPlayer.svelte"
    import Input from "$components/form/fields/Input.svelte"
    import { schema } from "./schema.js"
    import { superForm } from "sveltekit-superforms/client"
    import Form from "$components/form/Form.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"
    import Modal from "$components/Modal.svelte"

    export let data
    export let form

    let isGalleryPopupOpen = false

    const {
        form: _form,
        errors,
        constraints,
        validate,
    } = superForm(data.form, { validators: schema })

    if (!$_form.name) $_form.name = data.tier.name
    if (!$_form.videos.length) $_form.videos = data.tier.videos

    let isShowingAllSelectedVideos = false
    let maxVisibleVideos = 3

    $: selectedVideos = data.videos.filter(v => $_form.videos.includes(v.id))

    // function sortVideosByChecked(videos, tierVideos) {
    //     return videos.sort((a, b) => {
    //         const aInTier = tierVideos.includes(a.id)
    //         const bInTier = tierVideos.includes(b.id)

    //         if (aInTier && !bInTier) {
    //             return -1 // a should come before b
    //         } else if (!aInTier && bInTier) {
    //             return 1 // b should come before a
    //         } else {
    //             return 0 // no preference
    //         }
    //     })
    // }
</script>

<svelte:head>
    <title>Tier: {data.tier.name}</title>
</svelte:head>

<div class="mx-auto w-full max-w-xs">
    <Form
        method="POST"
        message={form?.message}
        submitButtonText="Update"
        {errors}
        {validate}
    >
        <Input
            type="text"
            label="Name"
            name="name"
            bind:value={$_form.name}
            placeholder={data.tier.name}
            error={$errors?.name ? $errors?.name[0] : form?.data?.name?.message}
            {...$constraints.name}
        />
        <Input
            type="number"
            label="Price"
            name="price"
            bind:value={$_form.price}
            placeholder={data.tier.price}
            error={$errors?.price
                ? $errors?.price[0]
                : form?.data?.price?.message}
            {...$constraints.price}
        />
        <Input
            type="number"
            label="Invites"
            name="invites"
            bind:value={$_form.invites}
            placeholder={data.tier.invites}
            error={$errors?.invites
                ? $errors?.invites[0]
                : form?.data?.invites?.message}
            {...$constraints.invites}
        />
        <ul class="grid gap-4">
            {#each selectedVideos as video, i}
                {#if i + 1 <= maxVisibleVideos || isShowingAllSelectedVideos}
                    <li class="grid gap-1">
                        <VideoPlayer
                            src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                            preload="none"
                        />
                        <label
                            class="btn flex gap-2 bg-white/5 hover:bg-white/10"
                        >
                            <Checkbox
                                checked={$_form.videos.includes(video.id)}
                                bind:group={$_form.videos}
                                value={video.id}
                                name="videos"
                            />
                            {#if $_form.videos.includes(video.id)}
                                Selected
                            {/if}
                        </label>
                    </li>
                {/if}
            {/each}
            {#if $_form.videos.length > maxVisibleVideos}
                <button
                    class="btn btn-gray"
                    type="button"
                    on:click={() =>
                        (isShowingAllSelectedVideos =
                            !isShowingAllSelectedVideos)}
                >
                    {isShowingAllSelectedVideos ? "Show less" : "Show all"}
                </button>
            {/if}
            {#if data.videos.length > maxVisibleVideos}
                <button
                    class="btn btn-gray"
                    type="button"
                    on:click={() => (isGalleryPopupOpen = true)}
                >
                    Videos gallery
                </button>
            {/if}
        </ul>
    </Form>
</div>

{#if data.videos.length > maxVisibleVideos}
    <Modal
        title="Videos gallery"
        bind:isOpen={isGalleryPopupOpen}
        isFullSize={true}
    >
        <ul class="grid gap-4">
            {#each data.videos as video}
                <li class="grid gap-1">
                    <VideoPlayer
                        src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                        preload="none"
                    />
                    <label class="btn flex gap-2 bg-white/5 hover:bg-white/10">
                        <Checkbox
                            checked={$_form.videos.includes(video.id)}
                            bind:group={$_form.videos}
                            value={video.id}
                        />
                        {#if $_form.videos.includes(video.id)}
                            Selected
                        {/if}
                    </label>
                </li>
            {/each}
        </ul>
        <svelte:fragment slot="actions">
            <button
                class="btn btn-gray"
                on:click={() => (isGalleryPopupOpen = false)}>Close</button
            >
        </svelte:fragment>
    </Modal>
{/if}
