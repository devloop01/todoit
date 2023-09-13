import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals, url }) => {
	const session = await locals.auth.validate();
	const search = url.search;

	if (session) {
		throw redirect(302, `/app${search}`);
	}
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/login');
	}
} satisfies Actions;

