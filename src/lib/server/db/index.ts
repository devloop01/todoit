import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { DATABASE_URL, NODE_ENV } from '$env/static/private';

import * as Schema from './schema';

const client = postgres(DATABASE_URL, { ssl: NODE_ENV === 'production' ? 'require' : false });

const db = drizzle(client, { schema: Schema });

export { db, Schema };
