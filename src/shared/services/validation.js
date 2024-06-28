const containsForbiddenChars = (str, forbiddenChars) => {
    for (let char of str) {
        if (forbiddenChars.includes(char)) {
            return true;
        }
    }
    return false;
};

export const validateUsername = (username) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '@', '$', '%', '^', '*'];
    const minLength = 3;
    const maxLength = 20;
    const validation = {
        isValid: true,
        message: '',
    };

    if (username !== '' && username !== null && username !== undefined) {
        if (username.length < minLength || username.length > maxLength) {
            validation.isValid = false;
            validation.message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(username, invalidChars)) {
            validation.isValid = false;
            validation.message += `Username contains forbidden characters: (${invalidChars.join(' ')}). `;
        }
    }

    return validation;
};

export const validateEmail = (email) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
    const minEmailLength = 3;
    const maxEmailLength = 50;
    const validation = {
        isValid: true,
        message: '',
    };

    if (email !== '' && email !== null && email !== undefined) {
        if (email.includes('@')) {
            const [localPart, domain] = email.split('@', 2);

            if (!localPart.length || !domain.length) {
                validation.isValid = false;
                validation.message += 'Email should contain an "@" symbol with text before and after it. ';
            } else {
                const domainParts = domain.split('.');
                const isDomainInvalid = domainParts.length < 2
                    || domainParts.some(part => !part.length)
                    || domainParts[0].length === 0
                    || domainParts[domainParts.length - 1].length === 0;

                if (isDomainInvalid) {
                    validation.isValid = false;
                    validation.message += 'Email should contain a "." symbol (not the first or last character). ';
                }
            }

            if (email.length < minEmailLength || email.length > maxEmailLength) {
                validation.isValid = false;
                validation.message += 'Email length should be between ' + minEmailLength + ' and ' + maxEmailLength + ' characters. ';
            }

            if (containsForbiddenChars(email, invalidChars)) {
                validation.isValid = false;
                validation.message += `Email contains forbidden characters: (${invalidChars.join(' ')}). `;
            }
        } else {
            validation.isValid = false;
            validation.message += 'Email should contain an "@" symbol. ';
        }
    }

    return validation;
};

export const validateUsernameOrEmail = (title) => {
    const validation = {
        isValid: true,
        message: '',
    };

    if (title !== '' && title !== null && title !== undefined) {
        if (title.includes('@')) {
            const { isValid, message } = validateEmail(title);
            validation.isValid = isValid;
            validation.message = message;
        } else {
            const { isValid, message } = validateUsername(title);
            validation.isValid = isValid;
            validation.message = message;
        }
    }

    return validation;
};

export const validatePassword = (title) => {
    const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (title !== '' && title !== null && title !== undefined) {
        if (title.length < minLength || title.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(title, invalidChars)) {
            message += `Password contains forbidden characters: (${invalidChars.join(' ')}). `;
        }
    }

    return message;
};

export const validateTitle = (title) => {
    const invalidChars = ['@', '$', '%', '^', '*'];
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (title !== '' && title !== null && title !== undefined) {
        if (title.length < minLength || title.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(title, invalidChars)) {
            message += "Contains forbidden characters ('@', '$', ' % ', ' ^ ', ' * '). ";
        }
    }

    return message;
}

export const validateDescription = (description) => {
    const minLength = 3;
    const maxLength = 20;
    let message = '';

    if (description !== null && description !== '') {
        if (description.length < minLength || description.length > maxLength) {
            message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }
    }

    return message;
}

export const validateDescriptionEmptyAllowed = (description) => {
    const maxLength = 255;
    let message = '';

    if (description === '' || description === null) {
        return message;
    } else {
        if (description.length > maxLength) {
            message += 'Length should be 255 characters or less';
        }
        return message;
    }
}

export const validateHttpLink = (link) => {
    let message = '';

    if (!(link.startsWith('http://') || link.startsWith('https://'))) {
        message += 'HTTP link should start with http:// or https://'
    }

    return message;
}

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

    if (title !== '' && title !== null && title !== undefined) {
        if (title.length < minLength || title.length > maxLength) {
            message += 'Title length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(title, invalidChars)) {
            message += 'Title contains forbidden characters. ';
        }
    }

    if (description !== '' && description !== null && description !== undefined) {
        if (description.length < minLength || description.length > maxLength) {
            message += 'Description length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
        }

        if (containsForbiddenChars(description, invalidChars)) {
            message += 'Description contains forbidden characters. ';
        }
    }

    if (message !== '') return message;
    return null;
};