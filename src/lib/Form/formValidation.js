import { fail } from "@sveltejs/kit"

export const minUsernameLength = 4
export const maxUsernameLength = 12
export const minPasswordLength = 8
export const maxPasswordLength = 32

const validationMessages = {
	required: "Cannot be blank.",
	length: length => {
		if (length.min && length.max) {
			return `The length must be between ${length.min} and ${length.max}.`
		}
		if (length.min) {
			return `Minimum of ${length.min} character is required.`
		}
		if (length.max) {
			return `Maximum of ${length.max} character is required.`
		}
		throw new Error("Something went wrong,")
	},
	pattern: "Value doesn't match the expected pattern.",
}

export function isUsernameInvalid(value) {
	if (!value) {
		return fail(400, {
			username: {
				value,
				code: "validation_required",
				message: validationMessages.required,
			},
		})
	}
	if (value.length < minUsernameLength || value.length > maxUsernameLength) {
		return fail(400, {
			username: {
				value,
				code: "validation_length_out_of_range",
				message: validationMessages.length({
					min: minUsernameLength,
					max: maxUsernameLength,
				}),
			},
		})
	}
	if (!value.match(/[a-z0-9]/)) {
		return fail(400, {
			username: {
				value,
				code: "validation_length_out_of_range",
				message: `${validationMessages.pattern} Only lowercase letters and numbers are allowed. [a-z0-9]`,
			},
		})
	}

	return false
}

export function isPasswordInvalid(value, dataToReturnBack) {
	if (!value) {
		return fail(400, {
			password: {
				code: "validation_required",
				message: validationMessages.required,
			},
			...dataToReturnBack,
		})
	}
	if (value.length < minPasswordLength || value.length > maxPasswordLength) {
		return fail(400, {
			password: {
				code: "validation_length_out_of_range",
				message: validationMessages.length({
					min: minPasswordLength,
					max: maxPasswordLength,
				}),
			},
			...dataToReturnBack,
		})
	}

	return false
}
