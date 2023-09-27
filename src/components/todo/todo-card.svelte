<script lang="ts">
	import type { Todo } from '$lib/types';

	import { enhance } from '$app/forms';

	import { cn } from '$lib/utils';

	import { CheckSquareIcon, SquareIcon, Trash2Icon } from 'lucide-svelte';

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';

	export let todo: Todo;
</script>

<Card class="flex items-center justify-between transition-colors hover:border-foreground/20">
	<CardHeader class="p-0 px-4">
		<form method="POST" action="?/toggle" class="flex items-center gap-3" use:enhance>
			<input type="hidden" name="todoId" id={todo.id} value={todo.id} />
			<input type="hidden" name="todoIsComplete" value={todo.completed} />

			<button aria-label="toggle todo">
				{#if todo.completed}
					<CheckSquareIcon size={16} />
				{:else}
					<SquareIcon size={16} />
				{/if}
			</button>
		</form>
	</CardHeader>

	<CardContent class="flex-1 p-0">
		<a href={`todos/${todo.id}`}>
			<p class={cn(todo.completed && 'line-through', 'select-none py-4')}>
				{todo.title}
			</p>
		</a>
	</CardContent>

	{#if todo.completed}
		<CardFooter class="p-0 px-2">
			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="todoId" value={todo.id} />
				<input type="hidden" name="todoId" value={todo.id} />

				<Button variant="ghost" size="icon" aria-label="delete todo">
					<Trash2Icon size={16} />
				</Button>
			</form>
		</CardFooter>
	{/if}
</Card>
