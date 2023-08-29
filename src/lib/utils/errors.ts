export const errors = {
	invalid_credentials: 'Invalid login credentials.',
	account_locked: 'Your account has been locked. Please contact support.',
	auth_required: 'You must be logged in to view that page',
	unknown: 'An unknown error occurred. Please try again later.',
	server: 'An error occurred on the server. Please try again later.'
};

export function getErrorMessage(error: Errors | null) {
	return error && errors[error];
}

export type Errors = keyof typeof errors;

