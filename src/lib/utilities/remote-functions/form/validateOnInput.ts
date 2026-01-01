import type { RemoteForm } from "@sveltejs/kit"

export const validateOnInput = (form: RemoteForm<any, unknown>) => {
    if (!!form.result) return
    if (!form.fields.allIssues()?.length) return
    form.validate()
}
