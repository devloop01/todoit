import type { Actions, PageServerLoad } from './$types';

import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';

import { signInSchema } from '$lib/schema/auth';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import type { FormMessage } from '$lib/types';

export const load = (async () => {
	const form = await superValidate<typeof signInSchema, FormMessage>(signInSchema);
	return { form };
}) satisfies PageServerLoad;

// TODO: Secure the payload when it sends formdata. Password is revealed in network tab
export const actions = {
	default: async (event) => {
		const { request, locals, url } = event;

		const form = await superValidate<typeof signInSchema, FormMessage>(request, signInSchema);

		if (!form.valid) {
			return message(form, { type: 'error', message: 'Invalid form!' });
		}

		const { email, password } = form.data;

		let isError = false;
		try {
			const key = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			isError = true;
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return message(
					form,
					{ type: 'error', message: 'Incorrect email or password' },
					{ status: 401 }
				);
			}
			return message(
				form,
				{ type: 'error', message: 'Server error, please try again later.' },
				{ status: 500 }
			);
		}

		const redirectTo = url.searchParams.get('redirectTo') ?? '/';

		if (!isError)
			throw redirect(
				`/${redirectTo.slice(1)}`,
				{ type: 'success', message: 'Logged in successfully!' },
				event
			);

		return message(form, { type: 'success', message: 'Form submiitted' });
	}
} satisfies Actions;

