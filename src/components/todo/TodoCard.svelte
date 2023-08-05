<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/types';

	import { CheckSquareIcon, SquareIcon, Trash2Icon } from 'lucide-svelte';

	export let todo: Todo;

	let formElement: HTMLFormElement;
</script>

<div class="p-3 border rounded-xl flex justify-between">
	<form method="POST" action="?/complete" use:enhance>
		<label class="cursor-pointer flex items-center gap-3">
			<button type="submit" aria-label="toggle todo">
				{#if todo.completed}
					<CheckSquareIcon size={16} />
				{:else}
					<SquareIcon size={16} />
				{/if}
			</button>
			<input type="hidden" name="todo-id" value={todo.id} />
			<!-- <input type="checkbox" id={todo.id} checked={todo.completed} /> -->
			<span class:line-through={todo.completed}>{todo.title}</span>
		</label>
	</form>
	{#if todo.completed}
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="todo-id" value={todo.id} />
			<button type="submit" aria-label="delete todo">
				<Trash2Icon size={16} />
			</button>
		</form>
	{/if}
</div>
