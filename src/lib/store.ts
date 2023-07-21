import type { Todo } from './types';

import { writable } from 'svelte/store';

export const todos = writable<Todo[]>([
	{ id: '1', text: 'Learn Svelte', completed: false },
	{ id: '2', text: 'Unlearn React', completed: true }
]);
