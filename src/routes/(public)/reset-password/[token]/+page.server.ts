import { auth } from '$lib/server/lucia';
import { error, fail, redirect } from '@sveltejs/kit';
import { isValidPasswordResetToken, validatePasswordResetToken } from '$lib/server/token';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { token } = params;
	const isValidToken = await isValidPasswordResetToken(token);
	if (!isValidToken) {
		throw error(400, 'Invalid or expired password reset token');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const password = formData.get('password');
		// basic check
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		try {
			const { token } = params;
			const userId = await validatePasswordResetToken(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, password);
			if (!user.email_verified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true
				});
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			return fail(400, {
				message: 'Invalid or expired password reset link'
			});
		}
		throw redirect(302, '/');
	}
};

