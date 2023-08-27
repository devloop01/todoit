import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleRedirect = (url: URL, message?: string) => {
	message = message ?? 'You must be logged in to view that page.';

	const searchParams = new URLSearchParams(url.search);
	searchParams.append('redirectTo', url.pathname);
	searchParams.append('message', message);

	const queryString = searchParams.toString();

	return {
		login: `/login?${queryString}`,
		register: `/register?${queryString}`
	};
};

