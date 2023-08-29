import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { handleRedirect } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		if (session?.user) {
			throw redirect(302, '/app');
		}
	}

	if (event.url.pathname.startsWith('/app')) {
		if (!session?.user) {
			throw redirect(302, handleRedirect(event.url).login);
		}
	}

	return resolve(event);
};

