import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const todoText = writable('');

export const currentUser = writable<User | null>(null);

export const theme = writable<'light' | 'dark'>('light');

export { todos } from './todos';

