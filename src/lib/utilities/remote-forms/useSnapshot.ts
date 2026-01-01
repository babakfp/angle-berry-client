import type { RemoteForm } from "@sveltejs/kit"

export const useSnapshot = (form: RemoteForm<any, unknown>) => {
    return {
        capture: () => form.fields.value(),
        restore: (fields: ReturnType<typeof form.fields.value>) => {
            return form.fields.set(fields)
        },
    }
}
