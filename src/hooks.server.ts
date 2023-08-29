import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { redirectToSignIn } from '$lib/utils/redirect';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	if (session) {
		if (event.route.id?.startsWith('/(auth)')) {
			throw redirect(302, '/app');
		}
	} else {
		if (event.route.id?.startsWith('/(protected)')) {
			throw redirect(302, redirectToSignIn({ url: event.url, error: 'auth_required' }));
		}
	}

	return resolve(event);
};

