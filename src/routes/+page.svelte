<script lang="ts">
	import type { TodoFilter } from '$lib/types';

	import { todoText, todos } from '$lib/store';

	import { TodoList } from '$components/todo';

	let filter: TodoFilter = 'ALL';

	$: filteredTodos = $todos.filter((todo) => {
		if (filter === 'ALL') return true;
		if (filter === 'REMAINING') return !todo.completed;
		if (filter === 'COMPLETED') return todo.completed;
	});
	$: completedTodos = filteredTodos.filter((todo) => todo.completed);
	$: remainingTodos = filteredTodos.filter((todo) => !todo.completed);

	function addTodo() {
		$todoText = $todoText.trim();

		if (!$todoText) return;

		todos.addTodo($todoText);
		$todoText = '';
	}
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<div class="relative max-h-screen flex flex-col">
	<header class="px-4 py-3 bg-[#4a82f2]">
		<a href="/" class="font-inter font-bold text-xl text-white">todoit.</a>
	</header>

	<main class="space-y-3 flex-1 pb-2 overflow-hidden">
		<div class="flex flex-col gap-2 border-b px-2 py-2">
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
				<span class="font-inter text-xs">{remainingTodos.length} remaining</span>
				<span class="font-inter text-xs">{completedTodos.length} completed</span>
			</div>
		</div>

		<div class="todos-wrapper grid gap-3 px-2 overflow-y-scroll h-[calc(100dvh_-_200px)]">
			<TodoList todos={remainingTodos} />

			{#if completedTodos.length !== 0 && remainingTodos.length !== 0}
				<div class="border-b" />
			{/if}

			<TodoList todos={completedTodos} />
		</div>
	</main>

	<div class="p-2 border-t">
		<div class="flex gap-2">
			<input
				type="text"
				class="w-full rounded h-10 border px-2 shadow transition-colors
						hover:bg-gray-50 hover:border-black/15
						focus:outline-none focus:border-blue-500/80"
				aria-label="Add a new todo"
				bind:value={$todoText}
				on:keydown={(e) => {
					if (e.key === 'Enter') addTodo();
				}}
			/>
			<button
				type="button"
				class="bg-white rounded px-3 h-10 cursor-pointer border"
				on:click={addTodo}>Add</button
			>
		</div>
	</div>
</div>

<style>
	.todos-wrapper::-webkit-scrollbar {
		width: 0px;
		overflow: -moz-scrollbars-none;
	}
</style>
