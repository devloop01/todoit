import type { InferSelectModel } from 'drizzle-orm';
import type { Schema } from '$lib/server/db';

export type User = InferSelectModel<typeof Schema.users>;

