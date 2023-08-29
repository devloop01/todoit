import type { Errors } from './errors';

const createRedirect =
	(redirectUrl: string) =>
	({ url, error = 'unknown' }: { url: URL; error?: Errors }) => {
		const searchParams = new URLSearchParams(url.search);
		searchParams.append('redirectTo', url.pathname);
		searchParams.append('error', error);

		const queryString = searchParams.toString();

		return `${redirectUrl}?${queryString}`;
	};

export const redirectToSignIn = createRedirect('/login');
export const redirectToSignUp = createRedirect('/register');

