import type { RemoteForm } from "@sveltejs/kit"

export const validateOnBlur = (form: RemoteForm<any, unknown>) => {
    if (!!form.result) return
    form.validate()
}
