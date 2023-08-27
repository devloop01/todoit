// See https://kit.svelte.dev/docs/types#app

import type { User } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest<Lucia.Auth>;
			user: User | null;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = Omit<import('$lib/types').User, 'id'>;
		// type DatabaseSessionAttributes = {};
	}
}

export {};

