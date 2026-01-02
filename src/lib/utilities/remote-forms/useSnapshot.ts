import type { RemoteForm } from "@sveltejs/kit"

// TODO: https://svelte.dev/docs/kit/remote-functions#form-Handling-sensitive-data
// You can prevent sensitive data (such as passwords and credit card numbers) from being sent back to the user by using a name with a leading underscore:
export const useSnapshot = (form: RemoteForm<any, unknown>) => {
    return {
        capture: () => form.fields.value(),
        restore: (fields: ReturnType<typeof form.fields.value>) => {
            return form.fields.set(fields)
        },
    }
}
