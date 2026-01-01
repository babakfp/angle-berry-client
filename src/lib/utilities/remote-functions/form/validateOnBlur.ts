import type { RemoteForm, RemoteFormInput } from "@sveltejs/kit"

export const validateOnBlur = (form: RemoteForm<RemoteFormInput, unknown>) => {
    if (!!form.result) return
    form.validate()
}
