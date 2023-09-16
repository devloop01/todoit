<script lang="ts">
	import type { Todo } from '$lib/types';

	import { enhance } from '$app/forms';
	import { CheckSquareIcon, SquareIcon, Trash2Icon } from 'lucide-svelte';

	import { cn } from '$lib/utils';

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { Label } from '$components/ui/label';
	import { fade, fly } from 'svelte/transition';

	export let todo: Todo;
</script>

<div in:fly={{ y: '-100%', duration: 200 }} out:fade={{ duration: 200 }}>
	<Card class="flex items-center justify-between transition-colors hover:border-foreground/20">
		<CardHeader class="p-0 px-4">
			<form method="POST" action="?/toggle" class="flex items-center gap-3" use:enhance>
				<button aria-label="toggle todo">
					{#if todo.completed}
						<CheckSquareIcon size={16} />
					{:else}
						<SquareIcon size={16} />
					{/if}
				</button>
				<input class="hidden" type="hidden" name="todo-id" id={todo.id} value={todo.id} />
				<input class="hidden" type="hidden" name="todo-is-complete" value={todo.completed} />
				<Label for={todo.id} class="sr-only">
					{todo.title}
				</Label>
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
					<input class="hidden" type="hidden" name="todo-id" value={todo.id} />
					<Button variant="ghost" size="icon" aria-label="delete todo">
						<Trash2Icon size={16} />
					</Button>
				</form>
			</CardFooter>
		{/if}
	</Card>
</div>
