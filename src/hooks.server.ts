import { redirect, type Handle } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { redirectToSignIn } from '$lib/utils/redirect';

const authPaths = ['/login', '/register', '/confirm-email', '/forgot-password', '/reset-password'];
const authPathsRegex = new RegExp(`^(${authPaths.join('|')})`);

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	if (authPathsRegex.test(event.url.pathname)) {
		if (session?.user) {
			throw redirect(302, '/app');
		}
	}

	if (event.url.pathname.startsWith('/app')) {
		if (!session?.user) {
			throw redirect(302, redirectToSignIn({ url: event.url }));
		}
	}

	return resolve(event);
};

