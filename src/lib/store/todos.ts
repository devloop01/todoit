import type { Todo } from '../types';

import { writable } from 'svelte/store';

function createTodoStore() {
	const { subscribe, update, set } = writable<Todo[]>([
		{
			id: '1',
			title: 'Learn Svelte',
			description: 'Need to practice Svelte ASAP!',
			completed: false,
			createdAt: new Date()
		},
		{ id: '2', title: 'Unlearn React', completed: true, createdAt: new Date() }
	]);

	return {
		subscribe,

		reset: (todos?: Todo[]) => set(todos || []),

		addTodo: (title: string, description?: string) =>
			update((todos) => [
				...todos,
				{ id: crypto.randomUUID(), title, description, completed: false, createdAt: new Date() }
			]),

		removeTodo: (id: string) => update((todos) => todos.filter((todo) => todo.id !== id)),

		toggleTodo: (id: string) =>
			update((todos) =>
				todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
			)
	};
}

export const todos = createTodoStore();
