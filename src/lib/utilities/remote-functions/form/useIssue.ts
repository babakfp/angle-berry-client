import type { RemoteForm } from "@sveltejs/kit"

export const useIssue = (form: RemoteForm<any, any>) => {
    return form.fields.allIssues()?.find(({ path }) => !path.length)?.message
}
