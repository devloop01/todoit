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
	default: async ({ locals, url }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirectToSignIn({ url, error: 'auth_required' });
		if (session.user.email_verified) {
			throw redirect(302, '/');
		}
		try {
			const token = await generateEmailVerificationToken(session.user.userId);
			await sendEmailVerificationLink(token);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};

