import { writable } from 'svelte/store';

export const todoText = writable('');

export const theme = writable<'light' | 'dark'>('light');

