import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const isLoggedIn = derived(page, ($page) => $page.data.user !== undefined);
