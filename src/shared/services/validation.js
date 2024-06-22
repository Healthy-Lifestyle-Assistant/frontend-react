const containsForbiddenChars = (str, forbiddenChars) => {
    for (let char of str) {
        if (forbiddenChars.includes(char)) {
            return true;
        }
    }
    return false;
};

export const validateUsernameOrEmail = (title) => {
    const usernameInvalidChars = ['@', '$', '%', '^', '*'];
    const emailInvalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
    const isEmail = title.includes('@');
    const minUsernameLength = 3;
    const maxUsernameLength = 20;
    const minEmailLength = 3;
    const maxEmailLength = 50;
    let message = '';

    if (title !== '' && title !== null && title !== undefined) {
        if (isEmail) {
            const [localPart, domain] = title.split('@', 2);

            if (!localPart.length || !domain.length) {
                message += 'Email should contain an "@" symbol with text before and after it. ';
            } else {
                const domainParts = domain.split('.');
                const isDomainInvalid = domainParts.length < 2
                    || domainParts.some(part => !part.length)
                    || domainParts[0].length === 0
                    || domainParts[domainParts.length - 1].length === 0;

                if (isDomainInvalid) {
                    message += 'Email should contain a "." symbol (not the first or last character). ';
                }
            }

            if (title.length < minEmailLength || title.length > maxEmailLength) {
                message += 'Email length should be between ' + minEmailLength + ' and ' + maxEmailLength + ' characters. ';
            }

            if (containsForbiddenChars(title, emailInvalidChars)) {
                message += `Email contains forbidden characters: (${emailInvalidChars.join(' ')}). `;
            }
        } else {
            if (title.length < minUsernameLength || title.length > maxUsernameLength) {
                message += 'Username length should be between ' + minUsernameLength + ' and ' + maxUsernameLength + ' characters. ';
            }
            if (containsForbiddenChars(title, usernameInvalidChars)) {
                message += "Username contains forbidden characters: '@', '$', '%', '^', '*'. ";
            }
        }
    }

    return message;
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