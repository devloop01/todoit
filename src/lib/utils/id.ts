import { customAlphabet } from 'nanoid';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const length = 15;

const nanoid = customAlphabet(alphabet, length);

export const generateId = () => nanoid();

