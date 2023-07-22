<script lang="ts">
	import type { Todo } from '$lib/types';

	import TodoCard from './TodoCard.svelte';

	export let todos: Todo[] = [];
</script>

<!-- {#if todos.length === 0}
	<p class="text-center text-gray-500">No todos yet.</p>
{:else} -->
{#each todos as todo (todo.id)}
	<TodoCard {todo} />
{/each}
<!-- {/if} -->
