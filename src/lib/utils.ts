import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { theme } from '$lib/store';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

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

export const toggleTheme = () => {
	theme.update((current) => (current === 'light' ? 'dark' : 'light'));

	localStorage.setItem('theme', get(theme));

	if (get(theme) === 'dark') document.documentElement.classList.add('dark');
	else document.documentElement.classList.remove('dark');
};

export const loadTheme = () => {
	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			theme.set('dark');
		} else {
			document.documentElement.classList.remove('dark');
			theme.set('light');
		}
	}
};

