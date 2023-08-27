import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import { setError, superValidate } from 'sveltekit-superforms/server';

import { signInSchema } from '$lib/schema/auth';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';

export const load = (async () => {
	const form = await superValidate(signInSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		let error = false;

		const form = await superValidate(request, signInSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			const key = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			error = true;
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return setError(form, '', 'Incorrect email or password.');
			}
			return setError(form, '', 'Server error, please try again later.');
		}

		if (!error) throw redirect(302, '/');

		return { form };
	}
} satisfies Actions;

