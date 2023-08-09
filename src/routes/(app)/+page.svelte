<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { TodoFilter } from '$lib/types';

	import { enhance } from '$app/forms';

	import { TodoList } from '$components/todo';
	import { Button } from '$components/ui/button';
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';

	export let data: PageData;
	export let form: ActionData;

	$: todos = data.todos;

	let filter: TodoFilter = 'ALL';

	$: filteredTodos = todos.filter((todo) => {
		if (filter === 'ALL') return true;
		if (filter === 'REMAINING') return !todo.completed;
		if (filter === 'COMPLETED') return todo.completed;
	});
	$: completedTodos = filteredTodos.filter((todo) => todo.completed);
	$: remainingTodos = filteredTodos.filter((todo) => !todo.completed);
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<div class="space-y-2 border-b px-2 py-2 bg-white">
	<div class="flex gap-2">
		<label for="filter-all" class="inline-block">
			<input
				type="radio"
				id="filter-all"
				class="sr-only peer"
				name="filter"
				value="ALL"
				bind:group={filter}
			/>
			<span
				class="font-inter text-xs w-fit flex items-center cursor-pointer px-3 py-1 border rounded-full select-none transition-colors
									peer-checked:bg-primary peer-checked:border-transparent peer-checked:text-white
									peer-[&:not(:checked)]:hover:bg-blue-50">All</span
			>
		</label>
		<label for="filter-remaining" class="inline-block">
			<input
				type="radio"
				id="filter-remaining"
				class="sr-only peer"
				name="filter"
				value="REMAINING"
				bind:group={filter}
			/>
			<span
				class="font-inter text-xs w-fit flex items-center cursor-pointer px-3 py-1 border rounded-full select-none transition-colors
									peer-checked:bg-primary peer-checked:border-transparent peer-checked:text-white
									peer-[&:not(:checked)]:hover:bg-blue-50">Remaining</span
			>
		</label>
		<label for="filter-completed" class="inline-block">
			<input
				type="radio"
				id="filter-completed"
				class="sr-only peer"
				name="filter"
				value="COMPLETED"
				bind:group={filter}
			/>
			<span
				class="font-inter text-xs w-fit flex items-center cursor-pointer px-3 py-1 border rounded-full select-none transition-colors
									peer-checked:bg-primary peer-checked:border-transparent peer-checked:text-white
									peer-[&:not(:checked)]:hover:bg-blue-50">Completed</span
			>
		</label>
	</div>

	<div class="flex items-center gap-3">
		<span class="font-inter text-xs">{todos.filter((t) => !t.completed).length} remaining</span>
		<span class="font-inter text-xs">{todos.filter((t) => t.completed).length} completed</span>
	</div>
</div>

<main class="flex-1 py-2 overflow-y-auto">
	{#if filteredTodos.length === 0}
		<div class="flex flex-col items-center justify-center h-full">
			<p class="font-inter text-sm text-slate-250">No todos found</p>
		</div>
	{:else}
		<div class="grid">
			<TodoList todos={filteredTodos} class="px-2" />

			<!-- {#if completedTodos.length !== 0 && remainingTodos.length !== 0}
				<div class="border-slate-250 border-b my-3" />
			{/if}
	
			<TodoList todos={completedTodos} class="px-2" /> -->
		</div>
	{/if}
</main>

<div class="w-full p-2 border-t bg-white">
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
			<p class="text-white font-inter text-sm">{form.error}</p>
		</div>
	{/if}
{/if}

<style>
	:global(body)::-webkit-scrollbar {
		width: 0px;
		overflow: -moz-scrollbars-none;
	}
</style>
