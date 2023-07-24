<script lang="ts">
	import type { Todo } from '$lib/types';

	import { Trash2Icon } from 'lucide-svelte';

	import { todos } from '$lib/store/todos';

	export let todo: Todo;
</script>

<div class="p-3 border rounded-xl flex justify-between">
	<label for={todo.id} class="cursor-pointer flex items-center gap-3">
		<input
			type="checkbox"
			id={todo.id}
			class=""
			checked={todo.completed}
			on:click={() => todos.toggleTodo(todo.id)}
		/>
		<span class:line-through={todo.completed}>{todo.title}</span>
	</label>
	{#if todo.completed}
		<button
			type="button"
			aria-label="delete todo"
			class=""
			on:click={() => todos.removeTodo(todo.id)}
		>
			<Trash2Icon size={16} />
		</button>
	{/if}
</div>
