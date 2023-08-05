<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { TodoFilter } from '$lib/types';

	import { TodoList } from '$components/todo';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	$: todos = data.todos;

	console.log(todos);

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

<div class="relative h-screen flex flex-col justify-between flex-wrap">
	<header class="px-4 py-3 bg-[#4a82f2] flex items-center justify-between shadow-sm">
		<a href="/">
			<span class="font-inter font-bold text-xl text-white">todoit.</span>
		</a>
		<img src="/avatar.jpg" alt="Avatar" class="h-9 w-9 rounded-full" />
	</header>

	<div class="sticky top-[-60px] space-y-2 border-b px-2 py-2 bg-white">
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
									peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
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
									peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
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
									peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
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
		<div class="grid">
			<TodoList todos={remainingTodos} class="px-2" />

			{#if completedTodos.length !== 0 && remainingTodos.length !== 0}
				<div class="border-slate-250 border-b my-3" />
			{/if}

			<TodoList todos={completedTodos} class="px-2" />
		</div>
	</main>

	<div class="w-full p-2 border-t bg-white">
		<form method="POST" action="?/create" class="flex gap-2" use:enhance>
			<label class="w-full">
				<span class="sr-only">Create Todo</span>
				<input
					type="text"
					name="todo-text"
					value={form?.text ?? ''}
					placeholder="Add a new todo"
					aria-label="create todo"
					autocomplete="off"
					required
					class="w-full rounded h-10 border px-3 shadow transition-colors
						hover:bg-gray-50 hover:border-black/15
						focus:outline-none focus:border-blue-500/80"
				/>
			</label>
			<button type="submit" class="bg-white rounded px-3 h-10 cursor-pointer border">Add</button>
		</form>
	</div>

	{#if form}
		{#if form.error}
			<div class="bg-red-500 p-2">
				<p class="text-white font-inter text-sm">{form.error}</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	:global(body)::-webkit-scrollbar {
		width: 0px;
		overflow: -moz-scrollbars-none;
	}
</style>
