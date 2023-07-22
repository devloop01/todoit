<script lang="ts">
	import '../app.css';

	import { todos } from '$lib/store';

	import { Trash2Icon } from 'lucide-svelte';

	type Filter = 'ALL' | 'REMAINING' | 'COMPLETED';

	let todoText = '';

	let filter: Filter = 'ALL';

	$: filteredTodos = $todos.filter((todo) => {
		if (filter === 'ALL') return true;
		if (filter === 'REMAINING') return !todo.completed;
		if (filter === 'COMPLETED') return todo.completed;
	});
	$: completedTodos = filteredTodos.filter((todo) => todo.completed);
	$: remainingTodos = filteredTodos.filter((todo) => !todo.completed);

	function addTodo() {
		if (!todoText || todoText.trim().length === 0) return;
		todos.update((t) => [
			...t,
			{
				id: crypto.randomUUID(),
				title: todoText,
				completed: false,
				createdAt: new Date()
			}
		]);
		todoText = '';
	}

	function removeTodo(id: string) {
		todos.update((t) => t.filter((todo) => todo.id !== id));
	}
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<main class="max-w-screen-md mx-auto h-screen">
	<div class="h-full border border-t-0 border-b-0">
		<div class="space-y-3">
			<header class="px-8 py-3 border-b bg-[#4a82f2]">
				<a href="/" class="font-inter font-bold text-xl text-white">todoit.</a>
			</header>

			<div class="px-8 space-y-3">
				<div class="flex gap-3">
					<input
						type="text"
						class="input input-bordered w-full"
						aria-label="Add a new todo"
						bind:value={todoText}
						on:keydown={(e) => {
							if (e.key === 'Enter') addTodo();
						}}
					/>
					<button type="button" class="btn btn-primary" on:click={addTodo}>Add</button>
				</div>

				<div class="flex justify-between items-center border-b">
					<div class="flex gap-2 py-3">
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

				<div class="flex flex-col gap-3">
					{#each remainingTodos as todo (todo.id)}
						<div class="p-3 border rounded-xl flex justify-between">
							<label for={todo.id} class="cursor-pointer flex items-center gap-3">
								<input
									type="checkbox"
									id={todo.id}
									class="checkbox"
									bind:checked={todo.completed}
								/>
								<span class:line-through={todo.completed}>{todo.title}</span>
							</label>
							<button
								type="button"
								aria-label="delete todo"
								class="btn btn-square btn-xs btn-ghost"
								on:click={() => removeTodo(todo.id)}
							>
								<Trash2Icon size={16} />
							</button>
						</div>
					{/each}

					{#if completedTodos.length !== 0 && remainingTodos.length !== 0}
						<div class="border-b" />
					{/if}

					{#each completedTodos as todo (todo.id)}
						<div class="p-3 border rounded-xl flex justify-between">
							<label for={todo.id} class="cursor-pointer flex items-center gap-3">
								<input
									type="checkbox"
									id={todo.id}
									class="checkbox"
									bind:checked={todo.completed}
								/>
								<span class:line-through={todo.completed}>{todo.title}</span>
							</label>
							<button
								type="button"
								aria-label="delete todo"
								class="btn btn-square btn-xs btn-ghost"
								on:click={() => removeTodo(todo.id)}
							>
								<Trash2Icon size={16} />
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
