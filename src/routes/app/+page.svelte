<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { TodoFilter } from '$lib/types';

	import { enhance } from '$app/forms';
	import { currentUser } from '$lib/store';
	import { onMount } from 'svelte';

	import { TodoList } from '$components/todo';
	import { Button } from '$components/ui/button';
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';

	export let data: PageData;
	export let form: ActionData;

	$: todos = data.todos;

	let filter: TodoFilter = 'REMAINING';

	$: filteredTodos = todos.filter((todo) => {
		if (filter === 'REMAINING') return !todo.completed;
		if (filter === 'COMPLETED') return todo.completed;
	});

	$: user = data.user;

	onMount(() => {
		if (user) currentUser.set(user);
	});
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<div class="space-y-2 border-b px-4 py-3">
	<div class="flex gap-2">
		<label for="filter-remaining" class="inline-block">
			<input
				type="radio"
				id="filter-remaining"
				class="peer sr-only"
				name="filter"
				value="REMAINING"
				bind:group={filter}
			/>
			<span
				class="flex w-fit cursor-pointer select-none items-center rounded-full border px-3 py-1 font-inter text-xs transition-colors
									peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white
									peer-[&:not(:checked)]:hover:bg-foreground/5">Remaining</span
			>
		</label>
		<label for="filter-completed" class="inline-block">
			<input
				type="radio"
				id="filter-completed"
				class="peer sr-only"
				name="filter"
				value="COMPLETED"
				bind:group={filter}
			/>
			<span
				class="flex w-fit cursor-pointer select-none items-center rounded-full border px-3 py-1 font-inter text-xs transition-colors
									peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white
									peer-[&:not(:checked)]:hover:bg-foreground/5">Completed</span
			>
		</label>
	</div>

	<div class="flex items-center gap-3">
		<span class="font-inter text-xs">{todos.filter((t) => !t.completed).length} remaining</span>
		<span class="font-inter text-xs">{todos.filter((t) => t.completed).length} completed</span>
	</div>
</div>

<main class="flex-1 overflow-y-auto py-2">
	{#if filteredTodos.length === 0}
		<div class="flex h-full flex-col items-center justify-center">
			<p class="text-slate-250 font-inter text-sm">No todos found</p>
		</div>
	{:else}
		<div class="grid">
			<TodoList todos={filteredTodos} class="px-2" />
		</div>
	{/if}
</main>

<div class="w-full border-t p-2">
	<form method="POST" action="?/create" class="flex gap-2" use:enhance>
		<Label class="sr-only" for="todo-input">Create Todo</Label>

		<Input
			type="text"
			name="todo-text"
			id="todo-input"
			value={form?.text ?? ''}
			placeholder="Add a new todo"
			aria-label="create todo"
			autocomplete="off"
			required
		/>

		<Button>Add</Button>
	</form>
</div>

{#if form}
	{#if form.error}
		<div class="bg-red-500 p-2">
			<p class="font-inter text-sm text-white">{form.error}</p>
		</div>
	{/if}
{/if}

<style>
	:global(body)::-webkit-scrollbar {
		width: 0px;
		overflow: -moz-scrollbars-none;
	}
</style>
