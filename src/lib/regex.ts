export const Regex = {
	alphabets: new RegExp(/^[a-zA-Z]*$/),
	alphabetsAndSpace: new RegExp(/^[a-zA-Z\s]*$/),
	number: new RegExp(/^[0-9]+$/),
	password: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{7,}$/) // Minimum 7 characters at least 1 Alphabet, 1 Number and 1 Special Character
};

export default Regex;

