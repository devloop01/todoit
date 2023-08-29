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

// TODO: Secure the payload when it sends formdata. Password is revealed in network tab
export const actions = {
	default: async ({ request, locals, url }) => {
		const form = await superValidate(request, signInSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		let error = false;
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

		const redirectTo = url.searchParams.get('redirectTo') ?? '/';

		if (!error) throw redirect(302, `/${redirectTo.slice(1)}`);

		return { form };
	}
} satisfies Actions;

