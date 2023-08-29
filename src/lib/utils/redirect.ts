const createRedirect =
	(redirectUrl: string) =>
	({ url, message }: { url: URL; message?: string }) => {
		message = message ?? 'You must be logged in to view that page';

		const searchParams = new URLSearchParams(url.search);
		searchParams.append('redirectTo', url.pathname);
		searchParams.append('message', message);

		const queryString = searchParams.toString();

		return `${redirectUrl}?${queryString}`;
	};

export const redirectToSignIn = createRedirect('/login');
export const redirectToSignUp = createRedirect('/register');

