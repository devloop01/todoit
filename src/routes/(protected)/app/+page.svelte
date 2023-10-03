<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import { enhance } from '$app/forms';

	import { TodoList } from '$components/todo';
	import { Button } from '$components/ui/button';
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: ActionData;

	$: ({ filteredTodos } = data);
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<div class="my-2 pt-2">
	<div class="flex gap-2">
		<div class="inline-block">
			<a
				data-active={$page.url.searchParams.get('filter') === null ||
					$page.url.searchParams.get('filter') === 'remaining'}
				href="/?filter=remaining"
				class="flex w-fit cursor-pointer select-none items-center rounded-full border px-3 py-1 text-xs transition-colors data-[active='true']:bg-blue-500 data-[active='true']:text-white"
				>Remaining</a
			>
		</div>
		<div class="inline-block">
			<a
				data-active={$page.url.searchParams.get('filter') === 'completed'}
				href="/?filter=completed"
				class="flex w-fit cursor-pointer select-none items-center rounded-full border px-3 py-1 text-xs transition-colors data-[active='true']:bg-blue-500 data-[active='true']:text-white"
				>Completed</a
			>
		</div>
	</div>
</div>

<main class="flex-1 overflow-y-auto py-2">
	{#if filteredTodos.length === 0}
		<div class="flex h-full flex-col items-center justify-center">
			<p class="text-slate-250 text-sm">No todos found</p>
		</div>
	{:else}
		<TodoList todos={filteredTodos} class="px-2" />
	{/if}
</main>

<div class="w-full border-t p-2">
	<form method="POST" action="?/create" class="flex gap-2" use:enhance>
		<Label class="sr-only" for="todo-input">Create Todo</Label>
		<Input
			type="text"
			name="title"
			id="todo-input"
			placeholder="Add a new todo"
			aria-label="create todo"
			autocomplete="off"
			required
		/>

		<Button>Add</Button>
	</form>
</div>

{#if form}
	{#if form.message}
		<div class="bg-red-500 p-2">
			<p class="text-sm text-white">{form.message}</p>
		</div>
	{/if}
{/if}

<style>
	:global(body)::-webkit-scrollbar {
		width: 0px;
		overflow: -moz-scrollbars-none;
	}
</style>
