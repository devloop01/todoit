import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { handleRedirect } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	const user = session ? { id: session.user.userId, ...session.user } : null;
	event.locals.user = user;

	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		if (event.locals.user) {
			throw redirect(302, '/app');
		}
	}

	if (event.url.pathname.startsWith('/app')) {
		if (!event.locals.user) {
			throw redirect(302, handleRedirect(event.url).login);
		}
	}

	return resolve(event);
};

