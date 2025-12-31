import type { RemoteForm, RemoteFormInput } from "@sveltejs/kit"

export const getFormMessage = (form: RemoteForm<RemoteFormInput, unknown>) => {
    return form.fields.allIssues()?.find(({ path }) => !path.length)?.message
}
