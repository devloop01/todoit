import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const todoText = writable('');

export const currentUser = writable<User | null>(null);

export { todos } from './todos';

