import { customAlphabet } from 'nanoid';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

const nanoid = customAlphabet(alphabet);

export const generateId = (length = 15) => nanoid(length);

