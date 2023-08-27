import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	const user = session ? { id: session.user.userId, ...session.user } : null;
	event.locals.user = user;

	if (event.url.pathname.startsWith('/app')) {
		if (!event.locals.user) {
			throw redirect(302, '/login');
		}
	}

	return resolve(event);
};

