<script lang="ts">
	import type { Todo } from '$lib/types';
	import { cn } from '$lib/utils';
	import { flip } from 'svelte/animate';

	import TodoCard from './todo-card.svelte';

	export let todos: Todo[];
</script>

<div class={cn('flex flex-col gap-2', $$props.class)}>
	{#each todos as todo (todo.id)}
		<div animate:flip={{ duration: 200 }}>
			<TodoCard {todo} />
		</div>
	{/each}
</div>
