import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { Schema, db } from './db';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(Schema.verificationTokens)
		.where(eq(Schema.verificationTokens.user_id, userId))
		.execute();
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.insert(Schema.verificationTokens).values({
		id: token,
		expires: new Date().getTime() + EXPIRES_IN,
		user_id: userId
	});
	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.transaction(async (trx) => {
		const [storedToken] = await trx
			.select()
			.from(Schema.verificationTokens)
			.where(eq(Schema.verificationTokens.id, token));
		if (!storedToken) throw new Error('Invalid token');
		await trx
			.delete(Schema.verificationTokens)
			.where(eq(Schema.verificationTokens.id, storedToken.user_id));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};

export const generatePasswordResetToken = async (userId: string) => {
	const storedUserTokens = await db
		.select()
		.from(Schema.passwordResetTokens)
		.where(eq(Schema.passwordResetTokens.user_id, userId))
		.execute();
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.insert(Schema.passwordResetTokens).values({
		id: token,
		expires: new Date().getTime() + EXPIRES_IN,
		user_id: userId
	});
	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.transaction(async (trx) => {
		const [storedToken] = await trx
			.select()
			.from(Schema.passwordResetTokens)
			.where(eq(Schema.passwordResetTokens.id, token));
		if (!storedToken) throw new Error('Invalid token');
		await trx
			.delete(Schema.passwordResetTokens)
			.where(eq(Schema.passwordResetTokens.id, storedToken.user_id));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};

export const isValidPasswordResetToken = async (token: string) => {
	const [storedToken] = await db
		.select()
		.from(Schema.passwordResetTokens)
		.where(eq(Schema.passwordResetTokens.id, token));
	if (!storedToken) return false;
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		return false;
	}
	return true;
};

