import type { Todo } from './types';

import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([
	{
		id: '1',
		title: 'Learn Svelte',
		description: 'Need to practice Svelte ASAP!',
		completed: false,
		createdAt: new Date()
	},
	{ id: '2', title: 'Unlearn React', completed: true, createdAt: new Date() }
]);
