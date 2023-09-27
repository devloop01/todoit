import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';

import * as Schema from './schema';

const client = postgres(DATABASE_URL, { ssl: dev ? false : 'require' });

const db = drizzle(client, {
	schema: Schema
	// logger: dev
});

export { client, db, Schema };

