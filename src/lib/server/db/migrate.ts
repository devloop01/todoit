import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import 'dotenv/config';

export async function migrateDb() {
	const connectionString = process.env.DATABASE_URL;
	const client = postgres(connectionString, { max: 1 });

	const db = drizzle(client);

	console.log('Migrating database...');
	await migrate(db, { migrationsFolder: 'drizzle' });
	console.log('Database migrated.');

	process.exit(0);
}

try {
	migrateDb();
} catch (err) {
	console.error(err);
	process.exit(1);
}
