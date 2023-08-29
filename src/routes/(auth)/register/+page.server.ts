import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { signUpSchema } from '$lib/schema/auth';
import { auth } from '$lib/server/lucia';
import { sendEmailVerificationLink } from '$lib/server/email';
import { generateEmailVerificationToken } from '$lib/server/token';
import postgres from 'postgres';

export const load = (async () => {
	const form = await superValidate(signUpSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, url }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, email, password, confirmPassword } = form.data;

		if (password !== confirmPassword) {
			return setError(form, 'confirmPassword', 'Passwords must match');
		}

		let error = false;
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email.toLowerCase(),
					password
				},
				attributes: {
					name,
					email: email.toLowerCase(),
					email_verified: false,
					created_at: new Date().toISOString()
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(token);
		} catch (e) {
			error = true;
			if (e instanceof postgres.PostgresError && e.code === '23505') {
				return setError(form, '', 'Email already in use.');
			}
			return setError(form, '', 'Server error, please try again later.');
		}

		const redirectTo = url.searchParams.get('redirectTo') ?? '/';

		if (!error) throw redirect(302, `/${redirectTo.slice(1)}`);

		return { form };
	}
} satisfies Actions;

