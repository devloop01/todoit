// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest<Lucia.Auth>;
		}
		interface PageData {
			flash?: { type?: 'success' | 'error'; message: string };
		}
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

