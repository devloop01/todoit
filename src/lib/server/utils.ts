import { env } from '$env/dynamic/private';

export function getBaseUrl() {
	if (typeof window !== 'undefined') return '';
	if (env.SITE_URL) return `https://${env.SITE_URL}`;
	if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
	return `http://localhost:${env.PORT ?? 5173}`;
}

export function getUrl(...paths: string[]) {
	return [getBaseUrl(), ...paths].join('/');
}

