<script lang="ts">
	import type { Todo } from '$lib/types';
	import { cn } from '$lib/utils';

	import TodoCard from './TodoCard.svelte';

	export let todos: Todo[];
</script>

<div class={cn('flex flex-col gap-2', $$props.class)}>
	{#each todos as todo (todo.id)}
		<TodoCard {todo} />
	{/each}
</div>
