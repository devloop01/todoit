import type { Todo } from '../types';

import { writable } from 'svelte/store';

const titles = ['Learn Svelte', 'Learn SvelteKit', 'Learn React', 'Learn Next.js', 'Learn Vue'];

const todosArray = Array.from({ length: 10 }).map(() => ({
	id: crypto.randomUUID(),
	title: titles[Math.floor(Math.random() * titles.length)],
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	completed: Math.random() > 0.5 ? true : false,
	createdAt: new Date()
}));

function createTodoStore() {
	const { subscribe, update, set } = writable<Todo[]>(todosArray);

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
