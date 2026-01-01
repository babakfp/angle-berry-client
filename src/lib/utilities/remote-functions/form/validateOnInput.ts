import type { RemoteForm, RemoteFormInput } from "@sveltejs/kit"

export const validateOnInput = (form: RemoteForm<RemoteFormInput, unknown>) => {
    if (!!form.result) return
    if (!form.fields.allIssues()?.length) return
    form.validate()
}
