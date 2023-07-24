<script lang="ts">
	import type { Todo } from '$lib/types';

	import TodoCard from './TodoCard.svelte';

	export let todos: Todo[];
</script>

<div class="flex flex-col gap-2">
	{#each todos as todo (todo.id)}
		<TodoCard {todo} />
	{/each}
</div>
