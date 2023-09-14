import { env } from '$env/dynamic/private';

export function getBaseUrl() {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '';
	if (env.VERCEL_URL)
		// reference for vercel.com
		return `https://${env.VERCEL_URL}`;
	if (env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${env.RENDER_INTERNAL_HOSTNAME}:${env.PORT}`;
	// assume localhost
	return `http://localhost:${env.PORT ?? 5173}`;
}

export function getUrl(...paths: string[]) {
	return [getBaseUrl(), ...paths].join('/');
}

