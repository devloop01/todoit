import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import 'dotenv/config';

const connectionString = process.env.DATABASE_URL ?? '';
const client = postgres(connectionString, { max: 1 });

const db = drizzle(client);

export async function main() {
	try {
		console.log('Migrating database...');
		await migrate(db, { migrationsFolder: 'drizzle' });
		console.log('Database migrated.');
	} catch (err) {
		console.error(err);
	}

	process.exit(0);
}

main();

