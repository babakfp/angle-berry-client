<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import { goto } from "$app/navigation"
    import { page } from "$app/state"
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import Form from "$lib/components/form/Form.svelte"
    import Input from "$lib/components/form/Input.svelte"
    import Select from "$lib/components/form/Select.svelte"
    import { isUserACreatedBeforeUserB } from "$lib/utilities/isUserACreatedBeforeUserB"
    import { useIssue, useSnapshot } from "$lib/utilities/remote-forms"
    import { loadUserToEdit, updateUser } from "./data.remote"

    let { data } = $props()

    const userToEdit = await loadUserToEdit(page.params.id!)

    // TODO: should be $derived?
    updateUser.fields.isAdmin.set((() => userToEdit.isAdmin)())
    updateUser.fields.retainedTiers.set((() => userToEdit.retainedTiers)())

    // TODO: should be $derived?
    let selectedRetainedTiers = $state(
        (() =>
            data.tiers
                .filter((tier) => userToEdit.retainedTiers.includes(tier.id))
                .map((tier) => ({ value: tier.id, label: tier.name })))(),
    )

    $effect(() => {
        updateUser.fields.retainedTiers.set(
            selectedRetainedTiers.map((tier) => tier.value),
        )
    })

    const REDIRECT_MESSAGE = "Updated successfully!"

    export const snapshot = useSnapshot(updateUser)

    const formIssue = $derived(useIssue(updateUser))

    let isRedirecting = $state(false)
</script>

<svelte:head>
    <title>User : {userToEdit.username}</title>
</svelte:head>

<div class="mx-auto w-full max-w-sm">
    <!-- TODO: maybe we should just not show seccess message in form? Only for errors. seccess can be done just with a toast. -->
    <!-- TODO: and maybe we should not use toast for error when not necessary? -->
    <Form
        form={updateUser}
        enhance={async ({ submit }) => {
            await updateUser.validate()

            if (updateUser.fields.allIssues()?.length) {
                return
            }

            await submit()

            if (formIssue) {
                toast.error(formIssue)
            }

            if (updateUser.result?.redirect) {
                isRedirecting = true
                toast.success(REDIRECT_MESSAGE)
                // TODO: should I await other gotos too?
                await goto(updateUser.result.redirect)
                // TODO: it seems like I need this isRedirecting in other remote functions too
                isRedirecting = false
            }
        }}
        message={isRedirecting ? REDIRECT_MESSAGE : formIssue}
        isRedirecting={!!isRedirecting}
        class="mt-4"
        submitButtonText="Update"
        submitButtonClass={{
            "btn-brand pointer-events-none opacity-50":
                data.loggedInUser.id !== userToEdit.id
                && userToEdit.isAdmin
                && !isUserACreatedBeforeUserB(data.loggedInUser, userToEdit),
        }}
    >
        <Input label="Username" value={userToEdit.username} readonly={true} />

        <Select
            {...updateUser.fields.retainedTiers.as("select multiple")}
            error={updateUser.fields.retainedTiers.issues()?.[0]?.message}
            label="Tiers"
            placeholder="Select tiers"
            options={data.tiers.map((tier) => ({
                value: tier.id,
                label: tier.name,
            }))}
            bind:selectedOptions={selectedRetainedTiers}
            readonly={data.loggedInUser.id !== userToEdit.id
                && userToEdit.isAdmin
                && !isUserACreatedBeforeUserB(data.loggedInUser, userToEdit)}
        />

        <Checkbox
            {...updateUser.fields.isAdmin.as("checkbox")}
            error={updateUser.fields.isAdmin.issues()?.[0]?.message}
            class="justify-self-start"
            label="Role admin"
            readonly={data.loggedInUser.id === userToEdit.id
                || (userToEdit.isAdmin
                    && !isUserACreatedBeforeUserB(
                        data.loggedInUser,
                        userToEdit,
                    ))}
        />

        <input {...updateUser.fields.id.as("hidden", page.params.id!)} />
    </Form>
</div>
