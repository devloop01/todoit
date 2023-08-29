import { theme } from '$lib/store';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

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

