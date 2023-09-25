import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';
import { signUpSchema } from '$lib/schema/auth';
import { auth } from '$lib/server/lucia';
import { sendEmailVerificationLink } from '$lib/server/email';
import { generateEmailVerificationToken } from '$lib/server/token';
import postgres from 'postgres';
import type { FormMessage } from '$lib/types';

export const load = (async () => {
	const form = await superValidate<typeof signUpSchema, FormMessage>(signUpSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request, locals } = event;

		const form = await superValidate<typeof signUpSchema, FormMessage>(request, signUpSchema);

		if (!form.valid) {
			return message(form, { type: 'error', message: 'Invalid form!' });
		}

		const { name, email, password, confirmPassword } = form.data;

		if (password !== confirmPassword) {
			return setError(form, 'confirmPassword', 'Passwords must match');
		}

		let isError = false;
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

			// send email verification link
			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink({ email, token });
		} catch (e) {
			isError = true;

			if (e instanceof postgres.PostgresError && e.code === '23505') {
				return setError(form, 'email', 'Email already in use.');
			}

			return message(
				form,
				{ type: 'error', message: 'Server error, please try again later' },
				{ status: 500 }
			);
		}

		// after successful registration, redirect to confirm email page
		if (!isError)
			throw redirect(
				`/confirm-email`,
				{ type: 'success', message: 'Registered successfully' },
				event
			);

		return message(form, {
			type: 'success',
			message: 'Form submitted successfully!'
		});
	}
} satisfies Actions;

