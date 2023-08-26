import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { dev } from '$app/environment';

import { client } from './db';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: postgresAdapter(client, {
		user: 'users',
		key: 'user_keys',
		session: 'user_sessions'
	}),
	getUserAttributes: (user) => ({
		email: user.email,
		email_verified: user.email_verified,
		name: user.name,
		created_at: user.created_at
	})
});

export type Auth = typeof auth;

