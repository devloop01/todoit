import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { redirectToSignIn } from '$lib/utils/redirect';

const authPattern = /\/\(auth\)/;
const protectedPattern = /\/\(protected\)/;

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	const routeId = event.route.id || '';

	if (session) {
		if (authPattern.test(routeId)) {
			throw redirect(302, '/app');
		}
	} else {
		if (protectedPattern.test(routeId)) {
			throw redirect(302, redirectToSignIn({ url: event.url, error: 'auth_required' }));
		}
	}

	return resolve(event);
};

