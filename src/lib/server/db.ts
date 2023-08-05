import { todos } from '$lib/store';
import { get } from 'svelte/store';

export function getTodos() {
	return get(todos);
}

export function getTodoById(todoId: string) {
	return get(todos).find((todo) => todo.id === todoId);
}

export function createTodo(text: string) {
	const newText = text.trim();

	if (!newText) throw new Error('todo must have a text');

	todos.addTodo(newText);
}

export function deleteTodo(todoId: string) {
	const todo = getTodoById(todoId);

	if (!todo) throw new Error('todo does not exist');

	todos.removeTodo(todo.id);
}

export function toggleTodo(todoId: string) {
	const todo = getTodoById(todoId);

	if (!todo) throw new Error('todo does not exist');

	todos.toggleTodo(todo.id);
}
