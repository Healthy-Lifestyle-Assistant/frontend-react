export const SUCCESS = 'success';
export const WARNING = 'warning';

export const validateInput = (title, description) => {
    const invalidChars = ['!', ',', '.', '@', '#', '$', '%', '^', '&', '*', '&']; 
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    const containsForbiddenChars = (str, forbiddenChars) => {
        for (let char of str) {
            if (forbiddenChars.includes(char)) {
                return true;
            }
        }
        return false;
    };

    if (title.length < minLength || title.length > maxLength) {
        message += "Title length should be between " + minLength + " and " + maxLength + " characters. ";
    }

    if (containsForbiddenChars(title, invalidChars)) {
        message += "Title contains forbidden characters. ";
    }

    if (description.length < minLength || description.length > maxLength) {
        message += "Description length should be between " + minLength + " and " + maxLength + " characters. ";
    }

    if (containsForbiddenChars(description, invalidChars)) {
        message += "Description contains forbidden characters. ";
    }

    if (message !== '') return message;
    return null;
};
