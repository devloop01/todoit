import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';

import type { PageServerLoad, Actions } from './$types';
import { redirectToSignIn } from '$lib/utils/redirect';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const { locals, url } = event;

		const session = await locals.auth.validate();
		if (!session) throw redirectToSignIn({ url, error: 'auth_required' });
		if (session.user.email_verified) {
			throw redirect('/', { message: 'Email already verified' }, event);
		}

		try {
			const token = await generateEmailVerificationToken(session.user.userId);
			await sendEmailVerificationLink({ email: session.user.email, token });

			console.log('Email verification link sent');

			return { success: true };
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};

