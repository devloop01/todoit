<script lang="ts">
	import type { Todo } from '$lib/types';
	import { cn } from '$lib/utils';
	import autoAnimate from '@formkit/auto-animate';

	import TodoCard from './todo-card.svelte';

	export let todos: Todo[];
</script>

<div class={cn('flex flex-col gap-2', $$props.class)} use:autoAnimate>
	{#each todos as todo (todo.id)}
		<TodoCard {todo} />
	{/each}
</div>
